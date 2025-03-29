"use client";
import { useQuery, gql } from "@apollo/client";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayerSlide, Carousel } from "@/components/ui/custom-carousel";

const SQUAD_LIST = gql`
  query Query($id: ID!) {
    getTeam(id: $id) {
      team_key
      players {
        player_id
        player_name
        player_complete_name
        player_number
        player_type
        player_goals
        player_assists
        player_saves
        player_inside_box_saves
        player_injured
        player_match_played
        player_key_passes
        player_shots_total
        player_rating
        player_tackles
        player_interceptions
        player_passes_accuracy
        player_goals_conceded
        player_blocks
      }
    }
  }
`;

type Player = {
  player_name: string;
  player_number: string;
};

export const SquadCarousel = () => {
  const { loading, error, data } = useQuery(SQUAD_LIST, {
    variables: { id: "102" },
  });

  if (loading)
    return (
      <Skeleton className="item-two no-scrollbar items-center justify-center rounded-lg bg-white shadow-xs" />
    );
  if (error)
    return (
      <div className="item-two no-scrollbar items-center justify-center rounded-lg bg-white shadow-xs">
        <p>Error: {error.message}</p>
      </div>
    );

  const { players } = data.getTeam;

  const PlayersInComponent = players
    .filter((player: Player) => player.player_number?.trim() !== "")
    .map((player: Player, index: number) => {
      return (
        <PlayerSlide
          key={index}
          name={
            player.player_name.includes(" ")
              ? player.player_name.split(" ").slice(1).join(" ")
              : player.player_name
          }
          number={player.player_number}
        />
      );
    });

  return (
    <div className="item-two no-scrollbar flex items-center justify-center rounded-lg bg-white shadow-xs">
      <Carousel items={PlayersInComponent} />
    </div>
  );
};
