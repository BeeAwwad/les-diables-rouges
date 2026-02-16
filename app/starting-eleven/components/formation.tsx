"use client";

import { useLineup } from "@/queries/useLineup";
import { useSyncMatchStore } from "@/hooks/useSyncMatchStore";
import { useMatchStore } from "@/stores/useMatchStore";
import { useTeams } from "@/queries/useTeams";
import { abrilFatface } from "@/fonts/fonts";
import Loader from "@/components/custom-ui/loader";
import { Skeleton } from "@/components/ui/skeleton";

const Formation = () => {
  const { data: lineup, isLoading, isError } = useLineup();
  const { data: teams } = useTeams();
  useSyncMatchStore();
  const nextMatch = useMatchStore((s) => s.nextMatch);
  const previousMatch = useMatchStore((s) => s.previousMatch);
  const now = useMatchStore((s) => s.now);

  if (isLoading)
    return (
      <div className="flex items-center justify-center md:w-[66%] md:max-h-[70vh] relative">
        <Loader />
        <Skeleton className="h-full w-full absolute top-0 z-0" />
      </div>
    );

  if (isError || !lineup || !nextMatch || !previousMatch) {
    return (
      <div className="flex items-center justify-center md:w-[66%] md:max-h-[70vh] relative">
        <p className="text-primary-300">Lineup isn't available yet.</p>
      </div>
    );
  }

  const match =
    (new Date(nextMatch.utc_date).getTime() - now) / (1000 * 60) < 60
      ? nextMatch
      : previousMatch;

  const homeTeam = teams?.find((t) => t.id === match?.home_team_id);
  const awayTeam = teams?.find((t) => t.id === match?.away_team_id);

  const groupedByRow = lineup.lineup_data.reduce(
    (acc, entry) => {
      const [row] = entry.player.grid.split(":").map(Number);

      if (!acc[row]) acc[row] = [];
      acc[row].push(entry);

      return acc;
    },
    {} as Record<number, typeof lineup.lineup_data>,
  );

  return (
    <div className="md:w-[60%] md:max-h-[73vh] overflow-x-hidden order-1 md:order-2">
      <div className="bg-emerald-400 py-1 px-2.5 md:px-10 md:py-5">
        <div className="relative aspect-3/4 w-full bg-emerald-600 shadow-md">
          <p
            className={`${abrilFatface.className} mx-auto w-fit py-2 md:py-4 lg:py-6 tracking-widest lg:text-xl font-semibold text-white`}
          >
            <span>{homeTeam?.short_name}</span> vs{" "}
            <span>{awayTeam?.short_name}</span>
          </p>
          <div className="absolute top-1/2 left-0 h-0.5 w-full bg-white/30" />
          <div className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30" />

          {Object.entries(groupedByRow).map(([row, players]) => {
            const yPos = 100 - Number(row) * 17;
            const total = players.length;
            const spacing = 100 / (total + 1);

            return players.map((entry, index) => {
              const { player } = entry;
              const xPos = spacing * (index + 1);

              return (
                <div
                  key={player.id}
                  className="absolute flex flex-col items-center justify-center text-white transition-all"
                  style={{
                    left: `${xPos}%`,
                    top: `${yPos}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="z-20 flex size-9 items-center justify-center rounded-full border-2 border-white bg-primary-300 text-xs font-bold shadow-xl">
                    {player.number}
                  </div>

                  <span className="mt-1 rounded bg-black/40 px-1 text-[10px] font-medium whitespace-nowrap backdrop-blur-sm">
                    {player.name.split(" ").slice(-1)[0]}
                  </span>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default Formation;
