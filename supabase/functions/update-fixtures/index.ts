import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import "https://deno.land/std@0.177.0/dotenv/load.ts";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Fixture } from "../_shared/types.ts";

console.log("Hello from Functions!");

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SB_URL")!;
const supabaseKey = Deno.env.get("SB_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function updateFixtures() {
  try {
    const apiKey = Deno.env.get("FOOTBALL_DATA_API_KEY");
    const response = await fetch(
      "https://api.football-data.org/v4/teams/66/matches",
      {
        headers: { "X-Auth-Token": apiKey! },
      },
    );

    if (!response.ok) {
      console.error(
        "Failed to fetch data from the football API:",
        response.statusText,
      );
      return;
    }

    const data = await response.json();
    const matches = data.matches;
    const now = new Date().toISOString();
    const nextMatch = matches.find((match: Fixture) => match.utcDate > now);

    if (!nextMatch) {
      console.log("No upcoming matches found.");
      return;
    }

    // Delete all existing rows in the matches table
    const { error: deleteError } = await supabase
      .from("matches")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); // This condition matches all rows

    if (deleteError) {
      console.error("Error deleting existing matches:", deleteError);
      return;
    }

    // Insert the next match data
    const { error: insertError } = await supabase
      .from("matches")
      .insert({
        home_team: nextMatch.homeTeam.name,
        away_team: nextMatch.awayTeam.name,
        match_date: nextMatch.utcDate,
        status: nextMatch.status,
      });

    if (insertError) {
      console.error(
        "Error inserting new match data into Supabase:",
        insertError,
      );
    } else {
      console.log("Next match data inserted successfully.");
    }
  } catch (error) {
    console.error("An error occurred while updating fixtures:", error);
  }
}

Deno.serve(async (req) => {
  if (req.method === "POST") {
    await updateFixtures();
    return new Response("Fixtures updated successfully.", { status: 200 });
  } else {
    return new Response("Method Not Allowed", { status: 405 });
  }
});
