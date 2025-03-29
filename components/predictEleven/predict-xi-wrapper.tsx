import { createClient } from "@/utils/supabase/server";
import PredictEleven from "./predict-eleven";

const PredictXiWrapper = async () => {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  let user = userData?.user;

  if (!user) {
    const { data } = await supabase.auth.signInAnonymously();
    user = data.user;
  }

  if (!user) {
    throw new Error("User not found");
  }

  return <PredictEleven initialUser={user} />;
};

export default PredictXiWrapper;
