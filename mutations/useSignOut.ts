"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = getSupabaseBrowerClient();
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success("Signed out successfully!");
      router.push("/login");
    },
    onError: (error) => {
      toast.success(error.message ?? "Failed to sign out");
    },
  });
}
