"use client";
import { createClient } from "@/utils/supabase/browser";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MostVotedXI = () => {
  const [players, setPlayers] = useState<any[]>([]);
  console.log("🚀 ~ MostVotedXI ~ players:", players);
  const [latestMatchId, setLatestMatchId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestMatchId = async () => {
      setLoading(true);
      setError(null);

      const { data: match, error } = await createClient()
        .from("matches")
        .select("id")
        .order("match_date", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Match Error:", error);
        setError("Failed to fetch latest match.");
        setLoading(false);
        return;
      }

      setLatestMatchId(match?.id ?? null);
    };

    fetchLatestMatchId();
  }, []);

  useEffect(() => {
    const getStartingXI = async (matchId: string) => {
      setLoading(true);
      setError(null);

      const { data, error } = await createClient()
        .from("player_vote_totals")
        .select("*")
        .eq("match_id", matchId)
        .order("position_number", { ascending: true })
        .order("vote_count", { ascending: false })
        .order("updated_at", { ascending: true });

      if (error) {
        console.error("Player Votes Error:", error);
        setError("Failed to fetch player votes.");
        setLoading(false);
        return;
      }

      const seen = new Set<number>();
      const filtered = data.filter((row) => {
        if (seen.has(row.position_number)) return false;
        seen.add(row.position_number);
        return true;
      });

      setPlayers(filtered);
      setLoading(false);
    };

    if (latestMatchId) {
      getStartingXI(latestMatchId);
    }
  }, [latestMatchId]);

  if (loading) {
    return <Skeleton className="item-three shadow-xs" />;
  }

  if (error) {
    return (
      <div className="item-three rounded-md bg-red-100 p-4 text-red-500 shadow-sm">
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

  return (
    <div className="item-three no-scrollbar grid grid-cols-1 gap-2 overflow-y-scroll bg-white">
      {players.map((player, index) => (
        <div key={index + 1} className="rounded-xl p-4 shadow-sm">
          <p>
            <strong>Position {player.position_number}:</strong>{" "}
            {player.position}
          </p>
          <p>Player ID: {player.player_id}</p>
          <p>Votes: {player.vote_count}</p>
        </div>
      ))}
    </div>
  );
};

export default MostVotedXI;
