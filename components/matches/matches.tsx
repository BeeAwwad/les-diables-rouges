"use client";

import { Button } from "@/components/ui/button";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { Fixture } from "@/app/api/graphql/types";
import clsx from "clsx";
import { abrilFatface } from "@/fonts/fonts";
import CustomButton from "../ui/custom-button";

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
  const [currentPage, setCurrentPage] = useState(1);
  const fixturesPerPage = 10; // Show 10 fixtures per page

  const { loading, error, data } = useQuery(ALL_MATCHES, {
    variables: { id: "66" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { matches } = data.getFixtures;

  // Filter fixtures based on the selected type
  const filteredFixtures = matches
    .filter((fixture: Fixture) =>
      showFinished
        ? fixture.status === "FINISHED"
        : fixture.status !== "FINISHED",
    )
    .sort((a: Fixture, b: Fixture) =>
      showFinished
        ? new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime()
        : new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime(),
    );

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredFixtures.length / fixturesPerPage);

  // Get the fixtures for the current page
  const paginatedFixtures = filteredFixtures.slice(
    (currentPage - 1) * fixturesPerPage,
    currentPage * fixturesPerPage,
  );

  // Generate page numbers array
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  // Handle pagination button click
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="no-scrollbar overflow-y-scroll">
      <div className="pl-2 sm:pl-0">
        <h2
          className={`text-primary-300 mb-4 text-3xl font-semibold md:text-5xl ${abrilFatface.className}`}
        >
          {showFinished ? "Results" : "Fixtures"}
        </h2>
        <ul className="flex gap-4">
          <li>
            <CustomButton
              onClick={() => {
                setShowFished(false);
                setCurrentPage(1);
              }}
            >
              Matches
            </CustomButton>
          </li>
          <li>
            <CustomButton
              onClick={() => {
                setShowFished(true);
                setCurrentPage(1);
              }}
            >
              Results
            </CustomButton>
          </li>
        </ul>
      </div>
      <div>
        <ul className="mt-5">
          {paginatedFixtures.map((fixture: Fixture, index: number) => (
            <li
              key={index}
              className={clsx("min-w-full p-4", {
                "bg-white": index % 2 === 0,
                "bg-primary-100": index % 2 !== 0,
              })}
            >
              <span className="mx-auto grid w-fit grid-cols-[minmax(0,105px)_minmax(0,95px)_minmax(0,105px)] grid-rows-[minmax(0,1fr)_30px] gap-4 text-xs sm:grid-cols-[minmax(0,135px)_minmax(0,95px)_minmax(0,135px)] lg:grid-cols-[minmax(0,155px)_minmax(0,105px)_minmax(0,155px)] lg:text-sm">
                <span className="text-gray-600">
                  {new Date(fixture.utcDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
                <span className="text-center text-gray-600">
                  {fixture.competition.name}
                </span>
                <span className="row-start-2 text-right font-medium uppercase sm:text-base lg:text-lg">
                  {fixture.homeTeam.shortName}
                </span>
                <span className="col-start-2 row-start-2 text-center font-medium sm:text-base">
                  {fixture.status === "FINISHED" ? (
                    <span>
                      {" "}
                      {fixture.score.fullTime.home} -{" "}
                      {fixture.score.fullTime.away}{" "}
                    </span>
                  ) : (
                    <span>
                      {" "}
                      {new Date(fixture.utcDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                    </span>
                  )}
                </span>
                <span className="row-start-2 text-left font-medium uppercase sm:text-base lg:text-lg">
                  {fixture.awayTeam.shortName}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="my-4 flex justify-center">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>

        {pageNumbers.map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            className={clsx("mx-1", {
              "bg-primary-300 text-white": page === currentPage,
              "bg-gray-200": page !== currentPage,
            })}
          >
            {page}
          </Button>
        ))}

        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Matches;
