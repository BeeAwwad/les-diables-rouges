"use client";

import { usePlayers } from "@/queries/usePlayers";
import type { PlayerProps } from "@/lib/types";
import PlayerCard from "./player-card";
import Loader from "@/components/custom-ui/loader";
import { abrilFatface } from "@/fonts/fonts";
import { useState } from "react";
import CustomButton from "@/components/custom-ui/button";

function groupByPosition(players: PlayerProps[]) {
  return players.reduce<Record<PlayerProps["position"], PlayerProps[]>>(
    (acc, player) => {
      acc[player.position].push(player);
      return acc;
    },
    {
      Goalkeeper: [],
      Defender: [],
      Midfielder: [],
      Attacker: [],
    },
  );
}

const Players = () => {
  const { data: players, isLoading, isError } = usePlayers();
  type FilterType = "All" | PlayerProps["position"];

  const [playerType, setPlayerType] = useState<FilterType>("All");

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  if (isError || !players) {
    return <p>Failed to load players.</p>;
  }

  const groupedPlayers = groupByPosition(players);

  const filteredGroupedPlayers = Object.entries(groupedPlayers).filter(
    (group) => playerType === "All" || playerType === group[0],
  );

  return (
    <div className="space-y-10 pl-3 md:pl-0 pb-6 pr-3 md:pr-6 overflow-y-scroll">
      <h1
        className={`text-primary mb-4 text-3xl font-semibold md:text-5xl ${abrilFatface.className}`}
      >
        Team Squad
      </h1>
      <div className="flex flex-wrap gap-2 my-8">
        {["All", "Goalkeeper", "Defender", "Midfielder", "Attacker"].map(
          (type) => {
            return (
              <CustomButton
                key={type}
                onClick={() => setPlayerType(type as FilterType)}
                className={`${
                  playerType === type
                    ? ""
                    : "bg-primary-600 text-primary-400 hover:bg-primary-600 border-primary-400 hover:border-primary-400"
                }`}
              >
                {type}
              </CustomButton>
            );
          },
        )}
      </div>
      {filteredGroupedPlayers.map(([position, players]) => (
        <section key={position} className="space-y-4">
          <h2 className="text-xl font-semibold">{position}s</h2>

          {players.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No players in this category.
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {players.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
};

export default Players;
