import { useQuery } from "@tanstack/react-query";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";
import { PlayerXiProps } from "@/lib/types";
import { useMatchStore } from "@/stores/useMatchStore";

export function useStartingXI() {
  const nextMatch = useMatchStore((s) => s.nextMatch);

  const supabase = getSupabaseBrowerClient()
  return useQuery({
    queryKey: ["starting-xi"],
    enabled: !!nextMatch?.id,
    queryFn: async (): Promise<PlayerXiProps[]> => {
      const { data, error } = await supabase.rpc(
        "get_most_voted_starting_11",
        { match_id_input: nextMatch?.id }
      );

      if (error) {
        toast.error(error?.message ?? "Error fetching most voted players XI.");
        throw error;
      }

      return data;
    },
  });
}
