"use server";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

enum AuthProvider {
  Google = "google",
  GitHub = "github",
}

const signInAnonymously = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInAnonymously();
  console.log("🚀 ~ signInAnonymously ~ data:", data);
  if (error) {
    console.error("Error signing in anonymously:", error.message);
    throw new Error(error.message);
  }

  return data.user;
};

const signInWith = async (provider: AuthProvider) => {
  const supabase = await createClient();
  const auth_callback_url =
    `${process.env.SITE_URL}/auth/callback?next=/predict-eleven`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  if (error) {
    console.error("🚀 ~ signInWith ~ error:", error);
    throw new Error(error.message);
  }

  redirect(data.url ?? "");
};

const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/auth");
};

const signInWithGoogle = () => signInWith(AuthProvider.Google);
const signInWithGitHub = () => signInWith(AuthProvider.GitHub);

export { signInAnonymously, signInWithGitHub, signInWithGoogle, signOut };
