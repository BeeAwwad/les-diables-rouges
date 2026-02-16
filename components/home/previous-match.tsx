"use client";

import { Progress } from "@/components/ui/progress";
import clsx from "clsx";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useMatchHistory } from "@/queries/useMatchHistory";
import { useFixtures } from "@/queries/useFixtures";
import { FixtureProps } from "@/lib/types";
import { useTeams } from "@/queries/useTeams";
import { abrilFatface } from "@/fonts/fonts";

const PreviousMatch = () => {
  const { data: previousMatchData, isError, isLoading } = useMatchHistory();
  const { data: AllFixtures } = useFixtures();
  const { data: teams } = useTeams();

  if (isLoading) return <Skeleton className="item-five rounded-md shadow-xs" />;

  if (isError)
    return (
      <div className="item-five flex items-center justify-center rounded-md bg-red-100 p-4 text-center text-primary-300 shadow-xs lg:text-lg">
        <p>Error loading previous match.</p>
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

  if (!previousMatchData?.[0]?.data) return null;

  const { events, statisticsSummary } = previousMatchData[0].data;

  //const MatchData = Match?.data;

  const filteredEvents = events.filter(
    (event) => event.type === "Card" || event.type === "Goal",
  );

  return (
    <div className="item-five no-scrollbar space-y-2 overflow-y-scroll rounded-md bg-white py-1.5 px-3 shadow-xs">
      <div className="flex justify-between text-xs text-gray-600 sm:text-sm">
        <h2 className="px-4 pt-4">Last Match</h2>
        <p className="px-4 pt-4">EPL</p>
      </div>
      <div className="flex justify-between px-4">
        <div>
          <div>
            <Image
              className="w-9"
              width={40}
              height={40}
              src={homeTeam?.crest ?? "/placeholder_1.png"}
              alt="home team crest"
            />
            <span className={`${abrilFatface.className}`}>
              {homeTeam?.short_name}
            </span>
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
              className="w-9"
              width={40}
              height={40}
              alt="away team crest"
              src={awayTeam?.crest ?? "/placeholder_2.png"}
            />
            <span className={`${abrilFatface.className}`}>
              {awayTeam?.short_name}
            </span>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="flex justify-between">
          <span>
            {previousMatchData[0]?.data.statisticsSummary[0].ballPossession}
          </span>
          <span>Possession</span>
          <span>
            {previousMatchData[0]?.data.statisticsSummary[1].ballPossession}
          </span>
        </div>
        <Progress
          className="my-4"
          value={parseInt(statisticsSummary[0].ballPossession)}
        />
        <div className="relative w-full space-y-4">
          {filteredEvents.map((event, index: number) => (
            <div key={index + 1} className="relative grid">
              <span className="absolute left-1/2 -translate-x-1/2">
                {event.detail === "Yellow Card" ? (
                  "🟨"
                ) : event.detail === "Red Card" ? (
                  "🟥"
                ) : event.type === "subst" ? (
                  "↕️"
                ) : (
                  <Image
                    className="size-5"
                    alt="goal"
                    src={"/football.svg"}
                    height={24}
                    width={24}
                  />
                )}
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
