import NextMatch from "@/components/home-page/overview/next-match";

import { OverviewTable } from "@/components/home-page/overview/overview-table";
import dynamic from "next/dynamic";
import PlayedStats from "@/components/home-page/overview/played-stats";
import { SquadCarousel } from "@/components/home-page/overview/squad-carousel";
import PreviousMatch from "@/components/home-page/overview/previous-match";
import CurrentForm from "@/components/home-page/overview/current-form";

const Chat = dynamic(() => import("../components/home-page/overview/chat"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <div className="grid-container grid h-fit w-full gap-4 p-2 sm:overflow-y-auto lg:h-[calc(80vh-3.5rem)]">
      <NextMatch />
      <SquadCarousel />
      <Chat />
      {/* <CurrentForm /> */}
      <PlayedStats />
      <PreviousMatch />
      <OverviewTable />
    </div>
  );
}
