"use client";

import { useNav } from "./nav-context";

const NavOverlay = () => {
  const { opened } = useNav(); // Get navbar state

  return (
    <div
      className={`fixed inset-0 z-10 bg-black transition-opacity duration-300 ${
        opened ? "opacity-50 backdrop-blur-sm" : "pointer-events-none opacity-0"
      }`}
    />
  );
};

export default NavOverlay;
