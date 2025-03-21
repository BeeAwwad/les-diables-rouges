"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";

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
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedHour = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <div className="item-one flex w-full flex-col justify-center rounded-lg bg-white p-3 shadow-xs">
      <div className="flex items-center justify-between p-4 text-sm md:text-base">
        <h2 className="w-fit">Upcoming Match</h2>
        <span className="flex w-fit space-x-3 text-center">{formattedDay}</span>
        <span className="w-fit text-right">{competition.name}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex flex-col items-center gap-4 md:flex-row">
          <span>
            <Image
              className="size-28 sm:size-32 md:size-28 lg:size-24 xl:size-28 2xl:size-40"
              width={150}
              height={150}
              src={homeTeam.crest}
              alt={`${homeTeam.shortName} crest`}
            />
          </span>
          <p className="lg:text-lg">{homeTeam.shortName}</p>
        </span>
        <time className="text-sm md:text-base">
          <p>{formattedHour}</p>
        </time>
        <span className="flex flex-col items-center gap-4 md:flex-row">
          <p className="order-2 md:order-1 lg:text-lg">{awayTeam.shortName}</p>
          <span className="order-1 md:order-2">
            <Image
              className="size-28 sm:size-32 md:size-28 lg:size-24 xl:size-28 2xl:size-40"
              width={150}
              height={150}
              src={awayTeam.crest}
              alt={`${awayTeam.shortName} crest`}
            />
          </span>
        </span>
      </div>
    </div>
  );
};

export default NextMatch;
