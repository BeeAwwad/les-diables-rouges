"use client";

import { Activity } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { useAnonymousSignIn } from "@/mutations/useAnonymousSignIn";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";

export function signInWithProvider(provider: "google" | "github") {
  const supabase = getSupabaseBrowerClient();

  const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/predict-eleven`;
  supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });
}

const AuthLogin = () => {
  const { mutate: SignInAnonymously, isPending: isAnonymousPending } =
    useAnonymousSignIn();

  return (
    <section className="flex items-center justify-center px-3">
      <Card className="min-w-80 md:min-w-md lg:min-w-lg rounded-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription className="flex justify-between">
            <p>Choose a provider to sign in with</p>
            <Activity mode={isAnonymousPending ? "visible" : "hidden"}>
              <Spinner />
            </Activity>
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
          <Button
            variant="outline"
            onClick={() => SignInAnonymously()}
            disabled={isAnonymousPending}
          >
            <User className="mr-2 size-5" />
            <span className="text-xs sm:text-sm">Continue as Guest</span>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default AuthLogin;
