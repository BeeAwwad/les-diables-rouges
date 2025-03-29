"use client";

import { useQuery, gql } from "@apollo/client";
import { Player } from "@/app/api/graphql/types";
import { Defender, Forward, Goalkeeper, Midfielder, Header } from "./player";
import clsx from "clsx";
import { abrilFatface } from "@/fonts/fonts";

const SQUAD_LIST = gql`
  query Query($id: ID!) {
    getTeam(id: $id) {
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

const Squad = () => {
  const { loading, error, data } = useQuery(SQUAD_LIST, {
    variables: { id: "102" },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { players } = data.getTeam;

  const filteredPlayers = players.filter(
    (player: Player) => player.player_number?.trim() !== "",
  );

  const categorizePlayers = (type: string) =>
    filteredPlayers.filter((player: Player) => player.player_type === type);

  const Forwards = categorizePlayers("Forwards");
  const Midfielders = categorizePlayers("Midfielders");
  const Defenders = categorizePlayers("Defenders");
  const Goalies = categorizePlayers("Goalkeepers");

  return (
    <div className="scrollbar-thin flex flex-col gap-10 overflow-y-scroll px-0.5 md:px-2.5">
      <h2
        className={`text-primary-300 text-3xl font-semibold md:text-5xl ${abrilFatface.className} `}
      >
        Squad
      </h2>
      <div>
        <Header
          title="Forwards"
          apps="Apps"
          statOne="Key passes"
          statTwo="Goals"
          statThree="Assists"
        />
        {Forwards.map((forward: Player, index: number) => (
          <div
            className={"mb-4 flex items-center justify-between bg-gray-50"}
            key={index}
          >
            <Forward
              number={forward.player_number}
              name={forward.player_name}
              matchesPlayed={forward.player_match_played}
              keyPasses={forward.player_key_passes}
              goals={forward.player_goals}
              assists={forward.player_assists}
            />
          </div>
        ))}
      </div>
      <div>
        <Header
          title="Midfielders"
          apps="Apps"
          statOne="Tackles"
          statTwo="Goals"
          statThree="Assists"
        />
        {Midfielders.map((midfielder: Player, index: number) => (
          <div
            className={"mb-4 flex items-center justify-between bg-gray-50"}
            key={index}
          >
            <Midfielder
              number={midfielder.player_number}
              name={midfielder.player_name}
              matchesPlayed={midfielder.player_match_played}
              tackles={midfielder.player_tackles}
              goals={midfielder.player_goals}
              assists={midfielder.player_assists}
            />
          </div>
        ))}
      </div>
      <div>
        <Header
          title="Defenders"
          apps="Apps"
          statOne="Tackles"
          statTwo="Interceptions"
          statThree="Blocks"
        />
        {Defenders.map((defender: Player, index: number) => (
          <div
            className={clsx(
              "mb-4 flex items-center justify-between bg-gray-50",
            )}
            key={index}
          >
            <Defender
              number={defender.player_number}
              name={defender.player_name}
              matchesPlayed={defender.player_match_played}
              tackles={defender.player_tackles}
              interceptions={defender.player_interceptions}
              blocks={defender.player_blocks}
            />
          </div>
        ))}
      </div>
      <div>
        <Header
          title="Goales"
          apps="Apps"
          statOne="Saves"
          statTwo="Saves in 18"
          statThree="G/C"
        />
        {Goalies.map((goalie: Player, index: number) => (
          <div
            className={"mb-4 flex items-center justify-between bg-gray-50"}
            key={index}
          >
            <Goalkeeper
              number={goalie.player_number}
              name={goalie.player_name}
              matchesPlayed={goalie.player_match_played}
              saves={goalie.player_saves}
              savesInsideBox={goalie.player_inside_box_saves}
              goalsConceded={goalie.player_goals_conceded}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Squad;
