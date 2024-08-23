import Header from "@/components/home-page/header";
import SideOverview from "@/components/home-page/overview/side/side-overview";
import MiddleOverview from "@/components/home-page/overview/middle/middle-overview";
import Overlay from "@/components/home-page/overlay";
import SideNav from "@/components/home-page/side-nav";

export default function Home() {
  return (
    <>
      <Overlay />
      <Header />
      <main className="sm:grid-cols-base-sm md:grid-cols-base-md relative grid h-[80vh] grid-cols-1 gap-7">
        <SideNav />
        <div className="flex flex-col gap-7 lg:flex-row">
          <MiddleOverview />
          <SideOverview />
        </div>
      </main>
    </>
  );
}
