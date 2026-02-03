"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import clsx from "clsx";
import { abrilFatface } from "@/fonts/fonts";
import CustomButton from "@/components/custom-ui/button";
import Loader from "@/components/custom-ui/loader";
import { useFixtures } from "@/queries/useFixtures";
import { FixtureProps } from "@/lib/types";
import { useCompetitions } from "@/queries/useCompetions";
import { useTeams } from "@/queries/useTeams";

const Matches = () => {
  const [showFinished, setShowFished] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const fixturesPerPage = 10;

  const { data: matches, isError, error, isLoading } = useFixtures();
  const { data: competitions } = useCompetitions();
  const { data: teams } = useTeams();

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  if (isError) return <p>Error: {error.message}</p>;

  const filteredFixtures = matches
    ?.filter((fixture: FixtureProps) =>
      showFinished
        ? fixture.status === "FINISHED"
        : fixture.status !== "FINISHED",
    )
    .sort((a: FixtureProps, b: FixtureProps) =>
      showFinished
        ? new Date(b.utc_date).getTime() - new Date(a.utc_date).getTime()
        : new Date(a.utc_date).getTime() - new Date(b.utc_date).getTime(),
    );

  const totalPages = filteredFixtures
    ? Math.ceil(filteredFixtures.length / fixturesPerPage)
    : 0;

  const paginatedFixtures = filteredFixtures
    ? filteredFixtures.slice(
        (currentPage - 1) * fixturesPerPage,
        currentPage * fixturesPerPage,
      )
    : [];

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-y-scroll">
      <div className="pl-2 sm:pl-0">
        <h2
          className={`text-primary mb-4 text-3xl font-semibold md:text-5xl ${abrilFatface.className}`}
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
              className={clsx(
                showFinished
                  ? ""
                  : "bg-primary-600 text-primary-400 hover:bg-primary-600 border-primary-400 hover:border-primary-400",
              )}
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
              className={clsx(
                showFinished
                  ? "bg-primary-600 text-primary-400 hover:bg-primary-600 border-primary-400 hover:border-primary-400"
                  : "",
              )}
            >
              Results
            </CustomButton>
          </li>
        </ul>
      </div>
      <div>
        <ul className="mt-5">
          {paginatedFixtures.map((fixture: FixtureProps, index: number) => {
            const competition = competitions?.find(
              (competition) => competition.id === fixture.competition_id,
            );
            const homeTeam = teams?.find(
              (team) => team.id === fixture.home_team_id,
            );

            const awayTeam = teams?.find(
              (team) => team.id === fixture.away_team_id,
            );
            return (
              <li
                key={index}
                className={clsx("min-w-full p-4", {
                  "bg-white": index % 2 === 0,
                  "bg-primary-100": index % 2 !== 0,
                })}
              >
                <span className="mx-auto grid w-fit grid-cols-[minmax(0,105px)_minmax(0,95px)_minmax(0,105px)] grid-rows-[minmax(0,1fr)_30px] gap-4 text-xs sm:grid-cols-[minmax(0,135px)_minmax(0,95px)_minmax(0,135px)] lg:grid-cols-[minmax(0,155px)_minmax(0,115px)_minmax(0,155px)] lg:text-sm">
                  <span className="text-gray-600">
                    {new Date(fixture.utc_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                  <span className="text-center text-gray-600">
                    {competition?.name}
                  </span>
                  <span className="row-start-2 text-right font-medium uppercase sm:text-base lg:text-lg">
                    {homeTeam?.short_name}
                  </span>
                  <span className="col-start-2 row-start-2 text-center font-medium sm:text-base">
                    {fixture.status === "FINISHED" ? (
                      <span>
                        {" "}
                        {fixture.home_score} - {fixture.away_score}{" "}
                      </span>
                    ) : (
                      <span>
                        {" "}
                        {new Date(fixture.utc_date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                      </span>
                    )}
                  </span>
                  <span className="row-start-2 text-left font-medium uppercase sm:text-base lg:text-lg">
                    {awayTeam?.short_name}
                  </span>
                </span>
              </li>
            );
          })}
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
