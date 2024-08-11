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
      <main className="relative flex h-[80vh] gap-7">
        <SideNav />
        <div className="flex w-full flex-col gap-7 sm:w-[90%] md:w-[85%] lg:flex-row">
          <MiddleOverview />
          <SideOverview />
        </div>
      </main>
    </>
  );
}
