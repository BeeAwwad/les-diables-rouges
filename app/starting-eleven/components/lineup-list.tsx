"use client";

import { useLineup } from "@/queries/useLineup";
import { useSyncMatchStore } from "@/hooks/useSyncMatchStore";
import { abrilFatface } from "@/fonts/fonts";
import Loader from "@/components/custom-ui/loader";
import { Skeleton } from "@/components/ui/skeleton";

const LineupList = () => {
  const { data: lineup, isLoading, isError } = useLineup();
  useSyncMatchStore();

  if (isLoading)
    return (
      <div className="flex items-center justify-center md:w-[40%] relative">
        <Loader />
        <Skeleton className="h-full w-full absolute top-0 z-0" />
      </div>
    );

  if (isError || !lineup) {
    return (
      <div className="flex items-center justify-center md:w-[66%] md:max-h-[70vh] relative">
        <p className="text-primary-300">Error: </p>
      </div>
    );
  }
  return (
    <div className="md:w-[40%] order-2 md:order-1 py-4 md:py-0">
      <h2
        className={`text-primary mb-4 text-3xl font-semibold md:text-5xl ${abrilFatface.className} hidden md:block`}
      >
        Starting 11
      </h2>
      <ul className="grid grid-cols-1 gap-2.5 xl:grid-cols-2">
        {lineup.lineup_data.map((p) => (
          <li>
            <span className="inline-block w-8 h-6 text-center pb-5 bg-primary-300 border-b-primary-600 border-b-4 text-primary-100 mr-2">
              {p.player.number}
            </span>{" "}
            <span>{p.player.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LineupList;
