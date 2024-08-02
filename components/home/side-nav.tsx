"use client"

import { useLayoutEffect, useRef } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"
import { BsXDiamond, BsCalendar3 } from "react-icons/bs"
import { LuUsers, LuTrophy } from "react-icons/lu"
import Link from "next/link"
import clsx from "clsx"
import gsap from "gsap"

type navType = {
  name: string
  href: string
  icon: React.ElementType
}

type sideNavPropTypes = {
  isOpen: boolean
}

const navLinks: navType[] = [
  {
    name: "Overview",
    href: "#",
    icon: BsXDiamond,
  },
  {
    name: "Matches",
    href: "#",
    icon: BsCalendar3,
  },
  {
    name: "Squad",
    href: "#",
    icon: LuUsers,
  },
  {
    name: "Standings",
    href: "#",
    icon: LuTrophy,
  },
]
const SideNav = ({ isOpen }: sideNavPropTypes) => {
  const isMobile = useIsMobile()
  const sideNavRef = useRef<HTMLDivElement>(null)
  const sideTimelineRef = useRef<gsap.core.Timeline | null>(null)
  useLayoutEffect(() => {
    if (!isMobile) return
    !sideTimelineRef.current
      ? (sideTimelineRef.current = gsap.timeline({ paused: true }))
      : null

    let ctx = gsap.context(() => {})

    // Configure the timeline
    ctx.add(() => {
      !sideTimelineRef.current
        ? (sideTimelineRef.current = gsap.timeline({ paused: true }))
        : null

      sideTimelineRef.current.fromTo(
        sideNavRef.current,
        { x: "-100%" },
        {
          x: "0%",
          duration: 0.75,
          ease: "power3.inOut",
        }
      )
    })

    isOpen ? sideTimelineRef.current.play() : sideTimelineRef.current.reverse()

    return () => {
      ctx.revert()
    }
  }, [isOpen])

  return (
    <nav
      ref={sideNavRef}
      className="bg-white rounded-lg w-[20%] z-10 h-full absolute md:relative"
    >
      {navLinks.map((link, index) => (
        <Link key={index} className="flex gap-3" href={link}>
          <link.icon className={clsx("", {})} />
          {link.name}
        </Link>
      ))}
    </nav>
  )
}

export default SideNav
