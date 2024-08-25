"use client";

import { Button } from "@/components/ui/button";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { Fixture } from "@/types";
import clsx from "clsx";

const ALL_MATCHES = gql`
  query Query($id: ID!) {
    getFixtures(id: $id) {
      matches {
        homeTeam {
          shortName
          crest
        }
        awayTeam {
          shortName
          crest
        }
        score {
          fullTime {
            home
            away
          }
        }
        status
        utcDate
        competition {
          name
          emblem
        }
      }
    }
  }
`;

const Matches = () => {
  const [showFinished, setShowFished] = useState(false);
  const { loading, error, data } = useQuery(ALL_MATCHES, {
    variables: { id: "66" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { matches } = data.getFixtures;
  console.log("🚀 ~ Matches ~ matches:", matches);

  const filteredFixtures = matches.filter((fixture: Fixture) =>
    showFinished
      ? fixture.status === "FINISHED"
      : fixture.status !== "FINISHED",
  );
  console.log("🚀 ~ Matches ~ filteredFixtures:", filteredFixtures);
  return (
    <div>
      <div>
        <h2>{showFinished ? "Results" : "Fixtures"}</h2>
        <ul className="flex">
          <li>
            <Button onClick={() => setShowFished(false)}>Matches</Button>
          </li>
          <li>
            <Button onClick={() => setShowFished(true)}>Results</Button>
          </li>
        </ul>
      </div>
      <div>
        <ul className="mt-5">
          {filteredFixtures.map((fixture: Fixture, index: number) => (
            <li
              key={index}
              className={clsx({
                "bg-[#fff]": index % 2 === 0,
                "bg-[#eef2f3]": index % 2 !== 0,
              })}
            >
              <span>{fixture.homeTeam.shortName}</span>
              <span>
                {fixture.status === "FINISHED" ? (
                  <span>
                    {" "}
                    {fixture.score.fullTime.home} -{" "}
                    {fixture.score.fullTime.away}{" "}
                  </span>
                ) : (
                  " V "
                )}
              </span>
              <span>{fixture.awayTeam.shortName}</span>
              <span> {fixture.competition.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Matches;
