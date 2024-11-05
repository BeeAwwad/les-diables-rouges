"use client";

import { useQuery, gql } from "@apollo/client";
import { Progress } from "@/components/ui/progress";
import { FixtureEvent } from "@/types";
import clsx from "clsx";

const PREV_GAME = gql`
  query Query($id: ID!, $season: Int!) {
    getPreviousFixture(id: $id, season: $season) {
      fixture {
        id
      }
      teams {
        home {
          name
          id
        }
        away {
          name
          id
        }
      }
      goals {
        home
        away
      }
      statisticsSummary {
        ballPossession
        name
        id
      }
      events {
        time {
          elapsed
        }
        assist {
          name
        }
        type
        team {
          name
          id
        }
        player {
          name
        }
        detail
      }
      crests {
        home {
          crest
          shortName
        }
        away {
          crest
          shortName
        }
      }
    }
  }
`;

const PreviousMatch = () => {
  const { loading, error, data } = useQuery(PREV_GAME, {
    variables: {
      id: "33",
      season: 2024,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { fixture, teams, goals, statisticsSummary, events, crests } =
    data.getPreviousFixture;

  const filteredEvents = events.filter(
    (event: FixtureEvent) => event.type === "Card" || event.type === "Goal",
  );

  return (
    <div className="col-span-1 row-span-1 overflow-y-scroll rounded-lg shadow-md">
      <h2>Last Match</h2>
      <div className="flex justify-between">
        <div>
          <span>
            <img
              className="w-10"
              src={crests.home.crest}
              alt="home team crest"
            />
            <p>{crests.home.shortName}</p>
          </span>
        </div>
        <div>
          <span>{goals.home}</span>
          <span>-</span>
          <span>{goals.away}</span>
        </div>
        <div>
          <span>
            <img
              className="w-10"
              src={crests.away.crest}
              alt="away team crest"
            />
            <p>{crests.away.shortName}</p>
          </span>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <span>{statisticsSummary[0].ballPossession}</span>
          <span>Possession</span>
          <span>{statisticsSummary[1].ballPossession}</span>
        </div>
        <Progress value={parseInt(statisticsSummary[0].ballPossession)} />
        <div className="relative w-full">
          {filteredEvents.map((event: FixtureEvent, index: number) => (
            <div key={index + 1} className="grid">
              <span className="absolute left-1/2">{event.type}</span>
              <span
                className={clsx({
                  "justify-self-start": teams.home.id === event.team.id,
                  "justify-self-end": teams.away.id === event.team.id,
                })}
              >
                <span>{event.player.name}</span>
                <span className="ml-1">{event.time.elapsed}'</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviousMatch;
