"use client";

import { useLayoutEffect, useRef, useState, type JSX } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import Link from "next/link";
import gsap from "gsap";
import { useNav } from "@/context/nav-context";
import {
  Calendar,
  ShieldHalf,
  Trophy,
  LayoutDashboard,
  Newspaper,
} from "lucide-react";

type navType = {
  name: string;
  href: string;
  icon?: JSX.Element;
};

const navLinks: navType[] = [
  {
    name: "Overview",
    href: "/",
    icon: (
      <LayoutDashboard className="size-6 text-primary-100 group-hover:text-primary-400 group-active:text-primary-400" />
    ),
  },
  {
    name: "Matches",
    href: "/matches",
    icon: (
      <Calendar className="size-6 text-primary-100 group-hover:text-primary-400 group-active:text-primary-400" />
    ),
  },
  {
    name: "Squad",
    href: "/squad",
    icon: (
      <ShieldHalf className="size-6 text-primary-100 group-hover:text-primary-400 group-active:text-primary-400" />
    ),
  },
  {
    name: "Standings",
    href: "/standings",
    icon: (
      <Trophy className="size-6 text-primary-100 group-hover:text-primary-400 group-active:text-primary-400" />
    ),
  },
  {
    name: "Starting XI",
    href: "/starting-eleven",
    icon: (
      <Newspaper className="size-6 text-primary-100 group-hover:text-primary-400 group-active:text-primary-400" />
    ),
  },
];

const SideNav = () => {
  const { opened, setOpened } = useNav();

  const isMobile = useIsMobile();
  const sideNavRef = useRef<HTMLDivElement>(null);
  const sideTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    let context = gsap.context(() => {
      isMobile
        ? gsap.set(sideNavRef.current, { x: "-100%" })
        : gsap.set(sideNavRef.current, { x: "0%" });
    });

    return () => {
      context.revert();
    };
  }, [isMobile]);

  useLayoutEffect(() => {
    if (!isMobile) return;
    !sideTimelineRef.current
      ? (sideTimelineRef.current = gsap.timeline({ paused: true }))
      : null;

    let ctx = gsap.context(() => {});

    // Open the sidebar
    ctx.add(() => {
      !sideTimelineRef.current
        ? (sideTimelineRef.current = gsap.timeline({ paused: true }))
        : null;

      sideTimelineRef.current.fromTo(
        sideNavRef.current,
        { x: "-100%" },
        {
          x: "0%",
          duration: 0.55,
          ease: "power3.inOut",
        },
      );
    });

    opened ? sideTimelineRef.current.play() : sideTimelineRef.current.reverse();

    return () => {
      ctx.revert();
    };
  }, [opened, isMobile]);
  return (
    <aside
      ref={sideNavRef}
      className="bg-primary-400 fixed top-20 z-20 h-full w-60 sm:relative sm:top-0 sm:w-full sm:rounded-tr-sm"
    >
      <nav className="relative z-10 h-full">
        <ul className="space-y-2 p-4">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="group active:bg-primary-100 hover:bg-primary-100 cursor-pointer rounded-sm p-2 transition-all hover:-translate-y-px active:translate-y-0.5 active:brightness-90"
            >
              <Link
                className="flex items-center sm:justify-center lg:justify-start"
                href={link.href}
                onClick={() => setOpened(false)}
              >
                {link.icon}
                <span className="px-2 py-1 text-primary-100 group-hover:text-primary-400 group-active:text-primary-400 sm:hidden lg:block lg:text-[0.85rem] xl:text-base font-medium">
                  {link.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;
