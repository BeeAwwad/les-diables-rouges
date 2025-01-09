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

  console.log("session: ", session);
  const {
    data: {
      user: { user_metadata, app_metadata },
    },
  } = session;

  const { name, email, user_name, avatar_url } = user_metadata;

  const userName = user_name ? `@${user_name}` : "User Name not found";

  return (
    <div>
      <div>
        {avatar_url && (
          <Image
            src={avatar_url}
            alt={name}
            width={100}
            height={100}
            className="rounded-full"
            // quality={100}
          />
        )}
        <h1>{name}</h1>
        <p>{userName}</p>
        <p>{email}</p>
        <p>Created with: {app_metadata.provider}</p>

        <form action={signOut}>
          <Button type="submit">Sign Out</Button>
        </form>
      </div>
    </div>
  );
};

export default PredictEleven;
