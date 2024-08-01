import Header from "@/components/home/header"
import LastGame from "@/components/home/last-game"
import NextMatch from "@/components/home/next-match"
import Overlay from "@/components/home/overlay"
import SideNav from "@/components/home/side-nav"

export default function Home() {
  return (
    <>
      <Overlay />
      <Header />
      <main className="flex gap-5 bg-[#eef2f3] h-[80vh] p-5">
        <SideNav />
        <NextMatch />
        <LastGame />
      </main>
    </>
  )
}
