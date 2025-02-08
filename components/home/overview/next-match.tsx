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

  if (loading) return <Skeleton className="item-one" />;
  if (error)
    return (
      <div className="item-one flex items-center justify-center bg-white">
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
    <div className="item-one rounded-lg bg-white p-3 shadow-md">
      <div className="flex justify-between">
        <h2>Upcoming Match</h2>
        <span className="flex space-x-3">
          <span>
            <p>{formattedDay}</p>
          </span>
          <span>
            <p>{competition.name}</p>
          </span>
        </span>
      </div>
      <div className="flex justify-between">
        <span className="flex flex-col items-center md:flex-row">
          <span>
            <Image
              className="size-28 sm:size-32 md:size-28 lg:size-24 xl:size-28 2xl:size-40"
              width={150}
              height={150}
              src={homeTeam.crest}
              alt={`${homeTeam.shortName} crest`}
            />
          </span>
          <span>
            <p>{homeTeam.shortName}</p>
          </span>
        </span>
        <time>
          <p>{formattedHour}</p>
        </time>
        <span className="flex flex-col items-center md:flex-row">
          <span className="order-2 md:order-1">
            <p>{awayTeam.shortName}</p>
          </span>
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
