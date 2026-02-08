"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import Image from "next/image";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";

const AuthLogin = () => {
  const router = useRouter();
  const supabase = getSupabaseBrowerClient();

  function signInWithProvider(provider: "google" | "github") {
    const redirectTo = `${window.location.origin}/auth/callback?next=/predict-eleven`;
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    });
  }

  async function signInAnonymously() {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
    router.push("/predict-eleven");
  }

  return (
    <section className="flex items-center justify-center px-3">
      <Card className="min-w-80 md:min-w-md lg:min-w-lg rounded-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription className="flex justify-between">
            <p>Choose a provider to sign in with</p>
          </CardDescription>{" "}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            variant="outline"
            onClick={() => signInWithProvider("google")}
          >
            <Image
              className="mr-2 size-5"
              src="/google.svg"
              alt="google icon"
              height={12}
              width={12}
            />

            <span className="text-xs sm:text-sm">Sign in with Google</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => signInWithProvider("github")}
          >
            <Image
              src={"/github.svg"}
              alt="github icon"
              width={12}
              height={12}
              className="mr-2 size-6"
            />
            <span className="text-xs sm:text-sm">Sign in with Github</span>
          </Button>
          <Button variant="outline" onClick={() => signInAnonymously()}>
            <User className="mr-2 size-5" />
            <span className="text-xs sm:text-sm">Continue as Guest</span>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default AuthLogin;
