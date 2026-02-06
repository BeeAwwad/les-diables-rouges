"use client";
import { createBrowserClient } from "@supabase/ssr";
import { getEnvironmentVariable } from "../utils";

const { supabaseUrl, supabaseAnonKey } = getEnvironmentVariable()

export function getSupabaseBrowerClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}