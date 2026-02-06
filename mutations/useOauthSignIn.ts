"use client";

import { useMutation } from "@tanstack/react-query";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";

export function useOauthSignIn() {
  const supabase = getSupabaseBrowerClient();
  return useMutation({
    mutationFn: async ( { provider } : {provider: "google" | "github"}) => {
const auth_callback_url = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/predict-eleven`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: auth_callback_url,
          skipBrowserRedirect: false,
        },
      });
      if (error) throw error;

      return data;
    },
    onSuccess: (_variables) => {
      toast.success(`Redirecting to provider - ${_variables.provider}`);
    },
    onError: (error, _variables) => {
      toast.error(
        error.message ?? `Failed to redirect to provider - ${_variables.provider}`,
      );
    },
  });
}
