"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type NavContextType = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [opened, setOpened] = useState(false);

  return (
    <NavContext.Provider value={{ opened, setOpened }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
};
