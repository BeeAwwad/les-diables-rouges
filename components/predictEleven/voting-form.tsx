"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/browser";
import CustomButton from "../ui/custom-button";
import { toast } from "sonner";
import { abrilFatface } from "@/fonts/fonts";
import FormationDisplay from "./formation-display";

type Player = {
  id: string;
  name: string;
  position: string;
  shirt_number: number;
  created_at: string;
};

type Vote = {
  user_id: string;
  match_id: string;
  player_id: string;
  position_number: number;
  position: string;
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
  userVotes,
  isGuest,
}: {
  userId: string;
  players: Player[];
  matchId: string;
  userVotes: {
    player_id: string;
    position_number: number;
  }[];
  isGuest: boolean;
}) => {
  // const supabase = createClient();
  const [selectedPlayers, setSelectedPlayers] = useState<{
    [key: number]: Player;
  }>({});

  useEffect(() => {
    if (userVotes.length > 0) {
      const initialSelection: { [key: number]: Player } = {};
      userVotes.forEach((vote) => {
        const player = players.find((p) => p.id === vote.player_id);
        if (player) {
          initialSelection[vote.position_number] = player;
        }
      });
      setSelectedPlayers(initialSelection);
    }
  }, [userVotes, players]);

  const submitVoteAction = async (votes: Vote[]) => {
    const supabase = await createClient();
    const { error } = await supabase.from("votes").upsert(votes, {
      onConflict: "user_id, match_id, position, position_number, player_id",
    });

    if (error) {
      console.error("Error submitting vote:", error.message);
      return { success: false, error: error.message };
    } else {
      return { success: true };
    }
  };

  // Handle player selection for each position
  const handlePlayerSelection = (positionNumber: number, playerId: string) => {
    const player = players.find((player) => player.id === playerId);

    if (!player) {
      toast.error("Player not found.");
      return;
    }

    setSelectedPlayers((prev) => ({
      ...prev,
      [positionNumber]: player,
    }));
  };

  const submitVote = async () => {
    console.log(selectedPlayers);
    if (Object.keys(selectedPlayers).length !== 11) {
      toast.warning("Please select 11 players.");
      return;
    }

    if (!userId) {
      toast.info("Please sign in to submit your vote.");
      return;
    }

    const votes = Object.entries(selectedPlayers).map(
      ([positionNumber, player]) => ({
        user_id: userId,
        match_id: matchId,
        player_id: (player as Player).id,
        position_number: Number(positionNumber),
        position: getPositionName(Number(positionNumber)),
      }),
    );

    const result = await submitVoteAction(votes);

    if (result.success) {
      toast.success("Vote submitted successfully!");
    } else {
      toast.error(`Error submitting vote, ${result.error}`);
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
    <div className="xl:gap-10rounded mx-auto my-4 flex max-w-2xl flex-col items-center justify-center gap-5 p-2 md:gap-7 xl:max-w-4xl 2xl:max-w-6xl">
      <h2
        className={`${abrilFatface.className} text-primary-300 text-center text-3xl font-bold md:text-5xl`}
      >
        Vote Your Starting XI
      </h2>

      <FormationDisplay selectedPlayers={selectedPlayers} />

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
                value={selectedPlayers[positionNumber]?.id || ""}
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
      {!isGuest && (
        <CustomButton onClick={async () => await submitVote()}>
          Submit Vote
        </CustomButton>
      )}
    </div>
  );
};

export default VotingForm;
