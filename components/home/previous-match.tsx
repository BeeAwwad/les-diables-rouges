"use client";

import { Progress } from "@/components/ui/progress";
import clsx from "clsx";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useMatchHistory } from "@/queries/useMatchHistory";
import { useFixtures } from "@/queries/useFixtures";
import { FixtureProps } from "@/lib/types";
import { useTeams } from "@/queries/useTeams";

const PreviousMatch = () => {
  const {
    data: previousMatchData,
    isError,
    isLoading,
    error,
  } = useMatchHistory();
  const { data: AllFixtures } = useFixtures();
  const { data: teams } = useTeams();

  if (isLoading) return <Skeleton className="item-five shadow-xs" />;

  if (isError)
    return (
      <div className="item-five flex items-center justify-center rounded-md bg-red-100 p-4 text-center text-red-500 shadow-xs lg:text-lg">
        <p>Error: {error.message}</p>
      </div>
    );

  const filteredFixtures = AllFixtures?.filter(
    (fixture: FixtureProps) => fixture.status === "FINISHED",
  ).sort(
    (a: FixtureProps, b: FixtureProps) =>
      new Date(b.utc_date).getTime() - new Date(a.utc_date).getTime(),
  );
  const previousMatch = filteredFixtures && filteredFixtures[0];

  const homeTeam = teams?.find(
    (team) => team.id === previousMatch?.home_team_id,
  );
  const awayTeam = teams?.find(
    (team) => team.id === previousMatch?.away_team_id,
  );

  console.log(previousMatchData?.data);

  if (!previousMatchData?.data) return null;

  const { goals, score, events, league, fixture, statisticsSummary } =
    previousMatchData?.data;

  //const MatchData = Match?.data;

  //const filteredEvents = MatchData?.events.filter(
  //  (event) => event.type === "Card" || event.type === "Goal",
  //);

  return (
    <div className="item-five no-scrollbar space-y-2 overflow-y-scroll rounded-lg bg-white p-3 shadow-xs">
      <div className="flex justify-between text-xs text-gray-600 sm:text-sm">
        <h2 className="px-4 pt-4">Last Match</h2>
        <p className="px-4 pt-4">EPL</p>
      </div>
      <div className="flex justify-between px-4">
        <div>
          <div>
            <Image
              className="w-10"
              width={40}
              height={40}
              src={homeTeam?.crest ?? "/placeholder_1.png"}
              alt="home team crest"
            />
            <span>{homeTeam?.short_name}</span>
          </div>
        </div>
        <div>
          <span>{previousMatch?.home_score}</span>
          <span>-</span>
          <span>{previousMatch?.away_score}</span>
        </div>
        <div>
          <div className="flex flex-col items-end">
            <Image
              className="w-10"
              width={40}
              height={40}
              alt="away team crest"
              src={awayTeam?.crest ?? "/placeholder_2.png"}
            />
            <span>{awayTeam?.short_name}</span>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="flex justify-between">
          <span>
            {previousMatchData?.data.statisticsSummary[0].ballPossession}
          </span>
          <span>Possession</span>
          <span>
            {previousMatchData?.data.statisticsSummary[1].ballPossession}
          </span>
        </div>
        <Progress
          className="my-4"
          value={parseInt(statisticsSummary[0].ballPossession)}
        />
        <div className="relative w-full space-y-4">
          {events.map((event, index: number) => (
            <div key={index + 1} className="relative grid">
              <span className="absolute left-1/2 -translate-x-1/2">
                {event.detail === "Yellow Card"
                  ? "🟨"
                  : event.detail === "Red Card"
                    ? "🟥"
                    : event.type === "subst"
                      ? "↕️"
                      : "⚽"}
              </span>
              <span
                className={clsx({
                  "justify-self-start": homeTeam?.id === event.team.id * 2,
                  "justify-self-end": awayTeam?.id !== event.team.id * 2,
                })}
              >
                <span className="text-xs">
                  {event.player.name.includes(" ")
                    ? event.player.name.split(" ").slice(1).join(" ")
                    : event.player.name}
                </span>
                <span className="ml-1 text-xs">{event.time.elapsed}'</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviousMatch;
