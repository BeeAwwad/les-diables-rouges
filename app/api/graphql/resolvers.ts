import axios from "axios";
import {
  FixturesResponse,
  Fixture,
  Team,
  PlStandings,
  ApiFixtureResponse,
} from "@/types";

export const resolvers = {
  Query: {
    getFixtures: async (
      _: unknown,
      { id }: { id: string },
    ): Promise<FixturesResponse> => {
      const response = await axios.get(
        `https://api.football-data.org/v4/teams/${id}/matches`,
        {
          headers: {
            method: "GET",
            "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY,
          },
        },
      );
      return response.data;
    },

    getNextFixture: async (
      _: unknown,
      { id }: { id: string },
    ): Promise<Fixture> => {
      const response = await axios.get(
        `https://api.football-data.org/v4/teams/${id}/matches`,
        {
          headers: {
            method: "GET",
            "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY,
          },
        },
      );

      const { matches } = response.data;
      const now = new Date().toISOString();

      const nextMatch = matches.find((match: Fixture) => match.utcDate > now);

      if (!nextMatch) {
        return matches[matches.length - 1];
      }

      return nextMatch;
    },

    getResults: async (
      _: unknown,
      { id }: { id: string },
    ): Promise<FixturesResponse> => {
      const response = await axios.get(
        `https://api.football-data.org/v4/teams/${id}/matches/?status=FINISHED`,
        {
          headers: {
            method: "GET",
            "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY,
          },
        },
      );
      return response.data;
    },

    getTeam: async (_: unknown, { id }: { id: string }): Promise<Team> => {
      try {
        const response = await axios.get(
          `https://apiv3.apifootball.com/?action=get_teams&league_id=152&APIkey=${process.env.API_FOOTBALL_API_KEY}`,
        );

        const teams = response.data;

        if (!teams) {
          throw new Error("Teams data is missing from the response");
        }

        const lesDablesRouges = teams.find(
          (team: Team) => team.team_key === id,
        );

        if (!lesDablesRouges) {
          throw new Error(`Team with id ${id} not found`);
        }

        return lesDablesRouges;
      } catch (error) {
        console.error("Error in getTeam:", error);
        throw new Error("Failed to get team");
      }
    },

    getPlStandings: async (_: unknown): Promise<PlStandings> => {
      const response = await axios.get(
        `https://api.football-data.org/v4/competitions/PL/standings`,
        {
          headers: {
            method: "GET",
            "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY,
          },
        },
      );

      const PL = response.data;
      if (!PL) {
        throw new Error("PL standings data is missing from the response");
      }
      return PL.standings[0].table;
    },

    getPreviousFixture: async (
      _: unknown,
      { id, season }: { id: string; season: number },
    ): Promise<ApiFixtureResponse> => {
      const response = await axios.get(
        `https://v3.football.api-sports.io/fixtures?season=${season}&team=${id}`,
        {
          headers: {
            method: "GET",
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": process.env.API_FOOTBALL_KEY,
          },
        },
      );

      const Fixtures = response.data;
      const { response: AllFixtures } = Fixtures;
      const currentDate = new Date().toISOString();

      const pastFixtures = AllFixtures.filter(
        (fixture: ApiFixtureResponse) => fixture.fixture.date < currentDate,
      );

      pastFixtures.sort(
        (a: ApiFixtureResponse, b: ApiFixtureResponse) =>
          new Date(b.fixture.date).getTime() -
          new Date(a.fixture.date).getTime(),
      );

      const mostRecentFixture =
        pastFixtures.length > 0 ? pastFixtures[0] : null;

      const mostRecentFixtureID = mostRecentFixture.fixture.id;

      const statisticsResponse = await axios.get(
        `https://v3.football.api-sports.io/fixtures/statistics?fixture=${mostRecentFixtureID}`,
        {
          headers: {
            method: "GET",
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": process.env.API_FOOTBALL_KEY,
          },
        },
      );

      const { response: statistics } = statisticsResponse.data;

      // Extract the required fields (team ID, name, and ball possession)
      const statsSummary = statistics.map((teamStats: any) => {
        const { id, name } = teamStats.team;
        const ballPossession = teamStats.statistics.find(
          (stat: any) => stat.type === "Ball Possession",
        )?.value;

        return {
          id,
          name,
          ballPossession,
        };
      });

      mostRecentFixture.statisticsSummary = statsSummary;

      const eventsResponse = await axios.get(
        `https://v3.football.api-sports.io/fixtures/events?fixture=${mostRecentFixtureID}`,
        {
          headers: {
            method: "GET",
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": process.env.API_FOOTBALL_KEY,
          },
        },
      );

      const { response: events } = eventsResponse.data;

      mostRecentFixture.events = events;

      const teamLogoResponse = await axios.get(
        `https://api.football-data.org/v4/teams/66/matches`,
        {
          headers: {
            method: "GET",
            "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY,
          },
        },
      );

      const { matches } = teamLogoResponse.data;
      const now = new Date().toISOString();

      const prevMatches = matches.filter(
        (match: Fixture) => match.utcDate < now,
      );

      const prevMatch = prevMatches[prevMatches.length - 1];

      const teamLogos = {
        home: {
          crest: prevMatch.homeTeam.crest,
          shortName: prevMatch.homeTeam.shortName,
        },
        away: {
          crest: prevMatch.awayTeam.crest,
          shortName: prevMatch.awayTeam.shortName,
        },
      };

      mostRecentFixture.crests = teamLogos;

      return mostRecentFixture;
    },
  },
};
