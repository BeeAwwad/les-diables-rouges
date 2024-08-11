"use client";

import { useQuery, gql } from "@apollo/client";
import { PlTeamStats } from "@/types";
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
export const OverviewTable = () => {
  const { loading, error, data } = useQuery(PL_TABLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const plTable = data.getPlStandings;
  const lesDiables = 66;
  const targetIndex = plTable.findIndex(
    (club: PlTeamStats) => club.team.id === lesDiables,
  );

  const start = Math.max(0, targetIndex - 2);
  const end = Math.min(plTable.length, targetIndex + 3);
  const filteredTable = plTable.slice(start, end);
  console.log("🚀 ~ OverviewTable ~ filteredTable:", filteredTable);
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
        {filteredTable.map((club: PlTeamStats) => (
          <TableRow key={club.position}>
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
  );
};
