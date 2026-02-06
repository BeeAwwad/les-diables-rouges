import PredictEleven from "./components/predict-eleven";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

const Page = async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  return <PredictEleven user={user} />;
};

export default Page;
