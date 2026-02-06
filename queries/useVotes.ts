import { useQuery } from "@tanstack/react-query";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";
import type { VoteProps } from "@/lib/types";

export function useVotes({matchId, userId} : {matchId: number, userId: string}) {
    const supabase = getSupabaseBrowerClient()
  return useQuery({
    queryKey: ["players"],
    queryFn: async (): Promise<VoteProps[]> => {
        const { data, error } = await supabase
        .from("votes")
        .select("player_id, position_number")
        .eq("match_id", matchId)
        .eq("user_id", userId);

      if (error) {
        toast.error(error?.message ?? "Error fetching votes.");
        throw error;
      }

      return data;
    },
  });
}
