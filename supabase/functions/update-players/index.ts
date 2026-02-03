import { createClient } from "https://esm.sh/@supabase/supabase-js";

console.log("Hello from update-players");

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SB_URL")!,
    Deno.env.get("SB_SERVICE_ROLE_KEY")!
  );
    try {
    const apiKey = Deno.env.get("API_FOOTBALL_KEY");
    const response = await fetch(
      "https://v3.football.api-sports.io/players/squads?team=33",
      {
        headers: {
          "x-apisports-key": apiKey!,
        },
      },
    );

    if (!response.ok) {
        throw new Error(`API Fetch Failed: ${response.statusText}`);
    }

    const playersData = await response.json();

    if (!playersData.response || playersData.response.length === 0) {
      return new Response(JSON.stringify({ error: "No players found" }), {
        status: 400,
      });
    }

    const playersToSync = playersData.response[0].players.filter((player: Player) =>
      player.number !== null
    ).map((player: Player) => ({
      api_id: player.id,
      name: player.name,
      position: player.position,
      shirt_number: player.number,
      is_active: true,
    }));

    const { resetError } = await supabase
      .from("players")
      .update({ is_active: false })
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (resetError) throw resetError;


    console.log({ playersToSync })
    
    const { error: upsertError} = await supabase
    .from("players")
    .upsert(playersToSync, { onConflict: "api_id"});

    if (upsertError) throw upsertError;

    console.log("Players updated successfully");

    return new Response(
      JSON.stringify({ message: "Players updated successfully" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("FUNCTION ERROR:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
} 
})
