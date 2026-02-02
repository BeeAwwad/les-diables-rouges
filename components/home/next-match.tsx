"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { abrilFatface } from "@/fonts/fonts";
import { useFixtures } from "@/queries/useFixtures";
import { useCompetitions } from "@/queries/useCompetions";
import { useTeams } from "@/queries/useTeams";
import { useEffect, useState } from "react";

const NextMatch = () => {
  const { data: matches, isLoading, isError } = useFixtures();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);
  console.log({ now });

  const nextMatch = now
    ? matches?.find((match) => new Date(match.utc_date) > now)
    : null;

  console.log({ matches });
  const { data: competitions } = useCompetitions();
  const competition = competitions?.find(
    (competition) => competition.id === nextMatch?.competition_id,
  );

  const { data: teams } = useTeams();
  const homeTeam = teams?.find((team) => team.id === nextMatch?.home_team_id);
  const awayTeam = teams?.find((team) => team.id === nextMatch?.away_team_id);

  if (isLoading) return <Skeleton className="item-one shadow-xs" />;

  if (isError)
    return (
      <div className="item-one flex items-center justify-center rounded-md bg-red-100 p-4 text-center text-primary-300 shadow-xs lg:text-lg">
        <p>Failed to load next match</p>
      </div>
    );
  const date = new Date(nextMatch?.utc_date || new Date());

  const formattedDay = date?.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  const formattedHour = date?.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <div className="item-one flex w-full flex-col justify-center lg:justify-between rounded-sm overflow-y-scroll no-scrollbar bg-white p-3 shadow-xs 2xl:p-4">
      <div className="flex items-center justify-center gap-3.5 p-4 text-sm font-medium text-gray-600 sm:gap-4.5 lg:p-2">
        <h2 className="w-fit text-xs sm:text-sm">Upcoming Match</h2>
        <span className="flex w-fit text-center text-xs sm:text-sm">
          {formattedDay}
        </span>
        <span className="w-fit text-right text-xs sm:text-sm">
          {competition?.name}
        </span>
      </div>
      <div className="relative flex items-center justify-center gap-4 md:gap-10">
        <Image
          className="size-14 sm:size-20 lg:size-24 2xl:size-28"
          width={150}
          height={150}
          src={homeTeam?.crest ?? "/placeholder_1.png"}
          unoptimized={true}
          alt={`${homeTeam?.tla} crest`}
        />
        <div className="flex flex-col items-center gap-2 xl:gap-2">
          <p
            className={`${abrilFatface.className} z-10 text-xl font-semibold uppercase xl:text-2xl 2xl:text-3xl`}
          >
            {homeTeam?.short_name}
          </p>
          <p
            className={`${abrilFatface.className} z-10 order-2 text-xl font-semibold uppercase md:order-1 xl:text-2xl 2xl:text-3xl`}
          >
            {awayTeam?.short_name}
          </p>
        </div>
        <Image
          className="order-1 size-14 sm:size-20 md:order-2 lg:size-24 2xl:size-28"
          width={150}
          height={150}
          src={awayTeam?.crest ?? "/placeholder_2.png"}
          unoptimized={true}
          alt={`${awayTeam?.tla} crest`}
        />
        <p className="bg-primary-300 text-primary-100 absolute top-1/2 left-1/2 z-0 flex size-7 -translate-x-1/2 -translate-y-1/2 -rotate-12 items-center justify-center text-xs font-semibold uppercase">
          VS
        </p>
      </div>
      <time className="text-center text-xs font-medium text-gray-600 sm:text-sm">
        {formattedHour}
      </time>
    </div>
  );
};

export default NextMatch;
