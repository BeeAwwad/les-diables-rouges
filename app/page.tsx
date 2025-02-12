import NextMatch from "@/components/home/overview/next-match";

import { OverviewTable } from "@/components/home/overview/overview-table";
import PlayedStats from "@/components/home/overview/played-stats";
import { SquadCarousel } from "@/components/home/overview/squad-carousel";
import PreviousMatch from "@/components/home/overview/previous-match";
import CurrentForm from "@/components/home/overview/current-form";

export default function Home() {
  return (
    <main className="grid-container grid w-full gap-4 overflow-y-scroll px-2 pb-2 scrollbar-none lg:h-[calc(80vh-3.5rem)]">
      <NextMatch />
      <SquadCarousel />
      {/* <CurrentForm /> */}
      <PlayedStats />
      <PreviousMatch />
      <OverviewTable />
    </main>
  );
}
