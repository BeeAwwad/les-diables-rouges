"use client";
import { useQuery, gql } from "@apollo/client";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const { loading, error, data } = useQuery(SQUAD_LIST, {
    variables: { id: "102" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { players, team_key } = data.getTeam;

  return (
    <div className="w-full md:w-1/2">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full max-w-xs"
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
