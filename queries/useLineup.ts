
import { useQuery } from "@tanstack/react-query";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";
import type { LineupProps } from "@/lib/types";

export function useLineup() {
  const supabase = getSupabaseBrowerClient()

  return useQuery({
    queryKey: ["lineup"],
    queryFn: async (): Promise<LineupProps> => {
      const { data, error } = await supabase
        .from("match_lineups")
        .select("*")
        .single();
      
        if (error) {
        toast.error(error?.message ?? "Error fetching lineup.");
        throw error;
      }
      return data;
    },
  });
}
