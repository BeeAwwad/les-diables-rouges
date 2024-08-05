import Header from "@/components/app-components/header";
import SideOverview from "@/components/app-components/overview/side-overview";
import MiddleOverview from "@/components/app-components/overview/middle-overview";
import Overlay from "@/components/app-components/overlay";
import SideNav from "@/components/app-components/side-nav";

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
