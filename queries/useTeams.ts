import { useQuery } from "@tanstack/react-query";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";
import type { TeamProps } from "@/lib/types";

export function useTeams() {
    const supabase = getSupabaseBrowerClient()
  return useQuery({
    queryKey: ["teams"],
    queryFn: async (): Promise<TeamProps[]> => {
      const { data, error } = await supabase
        .from("teams")
        .select("*");

      if (error) {
        toast.error(error?.message ?? "Error fetching teams.");
        throw error;
      }

      return data;
    },
  });
}
