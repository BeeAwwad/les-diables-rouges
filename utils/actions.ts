"use server";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

enum AuthProvider {
  Google = "google",
  GitHub = "github",
}

const signInWith = async (provider: AuthProvider) => {
  const supabase = await createClient();

  const auth_callback_url = `${process.env.SITE_URL}/auth/callback?next=/predict-eleven`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  if (error) {
    console.log("🚀 ~ signInWith ~ error:", error);
    throw new Error(error.message);
  }

  redirect(data.url ?? "");
};

const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};

const signInWithGoogle = () => signInWith(AuthProvider.Google);
const signInWithGitHub = () => signInWith(AuthProvider.GitHub);

export { signInWithGoogle, signInWithGitHub, signOut };
