"use client";

import Image from "next/image";
import CustomButton from "@/components/custom-ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Loader from "@/components/custom-ui/loader";
import { useSignOut } from "@/mutations/useSignOut";
import { useFixtures } from "@/queries/useFixtures";
import { getSupabaseBrowerClient } from "@/lib/supabase/browser-client";
import VotingForm from "./voting-form";
import { VoteProps } from "@/lib/types";

enum AuthProvider {
  Google = "google",
  GitHub = "github",
}

const PredictEleven = ({ user }: { user: User }) => {
  const supabase = getSupabaseBrowerClient();

  const { mutate: signOut } = useSignOut();
  const { data: Fixtures, isLoading: isFixturesLoading } = useFixtures();
  const [now, setNow] = useState<Date | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(user);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setCurrentUser(session?.user ?? null);
      },
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    setNow(new Date());
  }, []);

  const nextMatch = now
    ? Fixtures?.find((f) => new Date(f.utc_date) > now)
    : null;

  if (isFixturesLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user || !nextMatch) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-primary">Error. missing user or match data</p>
      </div>
    );
  }

  const isGuest = !user.email;
  const userName = isGuest
    ? "Guest User"
    : user.user_metadata?.user_name || "Unknown User";
  const avatarUrl = user.user_metadata?.avatar_url || "/guest.png";

  const handleLinkIdentity = async (provider: AuthProvider) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      console.error("Error fetching userData:", userError?.message);
      toast.error("Failed to fetch user.");
      return;
    }

    const existingIdentities = userData.user.identities || [];
    const isAlreadyLinked = existingIdentities.some(
      (identity) => identity.provider === provider,
    );
    console.log(
      "🚀 ~ handleLinkIdentity ~ existingIdentities:",
      existingIdentities,
    );
    if (isAlreadyLinked) {
      toast.error("This account is already linked.");
      return;
    }

    const auth_callback_url = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/predict-eleven`;
    const { error } = await supabase.auth.linkIdentity({
      provider: provider,
      options: {
        redirectTo: auth_callback_url,
      },
    });

    if (error) {
      console.error("Error linking account:", error.message);
      toast.error("Failed to link account.");
      return;
    }

    toast.info("Redirecting to provider...");
  };

  return (
    <div className="no-scrollbar space-y-4 overflow-y-scroll px-2">
      <div className="flex items-center justify-between xl:px-4">
        <div className="hover:border-opacity-35 flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-xs xl:text-base">
          {" "}
          {avatarUrl && (
            <Image
              src={avatarUrl}
              alt={userName}
              width={100}
              height={100}
              className="size-8 rounded-full"
            />
          )}
          <p className="text-xs">{userName}</p>
        </div>

        <CustomButton onClick={async () => await signOut()}>
          Sign Out
        </CustomButton>
      </div>
      {isGuest && (
        <div className="flex items-center gap-2 rounded-lg bg-yellow-100 p-3 text-sm text-yellow-800">
          ⚠️ Your votes will not be saved unless you sign in.
        </div>
      )}
      <VotingForm userId={user.id} match={nextMatch} isGuest={isGuest} />
      {/* Guest Actions */}
      {isGuest && (
        <div className="my-5 flex flex-col items-center">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <CustomButton
              onClick={async () =>
                await handleLinkIdentity(AuthProvider.Google)
              }
            >
              <p className="w-36 text-center sm:w-40 xl:w-44">
                Continue with Google
              </p>
            </CustomButton>
            <CustomButton
              onClick={async () =>
                await handleLinkIdentity(AuthProvider.GitHub)
              }
            >
              <p className="w-36 text-center sm:w-40 xl:w-44">
                Continue with GitHub
              </p>
            </CustomButton>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Your votes will be preserved after linking
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictEleven;
