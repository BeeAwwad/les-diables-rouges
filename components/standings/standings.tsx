"use client";

import { useQuery, gql } from "@apollo/client";
import { PlTeamStats } from "@/types";
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
    <div className="overflow-y-scroll">
      <h2 className="mb-4 text-5xl font-semibold text-[#f2303c]">Standings</h2>
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
                "from-[#2bc0ff] via-[#32b8ff] to-[#8c48ff] transition-all duration-75 ease-linear hover:scale-105 hover:bg-gradient-to-r hover:text-white",
                {
                  "bg-[#fff]": index % 2 === 0,
                  "bg-[#eef2f3]": index % 2 !== 0,
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
