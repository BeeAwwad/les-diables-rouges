import NextMatch from "@/components/home-page/overview/next-match";

import { OverviewTable } from "@/components/home-page/overview/overview-table";
import dynamic from "next/dynamic";
import { PlayedStats } from "@/components/home-page/overview/played-stats";
import { SquadCarousel } from "@/components/home-page/overview/squad-carousel";
import PreviousMatch from "@/components/home-page/overview/previous-match";

const Chat = dynamic(() => import("../components/home-page/overview/chat"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <div className="grid h-[calc(80vh-3.5rem)] w-full grid-cols-4 grid-rows-2 gap-4 rounded-lg p-2 shadow-md sm:overflow-y-auto">
      <NextMatch />
      <SquadCarousel />
      <Chat />
      <PlayedStats />
      <PreviousMatch />
      <OverviewTable />
    </div>
  );
}
