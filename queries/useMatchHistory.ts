import { useQuery } from "@tanstack/react-query";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";
import type { MatchHistoryProps } from "@/lib/types";

export function useMatchHistory() {
    const supabase = getSupabaseBrowerClient()
  return useQuery({
    queryKey: ["match-history"],
    queryFn: async (): Promise<MatchHistoryProps[]> => {
      const { data, error } = await supabase
        .from("match_history")
        .select("*")
        .order("match_date", { ascending: false});
      
        if (error) {
        toast.error(error?.message ?? "Error fetching recent match history.");
        throw error;
      }

      return data;
    },
  });
}
