"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayerSlide, Carousel } from "../custom-ui/carousel";
import { usePlayers } from "@/queries/usePlayers";
import { PlayerProps } from "@/lib/types";

export const SquadCarousel = () => {
  const { data: players, isLoading, isError } = usePlayers();

  if (isLoading)
    return (
      <Skeleton className="item-two no-scrollbar items-center justify-center rounded-sm bg-white shadow-xs" />
    );

  if (isError)
    return (
      <div className="item-two no-scrollbar flex items-center justify-center rounded-sm bg-red-100 p-4 text-center text-primary-300 shadow-xs lg:text-lg">
        <p>Error loading players</p>
      </div>
    );

  const PlayersInComponent = players?.map(
    (player: PlayerProps, index: number) => {
      return (
        <PlayerSlide
          key={index}
          name={
            player.name.includes(" ")
              ? player.name.split(" ").slice(1).join(" ")
              : player.name
          }
          number={player.shirt_number}
        />
      );
    },
  );

  return (
    <div className="item-two no-scrollbar flex items-center justify-center rounded-sm bg-white shadow-xs">
      <Carousel items={PlayersInComponent || []} />
    </div>
  );
};
