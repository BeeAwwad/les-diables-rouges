"use client"

import { useState } from "react"

import Header from "@/components/home/header"
import LastGame from "@/components/home/last-game"
import NextMatch from "@/components/home/next-match"
import Overlay from "@/components/home/overlay"
import SideNav from "@/components/home/side-nav"

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Overlay />
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="relative flex h-[80vh]">
        <SideNav isOpen={isOpen} />
        <div className="flex md:flex-row flex-col gap-7 w-full">
          <NextMatch />
          <LastGame />
        </div>
      </main>
    </>
  )
}
