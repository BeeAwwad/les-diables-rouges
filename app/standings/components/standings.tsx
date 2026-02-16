"use client";

import clsx from "clsx";
import Loader from "@/components/custom-ui/loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLeagueTable } from "@/queries/useLeagueTable";
import { LeagueTableProps } from "@/lib/types";
import { useTeams } from "@/queries/useTeams";

export const Standings = () => {
  const { data: plTable, isError, isLoading } = useLeagueTable();
  const { data: teams } = useTeams();
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  if (isError) return <p>Error loading premier league table.</p>;

  return (
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
        {plTable?.map((club: LeagueTableProps, index: number) => {
          const team = teams?.find((team) => team.id === club.team_id);
          return (
            <TableRow
              className={clsx(
                "from-[#2bc0ff] via-[#32b8ff] to-[#8c48ff] transition-all duration-75 hover:bg-linear-to-r hover:text-white",
                {
                  "bg-white": index % 2 === 0,
                  "bg-primary-100": index % 2 !== 0,
                },
                {
                  "from-primary via-primary-300 to-primary bg-linear-to-r text-white":
                    club.team_id === 66,
                },
              )}
              key={index}
            >
              <TableCell>{club.position}</TableCell>
              <TableCell>{team?.short_name}</TableCell>
              <TableCell>{club.played_games}</TableCell>
              <TableCell>{club.won}</TableCell>
              <TableCell>{club.draw}</TableCell>
              <TableCell>{club.lost}</TableCell>
              <TableCell>{club.points}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
