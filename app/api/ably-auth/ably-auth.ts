import { NextRequest } from "next/server";
import Ably from "ably";

export const revalidate = 0;

export async function handler(request: NextRequest) {
  if (!process.env.ABLY_API_KEY) {
    throw new Error("ABLY_API_KEY environment variable is not set");
  }

  const client = new Ably.Rest(process.env.ABLY_API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "ably-nextjs-demo",
  });
  return Response.json(tokenRequestData);
}
