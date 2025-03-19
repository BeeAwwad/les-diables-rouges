"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/browser";
import CustomButton from "../ui/custom-button";
import { toast } from "sonner";

type Player = {
  id: string;
  name: string;
  position: string;
  shirt_number: number;
  created_at: string;
};

const positionMapping = {
  GK: ["Goalkeeper"],
  CB: ["Defender"],
  RWB: ["Defender"],
  LWB: ["Defender"],
  CM: ["Midfielder"],
  CAM: ["Midfielder", "Attacker"],
  ST: ["Attacker"],
};

const VotingForm = ({
  userId,
  players,
  matchId,
}: {
  userId: string;
  players: Player[];
  matchId: string;
}) => {
  const supabase = createClient();
  const [selectedPlayers, setSelectedPlayers] = useState({});
  console.log("🚀 ~ selectedPlayers:", selectedPlayers);

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
      toast.warning("Please select 11 players.");
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
      toast.error("Error submitting vote. Please try again.");
    } else {
      toast.success("Vote submitted successfully!");
    }
  };

  // Helper function to return position names
  const getPositionName = (
    positionNumber: number,
  ): keyof typeof positionMapping => {
    const positions: (keyof typeof positionMapping)[] = [
      "GK",
      "CB",
      "CB",
      "CB",
      "RWB",
      "LWB",
      "CM",
      "CM",
      "CAM",
      "CAM",
      "ST",
    ];
    return positions[positionNumber - 1] ?? "GK";
  };

  // Filter players based on position mapping
  const getFilteredPlayers = (position: keyof typeof positionMapping) => {
    return players.filter((player) =>
      positionMapping[position]?.includes(player.position),
    );
  };

  return (
    <div className="mx-auto my-4 flex max-w-2xl flex-col items-center justify-center gap-4 rounded border p-2 xl:max-w-4xl 2xl:max-w-6xl">
      <h2 className="text-lg font-bold">Vote for Your Starting XI</h2>

      <div className="grid w-full grid-cols-2 gap-4">
        {[...Array(11).keys()].map((pos) => {
          const positionNumber = pos + 1;
          const position = getPositionName(positionNumber);
          const filteredPlayers = getFilteredPlayers(position);
          return (
            <div key={positionNumber} className="rounded border p-3">
              <label className="block text-sm font-medium">{position}</label>
              <select
                className="mt-1 w-full rounded border p-2 text-xs sm:text-sm"
                onChange={(e) =>
                  handlePlayerSelection(positionNumber, e.target.value)
                }
              >
                <option value="">Select Player</option>
                {filteredPlayers.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name} ({player.shirt_number})
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
      <CustomButton onclick={submitVote}>Submit Vote</CustomButton>
    </div>
  );
};

export default VotingForm;
