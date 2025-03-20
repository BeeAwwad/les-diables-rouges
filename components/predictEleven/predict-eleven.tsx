import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { signOut } from "@/utils/actions";
import VotingForm from "./voting-form";
import CustomButton from "../ui/custom-button";
import { toast } from "sonner";

const PredictEleven = async () => {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();

  if (!session.data.user) {
    redirect("/auth");
  }

  const { data: players, error: playersError } = await supabase
    .from("players")
    .select("*");
  if (playersError) {
    console.error("Error fetching players:", playersError.message);
    toast.error("Error fetching players.");
    return null;
  }

  const { data: match, error: matchError } = await supabase
    .from("matches")
    .select("*")
    .single();

  if (matchError) {
    console.error("Error fetching match:", matchError.message);
    toast.error("Error fetching match.");
    return null;
  }

  const { data: votes, error: votesError } = await supabase
    .from("votes")
    .select("player_id, position_number")
    .eq("match_id", match.id)
    .eq("user_id", session.data.user.id);

  if (votesError) {
    console.error("Error fetching votes:", votesError.message);
    toast.info("This is your first vote of this fixture.");
  }

  const {
    data: {
      user: { user_metadata, id },
    },
  } = session;

  const { name, user_name, avatar_url } = user_metadata;

  const userName = user_name ? `@${user_name}` : "User Name not found";

  return (
    <div className="no-scrollbar space-y-4 overflow-y-scroll px-2">
      <div className="flex items-center justify-between xl:px-4">
        <div className="hover:border-opacity-35 flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-xs xl:text-base">
          {" "}
          {avatar_url && (
            <Image
              src={avatar_url}
              alt={name}
              width={100}
              height={100}
              className="size-8 rounded-full"
            />
          )}
          <p className="text-xs">{userName}</p>
        </div>

        <form action={signOut}>
          <CustomButton type="submit">Sign Out</CustomButton>
        </form>
      </div>

      <VotingForm
        userId={id}
        players={players || []}
        matchId={match?.id}
        userVotes={votes || []}
      />
    </div>
  );
};

export default PredictEleven;
