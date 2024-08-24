"use client";

import { useQuery, gql } from "@apollo/client";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
    <div className="col-span-2 row-span-1 rounded-lg shadow-md">
      <div className="flex justify-between">
        <h2>Upcoming Match</h2>
        <span className="flex">
          <span>
            <p>{formattedDay}</p>
          </span>
          <span>|</span>
          <span>
            <p>{competition.name}</p>
          </span>
        </span>
      </div>
      <div className="flex justify-between">
        <span className="flex">
          <span>
            <p>{homeTeam.shortName}</p>
          </span>
          <span>
            <img src={homeTeam.crest} alt={`${homeTeam.shortName} crest`} />
          </span>
        </span>
        <time>
          <p>{formattedHour}</p>
        </time>
        <span className="flex">
          <span>
            <p>{awayTeam.shortName}</p>
          </span>
          <span>
            <img src={awayTeam.crest} alt={`${awayTeam.shortName} crest`} />
          </span>
        </span>
      </div>
    </div>
  );
};

export default NextMatch;
