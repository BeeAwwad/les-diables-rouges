"use client";

import { abrilFatface } from "@/fonts/fonts";
import { useNav } from "./nav-context";
import { Slant as Hamburger } from "hamburger-react";
import { useEffect } from "react";

const Header = () => {
  const { opened, setOpened } = useNav();

  useEffect(() => {
    if (opened) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <header className="bg-primary fixed top-0 left-0 z-20 flex w-full items-center justify-between sm:relative sm:mb-9 sm:justify-center xl:h-[20vh]">
      <div
        className={`flex sm:flex ${abrilFatface.className} text-primary-100 w-fit gap-0.5 px-9 py-6 text-2xl font-bold antialiased sm:w-full sm:justify-between sm:text-6xl md:gap-2 md:py-7 md:text-7xl lg:py-9 lg:text-8xl xl:text-9xl`}
      >
        <span>
          L<span className="hidden sm:inline">e</span>
        </span>
        <span>
          D<span className="hidden sm:inline">iables</span>
        </span>
        <span>
          R<span className="hidden sm:inline">ouges</span>
        </span>
        <span>.</span>
      </div>
      {/* <div
        className={`${abrilFatface.className} text-primary-100 xl:text-9xl} w-fit gap-2 p-9 text-2xl font-bold antialiased sm:hidden`}
        onClick={() => setOpened(!opened)}
      >
        <span>burger</span>
      </div> */}
      <div className="px-9 sm:hidden">
        <Hamburger
          toggled={opened}
          onToggle={() => setOpened(!opened)}
          label="Show menu"
          hideOutline={false}
          color="#eef2f3"
        />
      </div>
    </header>
  );
};

export default Header;
