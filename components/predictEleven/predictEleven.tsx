import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { signOut } from "@/utils/actions";
import VotingForm from "./votingForm";
import CustomButton from "../ui/custom-button";

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
    return null;
  }

  const { data: match, error: matchError } = await supabase
    .from("matches")
    .select("*")
    .single();

  if (matchError) {
    console.error("Error fetching match:", matchError.message);
    return null;
  }

  console.log("🚀 ~ PredictEleven ~ match.id:", typeof match?.id);

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
        <div className="hover:border-opacity-35 flex cursor-pointer items-center gap-2 rounded-md border border-neutral-400 px-3 py-2 text-xs xl:text-base">
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

      <VotingForm userId={id} players={players || []} matchId={match?.id} />
    </div>
  );
};

export default PredictEleven;
