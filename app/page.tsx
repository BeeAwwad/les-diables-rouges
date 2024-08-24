import Header from "@/components/home-page/header";
import Overlay from "@/components/home-page/overlay";
import SideNav from "@/components/home-page/side-nav";
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
    <>
      <Overlay />
      <Header />
      <main className="relative grid h-[calc(80vh-3.5rem)] grid-cols-1 gap-7 sm:grid-cols-base-sm md:grid-cols-base-md">
        <SideNav />
        <div className="grid h-[calc(80vh-3.5rem)] w-full grid-cols-4 grid-rows-2 gap-4 rounded-lg p-2 shadow-md">
          <NextMatch />
          <SquadCarousel />
          <Chat />
          <PlayedStats />
          <PreviousMatch />
          <OverviewTable />
        </div>
      </main>
    </>
  );
}
