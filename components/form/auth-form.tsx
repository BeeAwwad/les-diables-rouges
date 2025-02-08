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
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign-in failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGitHub();
    } catch (error) {
      console.error("Github sign-in failed", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Choose a provider to sign in with</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <form onSubmit={(e) => e.preventDefault()}>
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icon
                className="mr-2 size-4 animate-spin"
                icon="ri:loader-4-line"
              />
            ) : (
              <Icon className="mr-2 size-4" icon="logos:google-icon" />
            )}
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </Button>
          <Button
            variant="outline"
            onClick={handleGithubSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icon
                className="mr-2 size-4 animate-spin"
                icon="ri:loader-4-line"
              />
            ) : (
              <Icon className="mr-2 size-4" icon="logos:github-icon" />
            )}
            {isLoading ? "Signing in..." : "Sign in with Github"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
