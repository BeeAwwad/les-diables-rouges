import axios from "axios";
import {
  ApiFixtureResponse,
  Fixture,
  FixturesResponse,
  PlStandings,
  Team,
} from "@/app/api/graphql/types";
import { v4 as uuidv4 } from "uuid";

export const resolvers = {
  Query: {
    getFixtures: async (
      _: unknown,
      { id }: { id: string },
    ): Promise<FixturesResponse> => {
      const generatedId = uuidv4();

      const response = await axios.get(
        `https://api.football-data.org/v4/teams/${id}/matches`,
        {
          headers: {
            method: "GET",
            "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY,
          },
        },
      );
      return {
        id: generatedId,
        ...response.data,
      };
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
      console.log("🚀 ~ nextMatch:", nextMatch);

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
      const generatedId = uuidv4();
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

        return {
          id: generatedId,
          ...lesDablesRouges,
        };
      } catch (error) {
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
      try {
        // Fetch fixtures
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

        // Filter past fixtures
        const pastFixtures = AllFixtures.filter(
          (fixture: ApiFixtureResponse) =>
            fixture.fixture.date < currentDate &&
            fixture.league.name === "Premier League",
        );

        pastFixtures.sort(
          (a: ApiFixtureResponse, b: ApiFixtureResponse) =>
            new Date(b.fixture.date).getTime() -
            new Date(a.fixture.date).getTime(),
        );

        const mostRecentFixture = pastFixtures.length > 0
          ? pastFixtures[0]
          : null;

        if (!mostRecentFixture || !mostRecentFixture.fixture) {
          throw new Error("No recent fixture found or fixture data is missing");
        }

        const mostRecentFixtureID = mostRecentFixture.fixture.id;

        // Fetch statistics
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

        // Fetch events
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

        // Fetch team logos
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
      } catch (error) {
        console.error("Error fetching fixture or data:", error);
        throw new Error("Failed to fetch fixture or related data");
      }
    },

    getForm: async (
      _: unknown,
      { id, season }: { id: string; season: number },
    ): Promise<string> => {
      try {
        // Fetch Team Form
        const response = await axios.get(
          `https://v3.football.api-sports.io/teams/statistics?season=${season}&team=${id}&league=39`,
          {
            headers: {
              method: "GET",
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": process.env.API_FOOTBALL_KEY,
            },
          },
        );

        const TeamData = response.data;

        const currentFormData = TeamData?.response?.form;

        return currentFormData;
      } catch (error) {
        console.error("Error fetching fixture or data:", error);
        throw new Error("Failed to fetch fixture or related data");
      }
    },
  },
};
