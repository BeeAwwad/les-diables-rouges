"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  signInWithGoogle,
  signInWithGitHub,
  signInAnonymously,
} from "@/utils/actions";
import { useRouter } from "next/navigation";

const AuthLogin = () => {
  const router = useRouter();

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isAnonymousLoading, setIsAnonymousLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign-in failed", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setIsGithubLoading(true);
    try {
      await signInWithGitHub();
    } catch (error) {
      console.error("Github sign-in failed", error);
    } finally {
      setIsGithubLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setIsAnonymousLoading(true);
    try {
      await signInAnonymously();
      router.push("/predict-eleven");
    } catch (error) {
      console.log("Anonymous sign-in failed", error);
    } finally {
      setIsAnonymousLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md sm:mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Choose a provider to sign in with</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Icon
              className="mr-2 size-4 animate-spin"
              icon="ri:loader-4-line"
            />
          ) : (
            <Icon className="mr-2 size-4" icon="logos:google-icon" />
          )}
          <span className="text-xs sm:text-sm">
            {isGoogleLoading ? "Signing in..." : "Sign in with Google"}
          </span>
        </Button>
        <Button
          variant="outline"
          onClick={handleGithubSignIn}
          disabled={isGithubLoading}
        >
          {isGithubLoading ? (
            <Icon
              className="mr-2 size-4 animate-spin"
              icon="ri:loader-4-line"
            />
          ) : (
            <Icon className="mr-2 size-4" icon="logos:github-icon" />
          )}
          <span className="text-xs sm:text-sm">
            {isGithubLoading ? "Signing in..." : "Sign in with Github"}
          </span>
        </Button>
        <Button
          variant="outline"
          onClick={handleAnonymousSignIn}
          disabled={isAnonymousLoading}
        >
          {isAnonymousLoading ? (
            <Icon
              className="mr-2 size-4 animate-spin"
              icon="ri:loader-4-line"
            />
          ) : (
            <Icon className="mr-2 size-4" icon="ic:baseline-person-outline" />
          )}
          <span className="text-xs sm:text-sm">
            {isAnonymousLoading ? "Signing in..." : "Continue as Guest"}
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthLogin;
