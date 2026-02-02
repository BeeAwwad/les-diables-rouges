import { createClient } from "https://esm.sh/@supabase/supabase-js";

console.log("Hello from update-pl-standings");

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SB_URL")!,
    Deno.env.get("SB_SERVICE_ROLE_KEY")!
  );
  try{
    const res = await fetch(
      `https://api.football-data.org/v4/competitions/PL/standings`,
      {
        headers: {
          "X-Auth-Token": Deno.env.get("FOOTBALL_DATA_API_KEY")!,
        },
      }
    );

    if (!res){
      console.error("failed to fetch from api.football-data.org");
    }

  const data = await res.json()
  const table = data.standings[0].table;

  const rows = table.map((row: any) => ({
    position: row.position,
    team_id: row.team.id,
    played_games: row.playedGames,
    won: row.won,
    draw: row.draw,
    lost: row.lost,
    points: row.points,
    form: row.form,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase.from("pl_standings").upsert(rows, {
     onConflict: "id",
   });

  if (error) {
    console.error("Failed to update pl table", error)
  }
    return new Response(
      JSON.stringify({message: "update-pl-standings ran"}), { headers: {"Content-Type": "application/json"}},
    );

  }catch(error){
    return new Response(JSON.stringify({ error }), {status: 500})
  } 
})
