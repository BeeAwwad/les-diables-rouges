import axios from "axios";
import { FixturesResponse, Fixture, Team } from "@/types";

export const resolvers = {
  Query: {
    hello: () => "world",

    getFixtures: async (
      _: unknown,
      { id }: { id: string },
    ): Promise<FixturesResponse> => {
      const response = await axios.get(
        `https://api.football-data.org/v4/teams/${id}/matches`,
        {
          headers: {
            method: "GET",
            "X-Auth-Token": process.env.FOOTBALL_DATA_API_TOKEN,
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
            "X-Auth-Token": process.env.FOOTBALL_DATA_API_TOKEN,
          },
        },
      );
      const { matches } = response.data;
      const nextMatch = matches.find(
        (match: Fixture) => match.season.currentMatchday === match.matchday,
      );
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
            "X-Auth-Token": process.env.FOOTBALL_DATA_API_TOKEN,
          },
        },
      );
      return response.data;
    },

    getTeam: async (_: unknown, { id }: { id: string }): Promise<Team> => {
      try {
        const response = await axios.get(
          `https://apiv3.apifootball.com/?action=get_teams&league_id=152&APIkey=${process.env.API_FOOTBALL_API_TOKEN}`,
        );

        console.log(process.env.API_FOOTBALL_API_TOKEN, "API token");

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
  },
};
