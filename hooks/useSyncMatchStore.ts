import { useEffect } from "react";
import { useFixtures } from "@/queries/useFixtures";
import { useMatchStore } from "@/stores/useMatchStore";

export function useSyncMatchStore() {
  const { data: fixtures } = useFixtures();
    const state = useMatchStore();
  const setFixtures = useMatchStore((state) => state.setFixtures);

  useEffect(() => {
    if (fixtures) {
      setFixtures(fixtures);
    }
  }, [fixtures, setFixtures]);
}