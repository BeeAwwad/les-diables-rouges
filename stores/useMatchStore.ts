import { create } from "zustand";
import { FixtureProps } from "@/lib/types";

type MatchStore = {
  now: number;
  fixtures: FixtureProps[];
  nextMatch: FixtureProps | null;
  
  setFixtures: (fixtures: FixtureProps[]) => void;
  refreshNow: () => void;
};

export const useMatchStore = create<MatchStore>((set, get) => ({
  now: Date.now(),
  fixtures: [],
  nextMatch: null,

  setFixtures: (fixtures) => {
    const now = Date.now();
    const nextMatch = fixtures.find((f) => new Date(f.utc_date).getTime() > now) ?? null;
    set({ fixtures, nextMatch, now });
  },

  refreshNow: () => {
    const now = Date.now();
    const { fixtures } = get();
    const nextMatch = fixtures.find((f) => new Date(f.utc_date).getTime() > now) ?? null;
    set({ now, nextMatch });
  },
}));