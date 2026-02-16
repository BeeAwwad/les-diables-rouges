import { create } from "zustand";
import { FixtureProps } from "@/lib/types";

type MatchStore = {
  now: number;
  fixtures: FixtureProps[];
  nextMatch: FixtureProps | null;
  previousMatch: FixtureProps | null;

  setFixtures: (fixtures: FixtureProps[]) => void;
  refreshNow: () => void;
};

export const useMatchStore = create<MatchStore>((set, get) => ({
  now: Date.now(),
  fixtures: [],
  nextMatch: null,
  previousMatch: null,

  setFixtures: (fixtures) => {
    const now = Date.now();
    const nextMatch = fixtures.find((f) => new Date(f.utc_date).getTime() > now) ?? null;
    const previousMatches = fixtures.filter((f) => f.status === "FINISHED") ?? null;
    const orderedPreviousMatches = previousMatches.sort((a, b) => a.matchday - b.matchday)
    console.log({ orderedPreviousMatches })
    const previousMatch = orderedPreviousMatches[orderedPreviousMatches.length - 1] ?? null;

    set({ fixtures, nextMatch, now, previousMatch });
  },

  refreshNow: () => {
    const now = Date.now();
    const { fixtures } = get();
    const nextMatch = fixtures.find((f) => new Date(f.utc_date).getTime() > now) ?? null;
    set({ now, nextMatch });
  },
}));