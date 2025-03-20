"use client";

import { useQuery, gql } from "@apollo/client";
import { PlTeamStats } from "@/app/api/graphql/types";
import clsx from "clsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { abrilFatface } from "@/fonts/fonts";

const PL_TABLE = gql`
  query Query {
    getPlStandings {
      position
      team {
        shortName
        id
      }
      playedGames
      won
      lost
      draw
      points
    }
  }
`;
export const Standings = () => {
  const { loading, error, data } = useQuery(PL_TABLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const plTable = data.getPlStandings;

  return (
    <div className="scrollbar-thin overflow-y-scroll">
      <h2
        className={`text-primary-300 mb-4 text-3xl font-semibold md:text-5xl ${abrilFatface.className}`}
      >
        Standings
      </h2>
      <Table>
        <TableCaption>Premier League Table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead>Club</TableHead>
            <TableHead>Played</TableHead>
            <TableHead>Won</TableHead>
            <TableHead>Draw</TableHead>
            <TableHead>Lost</TableHead>
            <TableHead>Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plTable.map((club: PlTeamStats, index: number) => (
            <TableRow
              className={clsx(
                "from-[#2bc0ff] via-[#32b8ff] to-[#8c48ff] transition-all duration-75 ease-linear hover:scale-105 hover:bg-linear-to-r hover:text-white",
                {
                  "bg-white": index % 2 === 0,
                  "bg-primary-100": index % 2 !== 0,
                },
                {
                  "from-primary-200 via-primary-300 to-primary bg-linear-to-r text-white":
                    club.team.id === "66",
                },
              )}
              key={index}
            >
              <TableCell>{club.position}</TableCell>
              <TableCell>{club.team.shortName}</TableCell>
              <TableCell>{club.playedGames}</TableCell>
              <TableCell>{club.won}</TableCell>
              <TableCell>{club.draw}</TableCell>
              <TableCell>{club.lost}</TableCell>
              <TableCell>{club.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
