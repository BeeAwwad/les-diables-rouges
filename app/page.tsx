import NextMatch from "@/components/home/next-match";
import { OverviewTable } from "@/components/home/overview-table";
import PlayedStats from "@/components/home/played-stats";
import { SquadCarousel } from "@/components/home/squad-carousel";
// import PreviousMatch from "@/components/home/overview/previous-match";
// import MostVotedXI from "@/components/home/overview/most-voted-xi";

export default function Home() {
  return (
    <main className="grid-container scrollbar-none no-scrollbar grid w-full gap-4 overflow-y-scroll px-2 pb-2 lg:h-[calc(80vh-3.5rem)]">
      <NextMatch />
      <SquadCarousel />
      {/* 
      <MostVotedXI />
      <PreviousMatch />
       */}

      <PlayedStats />
      <OverviewTable />
      <h1>Home Page</h1>
    </main>
  );
}
