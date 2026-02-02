"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeagueTable } from "@/queries/useLeagueTable";
import { LeagueTableProps } from "@/lib/types";
import { useTeams } from "@/queries/useTeams";

export const OverviewTable = () => {
  const { data: plTable, isLoading, isError } = useLeagueTable();
  const { data: teams } = useTeams();

  if (isLoading)
    return (
      <Skeleton className="item-six flex items-center justify-center shadow-xs" />
    );

  if (isError)
    return (
      <div className="item-six scrollbar-none flex items-center justify-center rounded-md bg-red-100 p-4 text-center text-primary-300 shadow-xs lg:text-lg">
        <p>Error loading league table</p>
      </div>
    );

  const premierLeagueTable = plTable?.sort((a, b) => a.position - b.position);

  const lesDiables = 66;
  const targetIndex = premierLeagueTable?.findIndex(
    (club: LeagueTableProps) => club.team_id === lesDiables,
  );

  const start = targetIndex ? Math.max(0, targetIndex - 2) : 0;
  const end = premierLeagueTable
    ? targetIndex
      ? Math.min(premierLeagueTable.length, targetIndex + 3)
      : 4
    : 4;
  const filteredTable = premierLeagueTable?.slice(start, end);
  return (
    <div className="item-six no-scrollbar overflow-y-scroll rounded-sm bg-white p-4 shadow-xs">
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
          {filteredTable?.map((club: LeagueTableProps, index: number) => {
            const clubData = teams?.find((team) => team.id === club.team_id);
            return (
              <TableRow key={index}>
                <TableCell>{club.position}</TableCell>
                <TableCell>{clubData?.short_name}</TableCell>
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
    </div>
  );
};
