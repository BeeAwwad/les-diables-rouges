"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useTeams } from "@/queries/useTeams";
import { useStartingXI } from "@/queries/useStartingXI";
import { PlayerXiProps } from "@/lib/types";
import { usePlayers } from "@/queries/usePlayers";
import { useMatchStore } from "@/stores/useMatchStore";
import { useSyncMatchStore } from "@/hooks/useSyncMatchStore";
import Link from "next/link";

const formation = [
  { position: "GK", x: 50, y: 90 },
  { position: "RB", x: 85, y: 70 },
  { position: "LB", x: 15, y: 70 },
  { position: "CB", x: 35, y: 70 },
  { position: "CB", x: 65, y: 70 },
  { position: "CM", x: 30, y: 50 },
  { position: "RW", x: 82, y: 30 },
  { position: "CM", x: 50, y: 40 },
  { position: "ST", x: 50, y: 13 },
  { position: "CM", x: 70, y: 50 },
  { position: "LW", x: 18, y: 30 },
];

const MostVotedXI = () => {
  const { data: players } = usePlayers();
  const { data: teams } = useTeams();
  useSyncMatchStore();
  const nextMatch = useMatchStore((s) => s.nextMatch);
  const { data: MostVotedXI, isLoading, isError } = useStartingXI();

  if (isLoading) {
    return <Skeleton className="item-three rounded-md shadow-xs" />;
  }

  if (isError) {
    return (
      <div className="item-three flex items-center justify-center rounded-md bg-red-100 p-4 text-center text-red-500 shadow-xs lg:text-lg">
        <p>Error loading best voted 11</p>
      </div>
    );
  }

  const homeTeam = teams?.find((t) => t.id === nextMatch?.home_team_id);
  const awayTeam = teams?.find((t) => t.id === nextMatch?.away_team_id);

  const playerMap: { [key: number]: PlayerXiProps } = {};

  MostVotedXI?.forEach((p) => {
    playerMap[p.position_number] = p;
  });

  return (
    <div className="item-three no-scrollbar overflow-y-scroll rounded-lg">
      <div className="relative aspect-3/4 w-full bg-emerald-600 shadow-md">
        <p className="mx-auto w-fit pt-4 pb-3 text-xs text-white">
          <span>{homeTeam?.short_name}</span> vs{" "}
          <span>{awayTeam?.short_name}</span>
        </p>
        {/* <div className="absolute inset-0 border-2 border-white" /> */}
        <div className="absolute top-1/2 left-0 h-0.5 w-full bg-white" />
        <div className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white" />

        {MostVotedXI?.length !== 0 ? (
          formation.map((pos, i) => {
            const player = playerMap[i + 1];
            const fullPlayer = players?.find((p) => p.id === player?.player_id);
            return (
              <div
                key={i}
                className="absolute flex flex-col items-center justify-center text-xs text-white"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="bg-primary-300 z-20 flex size-10 items-center justify-center rounded-full border border-white text-sm font-bold">
                  {player?.position_number}
                </div>
                <span className="mt-1 text-center">
                  {fullPlayer?.name.split(" ").slice(-1)[0] ?? ""}
                </span>
                <span className="text-[10px] opacity-75">
                  {player?.vote_percentage ?? 0}% votes
                </span>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center text-primary-100 px-2 py-4 gap-2">
            <p>No one has voted for this fixture</p>
            <Link
              className="underline hover:text-primary"
              href={"/predict-eleven"}
            >
              Vote Now!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MostVotedXI;
