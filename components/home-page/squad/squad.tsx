"use client";

import { useQuery, gql } from "@apollo/client";
import { Player } from "@/types";
import { Defender, Forward, Goalkeeper, Midfielder, Header } from "./player";

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
      }
    }
  }
`;

const Squad = () => {
  const { loading, error, data } = useQuery(SQUAD_LIST, {
    variables: { id: "102" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { players } = data.getTeam;

  const Forwards = players.filter(
    (player: Player) => player.player_type === "Forwards",
  );

  const Midfielders = players.filter(
    (player: Player) => player.player_type === "Midfielders",
  );

  const Defenders = players.filter(
    (player: Player) => player.player_type === "Defenders",
  );

  const Goalies = players.filter(
    (player: Player) => player.player_type === "Goalkeepers",
  );
  return (
    <div className="flex flex-col gap-10 overflow-y-scroll">
      <div>
        <Header
          title="Goales"
          apps="Apps"
          statOne="Saves"
          statTwo="Saves in 18"
          statThree="Goals conceded"
        />
        {Goalies.map((goalie: Player, index: number) => (
          <div className="mb-4 flex items-center justify-between" key={index}>
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
      <div>
        <Header
          title="Defenders"
          apps="Apps"
          statOne="Tackles"
          statTwo="Interceptions"
          statThree="Goals conceded"
        />
        {Defenders.map((defender: Player, index: number) => (
          <div className="mb-4 flex items-center justify-between" key={index}>
            <Defender
              number={defender.player_number}
              name={defender.player_name}
              matchesPlayed={defender.player_match_played}
              tackles={defender.player_tackles}
              interceptions={defender.player_interceptions}
              goalsConceded={defender.player_goals_conceded}
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
          <div className="mb-4 flex items-center justify-between" key={index}>
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
          title="Forwards"
          apps="Apps"
          statOne="Key passes"
          statTwo="Goals"
          statThree="Assists"
        />
        {Forwards.map((forward: Player, index: number) => (
          <div className="mb-4 flex items-center justify-between" key={index}>
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
    </div>
  );
};

export default Squad;
