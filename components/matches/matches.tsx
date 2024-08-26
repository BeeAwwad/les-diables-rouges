"use client";

import { Button } from "@/components/ui/button";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { Fixture } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  const [currentPage, setCurrentPage] = useState(1);
  const fixturesPerPage = 10; // Show 10 fixtures per page

  const { loading, error, data } = useQuery(ALL_MATCHES, {
    variables: { id: "66" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { matches } = data.getFixtures;

  // Filter fixtures based on the selected type
  const filteredFixtures = matches.filter((fixture: Fixture) =>
    showFinished
      ? fixture.status === "FINISHED"
      : fixture.status !== "FINISHED",
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
    <div className="sm:overflow-y-auto">
      <div>
        <h2>{showFinished ? "Results" : "Fixtures"}</h2>
        <ul className="flex">
          <li>
            <Button
              onClick={() => {
                setShowFished(false);
                setCurrentPage(1);
              }}
            >
              Matches
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                setShowFished(true);
                setCurrentPage(1);
              }}
            >
              Results
            </Button>
          </li>
        </ul>
      </div>
      <div>
        <ul className="mt-5">
          {paginatedFixtures.map((fixture: Fixture, index: number) => (
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
      <div className="mt-4 flex justify-center">
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
              "bg-blue-500 text-white": page === currentPage,
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

      {/* <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          {pageNumbers.map((page) => (
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </div>
  );
};

export default Matches;
