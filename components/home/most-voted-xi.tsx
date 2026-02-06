"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";

type Player = {
  id: string;
  player_name: string;
  match_id: string;
  position: string;
  position_number: number;
  vote_count: number;
  updated_at: string;
  vote_percentage?: number;
};

type Match = {
  id: string;
  home_team: string;
  away_team: string;
  status: string;
  match_date: string;
};

const formation = [
  { position: "GK", x: 50, y: 90 },
  { position: "CB", x: 30, y: 70 },
  { position: "CB", x: 50, y: 70 },
  { position: "CB", x: 70, y: 70 },
  { position: "RWB", x: 85, y: 50 },
  { position: "LWB", x: 15, y: 50 },
  { position: "CM", x: 40, y: 51 },
  { position: "CM", x: 60, y: 51 },
  { position: "CAM", x: 35, y: 33 },
  { position: "CAM", x: 65, y: 33 },
  { position: "ST", x: 50, y: 19 },
];

const MostVotedXI = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [latestMatch, setLatestMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseBrowerClient();
  useEffect(() => {
    const fetchLatestMatchId = async () => {
      setLoading(true);
      setError(null);

      const { data: match, error: matchErr } = await supabase
        .from("matches")
        .select("id,home_team, away_team, status, match_date")
        .order("match_date", { ascending: false })
        .limit(1)
        .single();

      if (matchErr) {
        console.error("Match Error:", matchErr);
        setError("Failed to fetch latest match.");
        setLoading(false);
        return;
      }

      setLatestMatch(match ?? null);
    };

    fetchLatestMatchId();
  }, []);

  useEffect(() => {
    const getStartingXI = async (matchId: string) => {
      setLoading(true);
      setError(null);

      const client = createClient();

      // 1. Fetch all vote counts for all players
      const { data: allVotes, error: allVotesError } = await client
        .from("player_vote_totals")
        .select("*")
        .eq("match_id", matchId);

      if (allVotesError) {
        console.error("Player Votes Error:", allVotesError);
        setError("Failed to fetch player votes.");
        setLoading(false);
        return;
      }

      // 2. Get top-voted players (same logic as before)
      const topVoted = allVotes.reduce((acc, row) => {
        const position = row.position_number;
        const existing = acc[position];
        if (!existing) {
          acc[position] = row;
        } else {
          if (row.vote_count > existing.vote_count) {
            acc[position] = row;
          }
        }
        return acc;
      }, {});

      const topVotedPlayers = Object.values(topVoted);

      // 3. Compute total votes per position
      const totalVotesPerPosition: Record<number, number> = {};
      allVotes.forEach((p) => {
        totalVotesPerPosition[p.position_number] =
          (totalVotesPerPosition[p.position_number] || 0) + p.vote_count;
      });

      // 4. Attach percentage to topVoted players
      const enriched = (topVotedPlayers as Player[]).map((p) => ({
        ...p,
        vote_percentage: Math.round(
          (p.vote_count / totalVotesPerPosition[p.position_number]) * 100,
        ),
      }));

      setPlayers(enriched);
      setLoading(false);
    };

    if (latestMatch) {
      getStartingXI(latestMatch.id);
    }
  }, [latestMatch]);

  if (loading) {
    return <Skeleton className="item-three shadow-xs" />;
  }

  if (error) {
    return (
      <div className="item-three flex items-center justify-center rounded-md bg-red-100 p-4 text-center text-red-500 shadow-xs lg:text-lg">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="item-three rounded-md bg-gray-50 p-4 shadow-sm">
        <p>No votes available for the latest match.</p>
      </div>
    );
  }

  // Map players by position number
  const playerMap: { [key: number]: Player } = {};
  players.forEach((p) => {
    playerMap[p.position_number] = p;
  });

  return (
    <div className="item-three no-scrollbar overflow-y-scroll rounded-lg">
      <div className="relative aspect-3/4 w-full bg-emerald-600 shadow-md">
        <p className="mx-auto w-fit py-3 text-xs text-white">
          <span>{latestMatch?.home_team}</span> vs{" "}
          <span>{latestMatch?.away_team}</span>
        </p>
        {/* <div className="absolute inset-0 border-2 border-white" /> */}
        <div className="absolute top-1/2 left-0 h-0.5 w-full bg-white" />
        <div className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white" />

        {formation.map((pos, i) => {
          const player = playerMap[i + 1];
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
                {player.position}
              </div>
              <span className="mt-1 text-center">
                {player?.player_name?.split(" ").slice(-1)[0] ?? ""}
              </span>
              <span className="text-[10px] opacity-75">
                {player?.vote_percentage ?? 0}% votes
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MostVotedXI;
