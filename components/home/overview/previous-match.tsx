"use client";

import { useQuery, gql } from "@apollo/client";
import { Progress } from "@/components/ui/progress";
import { FixtureEvent } from "@/app/api/graphql/types";
import clsx from "clsx";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

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

  if (loading) return <Skeleton className="item-five shadow-xs" />;
  if (error)
    return (
      <div className="item-five flex items-center justify-center rounded-md bg-red-100 p-4 text-center text-red-500 shadow-xs lg:text-lg">
        <p>Error: {error.message}</p>
      </div>
    );

  const { teams, goals, statisticsSummary, events, crests } =
    data.getPreviousFixture;

  const filteredEvents = events.filter(
    (event: FixtureEvent) => event.type === "Card" || event.type === "Goal",
  );

  return (
    <div className="item-five no-scrollbar space-y-2 overflow-y-scroll rounded-lg bg-white p-3 shadow-xs">
      <div className="flex justify-between text-xs text-gray-600 sm:text-sm">
        <h2 className="px-4 pt-4">Last Match</h2>
        <h2 className="px-4 pt-4">EPL</h2>
      </div>
      <div className="flex justify-between px-4">
        <div>
          <span>
            <Image
              className="w-10"
              width={40}
              height={40}
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
          <span className="flex flex-col items-end">
            <Image
              className="w-10"
              width={40}
              height={40}
              src={crests.away.crest}
              alt="away team crest"
            />
            <p>{crests.away.shortName}</p>
          </span>
        </div>
      </div>
      <div className="px-4">
        <div className="flex justify-between">
          <span>{statisticsSummary[0].ballPossession}</span>
          <span>Possession</span>
          <span>{statisticsSummary[1].ballPossession}</span>
        </div>
        <Progress
          className="my-4"
          value={parseInt(statisticsSummary[0].ballPossession)}
        />
        <div className="relative w-full space-y-4">
          {filteredEvents.map((event: FixtureEvent, index: number) => (
            <div key={index + 1} className="relative grid">
              <span className="absolute left-1/2 -translate-x-1/2">
                {event.detail === "Yellow Card"
                  ? "🟨"
                  : event.detail === "Red Card"
                    ? "🟥"
                    : "⚽"}
              </span>
              <span
                className={clsx({
                  "justify-self-start": teams.home.id === event.team.id,
                  "justify-self-end": teams.away.id === event.team.id,
                })}
              >
                <span>
                  {event.player.name.includes(" ")
                    ? event.player.name.split(" ").slice(1).join(" ")
                    : event.player.name}
                </span>
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
