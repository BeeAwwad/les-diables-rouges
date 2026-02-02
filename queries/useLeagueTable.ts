import { useQuery } from "@tanstack/react-query";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";
import type { LeagueTableProps } from "@/lib/types";

export function useLeagueTable() {
    const supabase = getSupabaseBrowerClient()
  return useQuery({
    queryKey: ["pl-table"],
    queryFn: async (): Promise<LeagueTableProps[]> => {
      const { data, error } = await supabase
        .from("pl_standings")
        .select("*");
      
        if (error) {
        toast.error(error?.message ?? "Error fetching pl table.");
        throw error;
      }

      return data;
    },
  });
}
