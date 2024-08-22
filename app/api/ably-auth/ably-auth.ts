import { NextRequest } from "next/server";
import Ably from "ably";

export const revalidate = 0;

export async function handler(request: NextRequest) {
  const client = new Ably.Rest(process.env.ABLY_API_KEY as string);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "ably-nextjs-demo",
  });
  return new Response(JSON.stringify(tokenRequestData), {
    headers: { "Content-Type": "application/json" },
  });
}