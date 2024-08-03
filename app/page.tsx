import Header from "@/components/home/header";
import LastGame from "@/components/home/last-game";
import NextMatch from "@/components/home/next-match";
import Overlay from "@/components/home/overlay";
import SideNav from "@/components/home/side-nav";

export default function Home() {
  return (
    <>
      <Overlay />
      <Header />
      <main className="relative flex h-[80vh] gap-7">
        <SideNav />
        <div className="flex w-full flex-col gap-7 sm:w-[90%] md:w-[85%] lg:flex-row">
          <NextMatch />
          <LastGame />
        </div>
      </main>
    </>
  );
}
