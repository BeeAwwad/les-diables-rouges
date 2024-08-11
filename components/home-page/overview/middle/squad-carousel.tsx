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

    console.log("checking for re-renders");
    const handleSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const { loading, error, data } = useQuery(SQUAD_LIST, {
    variables: { id: "102" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { players } = data.getTeam;

  return (
    <div className="w-full md:w-1/2">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 4500,
            stopOnInteraction: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {players.map((player: Player, index: number) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-lg font-medium">
                      {player.player_name}
                    </span>
                    <span className="text-3xl font-semibold">
                      {player.player_number}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center">
        <Button onClick={() => api?.scrollTo(current - 1)}>prev</Button>
        <Button onClick={() => api?.scrollTo(current + 1)}>next</Button>
      </div>
    </div>
  );
};
