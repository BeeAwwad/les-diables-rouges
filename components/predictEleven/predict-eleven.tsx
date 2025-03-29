"use client";

import { createClient } from "@/utils/supabase/browser";
import { redirect } from "next/navigation";
import Image from "next/image";
import { signOut } from "@/utils/actions";
import VotingForm from "./voting-form";
import CustomButton from "../ui/custom-button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

const PredictEleven = ({ initialUser }: { initialUser: User }) => {
  type Vote = {
    player_id: string;
    position_number: number;
  };

  type Player = {
    id: string;
    name: string;
    position: string;
    shirt_number: number;
    created_at: string;
  };

  type Match = {
    id: string;
    home_team: string;
    away_team: string;
    match_date: string;
    status: string;
  };

  enum AuthProvider {
    Google = "google",
    GitHub = "github",
  }

  const supabase = createClient();
  const [user, setUser] = useState<User | null>(initialUser);
  const [players, setPlayers] = useState<Player[] | null>([]);
  const [match, setMatch] = useState<Match | null>(null);
  const [votes, setVotes] = useState<Vote[] | null>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        if (!user) {
          const { data: userData } = await supabase.auth.getUser();
          let currentUser = userData?.user;

          if (!currentUser) {
            const { data: anonymousUserData } =
              await supabase.auth.signInAnonymously();
            currentUser = anonymousUserData?.user;
          }
          if (!isMounted) return;
          setUser(currentUser);
        }
        const { data: playersData, error: playersError } = await supabase
          .from("players")
          .select("*");

        if (playersError) {
          console.error("Error fetching players:", playersError.message);
          toast.error("Error fetching players.");
          return;
        }
        if (!isMounted) return;
        setPlayers(playersData);

        const { data: matchData, error: matchError } = await supabase
          .from("matches")
          .select("*")
          .single();

        if (matchError) {
          console.error("Error fetching match:", matchError.message);
          toast.error("Error fetching match.");
          return;
        }
        if (!isMounted) return;
        setMatch(matchData);

        if (user && matchData) {
          const { data: votesData, error: votesError } = await supabase
            .from("votes")
            .select("player_id, position_number")
            .eq("match_id", matchData.id)
            .eq("user_id", user.id);

          if (votesError) {
            console.error("Error fetching votes:", votesError.message);
            toast.info("This is your first vote of this fixture.");
          }
          if (!isMounted) return;
          setVotes(votesData);
        }
      } catch (error) {
        console.error("Unexpected error in fetching data:", error);
        toast.error("An error occured while loading data.");
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (!user || !match) {
    return <div>Loading...</div>;
  }

  const isGuest = !user.email;
  const userName = isGuest
    ? "Guest User"
    : user.user_metadata?.user_name || "Unknown User";
  const userId = user.id;
  const avatarUrl = user.user_metadata?.avatar_url || "/guest-avatar.png";

  const handleLinkIdentity = async (provider: AuthProvider) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    console.log("🚀 ~ handleLinkIdentity ~ data:", userData);

    if (userError || !userData?.user) {
      console.error("Error fetching userData:", userError?.message);
      toast.error("Failed to fetch user.");
      return;
    }

    // Check if the user already has an identity for this provider
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

    // Proceed with linking
    const auth_callback_url = `${process.env.SITE_URL}/auth/callback?next=/predict-eleven`;
    const { data, error } = await supabase.auth.linkIdentity({
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
      <VotingForm
        userId={userId}
        players={players || []}
        matchId={match?.id}
        userVotes={votes || []}
        isGuest={isGuest}
      />
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
