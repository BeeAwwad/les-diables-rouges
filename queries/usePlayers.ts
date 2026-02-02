import { useQuery } from "@tanstack/react-query";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";
import type { PlayerProps } from "@/lib/types";

export function usePlayers() {
    const supabase = getSupabaseBrowerClient()
  return useQuery({
    queryKey: ["players"],
    queryFn: async (): Promise<PlayerProps[]> => {
      const { data, error } = await supabase
        .from("players")
        .select("*");

      if (error) {
        toast.error(error?.message ?? "Error fetching players.");
        throw error;
      }

      return data;
    },
  });
}
