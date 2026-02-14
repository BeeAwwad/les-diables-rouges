import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getEnvironmentVariable } from "../utils";

const { supabaseAnonKey, supabaseUrl} = getEnvironmentVariable()

export async function updateSession(request: NextRequest) {
  
  let supabaseResponse = NextResponse.next({
    request,
  });

  if (!supabaseUrl || !supabaseAnonKey)  return supabaseResponse;

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );


  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute =  pathname.startsWith("/predict-eleven");
  const isAuthRoute = pathname.startsWith("/auth");

  if (pathname.startsWith("/auth/callback")) {
    return supabaseResponse;
  }

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && user) {
     return NextResponse.redirect(new URL("/predict-eleven", request.url))
  }

  return supabaseResponse;
}
