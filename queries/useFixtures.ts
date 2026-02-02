import { useQuery } from "@tanstack/react-query";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";
import type { FixtureProps } from "@/lib/types";

export function useFixtures() {
    const supabase = getSupabaseBrowerClient()
  return useQuery({
    queryKey: ["fixtures"],
    queryFn: async (): Promise<FixtureProps[]> => {
      const { data, error } = await supabase
        .from("matches")
        .select("*");
      
        if (error) {
        toast.error(error?.message ?? "Error fetching fixtures.");
        throw error;
      }

      return data;
    },
  });
}
