import { useQuery } from "@tanstack/react-query";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";
import type { CompetionProps } from "@/lib/types";

export function useCompetitions() {
    const supabase = getSupabaseBrowerClient()
  return useQuery({
    queryKey: ["competions"],
    queryFn: async (): Promise<CompetionProps[]> => {
      const { data, error } = await supabase
        .from("competitions")
        .select("*");

      if (error) {
        toast.error(error?.message ?? "Error fetching competitions.");
        throw error;
      }

      return data;
    },
  });
}
