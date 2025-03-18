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
import { signInWithGoogle, signInWithGitHub } from "@/utils/actions";

const AuthForm = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

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
  return (
    <Card className="w-full max-w-md sm:mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Choose a provider to sign in with</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          className="flex justify-between gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-1/2"
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
            className="w-1/2"
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
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
