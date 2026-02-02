"use client";

import { useMutation } from "@tanstack/react-query";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";

export function useOauthSignIn() {
  const supabase = getSupabaseBrowerClient();
  return useMutation({
    mutationFn: async ({ provider }: { provider: "google" | "github" }) => {
      const auth_callback_url = `${window.location.origin}/predict-eleven`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: auth_callback_url,
        },
      });
      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      toast.success("Sign-in successful!");
    },
    onError: (error, _variables) => {
      toast.error(
        error.message ?? `Failed to sign-in w/${_variables.provider}`,
      );
    },
  });
}
