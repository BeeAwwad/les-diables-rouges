import { NextRequest } from "next/server";
import { handler } from "./ably-auth";
export async function GET(request: NextRequest) {
  return handler(request);
}
