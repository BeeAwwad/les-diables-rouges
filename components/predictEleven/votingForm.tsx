"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/browser";

const VotingForm = ({
  userId,
  players,
  matchId,
}: {
  userId: string;
  players: any[];
  matchId: string;
}) => {
  const supabase = createClient();
  const [selectedPlayers, setSelectedPlayers] = useState({});

  // Handle player selection for each position
  const handlePlayerSelection = (positionNumber: number, playerId: string) => {
    setSelectedPlayers((prev) => ({
      ...prev,
      [positionNumber]: playerId,
    }));
  };

  // Submit the vote to Supabase
  const submitVote = async () => {
    if (Object.keys(selectedPlayers).length !== 11) {
      alert("You must select exactly 11 players.");
      return;
    }

    const votes = Object.entries(selectedPlayers).map(
      ([positionNumber, playerId]) => ({
        user_id: userId,
        match_id: matchId,
        player_id: playerId,
        position_number: Number(positionNumber),
        position: getPositionName(Number(positionNumber)),
      }),
    );

    const { error } = await supabase.from("votes").upsert(votes);

    if (error) {
      console.error("Error submitting vote:", error.message);
      alert("Error submitting vote. Please try again.");
    } else {
      alert("Vote submitted successfully!");
    }
  };

  // Helper function to return position names
  const getPositionName = (positionNumber: number) => {
    const positions = [
      "Goalkeeper",
      "Right Back",
      "Center Back",
      "Center Back",
      "Left Back",
      "Defensive Midfield",
      "Central Midfield",
      "Attacking Midfield",
      "Right Wing",
      "Left Wing",
      "Striker",
    ];
    return positions[positionNumber - 1] || "Unknown";
  };

  return (
    <div className="mx-auto rounded border">
      <h2 className="mb-4 text-lg font-bold">Vote for Your Starting XI</h2>

      <div className="grid grid-cols-2 gap-4">
        {[...Array(11).keys()].map((pos) => {
          const positionNumber = pos + 1;
          return (
            <div key={positionNumber} className="rounded border p-3">
              <label className="block text-sm font-medium">
                {getPositionName(positionNumber)}
              </label>
              <select
                className="mt-1 w-full rounded border p-2"
                onChange={(e) =>
                  handlePlayerSelection(positionNumber, e.target.value)
                }
              >
                <option value="">Select Player</option>
                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name} ({player.shirt_number})
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={submitVote}
      >
        Submit Vote
      </button>
    </div>
  );
};

export default VotingForm;
