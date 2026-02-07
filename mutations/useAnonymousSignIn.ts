import { useMutation } from "@tanstack/react-query";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export function useAnonymousSignIn() {
  const supabase = getSupabaseBrowerClient();
  const router = useRouter() 
  return useMutation({
    mutationFn: async () => {
           const { data, error } = await supabase.auth.signInAnonymously()
      
      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      toast.success("Anonymous sign-in successful.");
      router.push("/predict-eleven");
    },
    onError: (error, _variables) => {
      toast.error(
        error.message ?? "Failed to sign-in anonymously",
      );
    },
  });
}
