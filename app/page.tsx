import NextMatch from "@/components/home/next-match";
import { OverviewTable } from "@/components/home/overview-table";
import PlayedStats from "@/components/home/played-stats";
import { SquadCarousel } from "@/components/home/squad-carousel";
import PreviousMatch from "@/components/home/previous-match";
import StartingXI from "@/components/home/starting-xi";
export default function Home() {
  return (
    <main className="grid-container scrollbar-none no-scrollbar grid w-full gap-4 overflow-y-scroll pr-2 pb-2 lg:h-[calc(80vh-3.5rem)]">
      <NextMatch />
      <SquadCarousel />
      <StartingXI />
      <PreviousMatch />
      <PlayedStats />
      <OverviewTable />
    </main>
  );
}
