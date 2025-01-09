"use client";
import { useQuery, gql } from "@apollo/client";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const SQUAD_LIST = gql`
  query Query($id: ID!) {
    getTeam(id: $id) {
      team_key
      players {
        player_name
        player_number
      }
    }
  }
`;

type Player = {
  player_name: string;
  player_number: number;
};

export const SquadCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const { loading, error, data } = useQuery(SQUAD_LIST, {
    variables: { id: "102" },
  });

  if (loading) return <p className="item-two">Loading...</p>;
  if (error) return <p className="item-two">Error: {error.message}</p>;

  const { players } = data.getTeam;

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 4500,
          stopOnInteraction: true,
        }),
      ]}
      className="item-two"
    >
      <CarouselContent>
        {players.map((player: Player, index: number) => (
          <CarouselItem className="h-full" key={index}>
            <Card>
              <CardContent className="flex items-center justify-center gap-2 p-6">
                <span className="text-lg font-medium">
                  {player.player_name.includes(" ")
                    ? player.player_name.split(" ").slice(1).join(" ")
                    : player.player_name}
                </span>
                <span className="text-3xl font-semibold">
                  {player.player_number}
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-between">
        <Button onClick={() => api?.scrollTo(current - 1)}>prev</Button>
        <Button onClick={() => api?.scrollTo(current + 1)}>next</Button>
      </div>
    </Carousel>
  );
};
