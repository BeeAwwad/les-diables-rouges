"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import { abrilFatface } from "@/fonts/fonts";

const NEXT_GAME = gql`
  query Query($id: ID!) {
    getNextFixture(id: $id) {
      competition {
        name
      }
      homeTeam {
        shortName
        crest
      }
      awayTeam {
        shortName
        crest
      }
      season {
        currentMatchday
      }
      utcDate
    }
  }
`;

const NextMatch = () => {
  const { loading, error, data } = useQuery(NEXT_GAME, {
    variables: { id: "66" },
  });

  if (loading) return <Skeleton className="item-one shadow-xs" />;
  if (error)
    return (
      <div className="item-one flex items-center justify-center bg-white shadow-xs">
        <p>Error: {error.message}</p>
      </div>
    );

  const { competition, homeTeam, awayTeam, utcDate } = data.getNextFixture;

  const date = new Date(utcDate);

  const formattedDay = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  const formattedHour = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <div className="item-one flex w-full flex-col justify-center gap-4 rounded-lg bg-white p-3 shadow-xs sm:gap-2 2xl:gap-5 2xl:p-4">
      <div className="flex items-center justify-center gap-4.5 p-4 text-sm font-medium text-gray-600 lg:p-2">
        <h2 className="w-fit text-xs sm:text-sm">Upcoming Match</h2>
        <span className="flex w-fit text-center text-xs sm:text-sm">
          {formattedDay}
        </span>
        <span className="w-fit text-right text-xs sm:text-sm">
          {competition.name}
        </span>
      </div>
      <div className="relative flex items-center justify-center gap-6 md:gap-10">
        <Image
          className="size-14 sm:size-20 lg:size-24 2xl:size-28"
          width={150}
          height={150}
          src={homeTeam.crest}
          unoptimized={true}
          alt={`${homeTeam.shortName} crest`}
        />
        <div className="flex flex-col items-center gap-2 xl:gap-2">
          <p
            className={`${abrilFatface.className} z-10 text-2xl font-semibold uppercase xl:text-3xl 2xl:text-4xl`}
          >
            {homeTeam.shortName}
          </p>
          <p
            className={`${abrilFatface.className} z-10 order-2 text-2xl font-semibold uppercase md:order-1 xl:text-3xl 2xl:text-4xl`}
          >
            {awayTeam.shortName}
          </p>
        </div>
        <Image
          className="order-1 size-14 sm:size-20 md:order-2 lg:size-24 2xl:size-28"
          width={150}
          height={150}
          src={awayTeam.crest}
          unoptimized={true}
          alt={`${awayTeam.shortName} crest`}
        />
        <p className="bg-primary-300 text-primary-100 absolute top-1/2 left-1/2 -z-0 flex size-7 -translate-x-1/2 -translate-y-1/2 -rotate-12 items-center justify-center text-xs font-semibold uppercase">
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
