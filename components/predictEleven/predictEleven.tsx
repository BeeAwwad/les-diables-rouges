import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { signOut } from "@/utils/actions";
import { Button } from "../ui/button";

const PredictEleven = async () => {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();

  if (!session.data.user) {
    redirect("/auth");
  }

  const {
    data: {
      user: { user_metadata, app_metadata },
    },
  } = session;

  const { name, email, user_name, avatar_url } = user_metadata;

  const userName = user_name ? `@${user_name}` : "User Name not found";

  return (
    <div>
      <div className="flex items-center justify-between px-4">
        <div className="flex cursor-pointer items-center gap-2 rounded-md border border-neutral-400 px-3 py-2 hover:border-opacity-35">
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
          <Button
            className="rounded border-b-4 border-primary bg-primary-300 px-4 py-2 font-semibold shadow-lg transition-all hover:border-primary-300 hover:bg-primary-200"
            type="submit"
          >
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PredictEleven;
