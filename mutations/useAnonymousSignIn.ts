"use client";

import { useMutation } from "@tanstack/react-query";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";

export function useAnonymousSignIn() {
  const supabase = getSupabaseBrowerClient();
  return useMutation({
    mutationFn: async () => {
           const { data, error } = await supabase.auth.signInAnonymously()
      
      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      toast.success("Anonymous sign-in successful.");
    },
    onError: (error, _variables) => {
      toast.error(
        error.message ?? "Failed to sign-in anonymously",
      );
    },
  });
}
