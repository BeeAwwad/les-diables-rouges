"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import Link from "next/link";
import clsx from "clsx";
import gsap from "gsap";
import { Icon } from "@iconify/react/dist/iconify.js";

type navType = {
  name: string;
  href: string;
  icon?: JSX.Element;
};

const navLinks: navType[] = [
  {
    name: "Overview",
    href: "#",
    icon: <Icon className="size-8 text-white" icon="ph:diamonds-four" />,
  },
  {
    name: "Matches",
    href: "#",
    icon: (
      <Icon className="size-8 text-white" icon="fluent:calendar-32-regular" />
    ),
  },
  {
    name: "Squad",
    href: "#",
    icon: (
      <Icon
        className="size-8 text-white"
        icon="fluent:people-team-24-regular"
      />
    ),
  },
  {
    name: "Standings",
    href: "#",
    icon: (
      <Icon
        className="size-8 text-white"
        icon="fluent-mdl2:trophy-2"
        width={""}
        height={""}
      />
    ),
  },
];

const SideNav = () => {
  const [opened, setOpened] = useState(false);

  const handleNavClick = () => {
    setOpened((prev) => {
      return !prev;
    });
  };

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
          duration: 0.75,
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
      className="h-[calc((100vh-20vh) - 3.5rem)] absolute z-10 w-[240px] bg-red-400 sm:relative sm:w-[10%] md:w-[15%]"
    >
      <nav className="relative h-full">
        {/* toggle icon */}
        <div
          onClick={handleNavClick}
          className={clsx(
            `tham tham-e-arrow tham-w-6 absolute left-full bg-blue-300 px-10 py-7 hover:opacity-100 sm:hidden`,
            {
              "tham-active": opened,
            },
          )}
        >
          <div className="tham-box mr-5">
            <div className="tham-inner bg-white" />
          </div>
        </div>

        <ul className="bg-green-300 py-2">
          {navLinks.map((link, index) => (
            <li key={index} className="cursor-pointer px-4 py-2">
              <Link
                className="flex items-center sm:justify-center lg:justify-start"
                href={link}
              >
                {link.icon}
                <span className="px-2 py-1 sm:hidden lg:block">
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