import { createClient } from "https://esm.sh/@supabase/supabase-js";

console.log("Hello from update-match-history");

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SB_URL")!,
    Deno.env.get("SB_SERVICE_ROLE_KEY")!
  );
  
  try {
    const headers = { "x-apisports-key": Deno.env.get("API_FOOTBALL_KEY")! };
      
    const lastFixtureRes = await fetch(
      "https://v3.football.api-sports.io/fixtures?team=33&last=1",
      { headers }
    );

    const lastFixtureData = await lastFixtureRes.json();
    
    const season = 2025;
    const teamId = 33;
    let latestApiFixtureId = 0;
    
    if (lastFixtureData.response[0]?.league?.name !== "Premier League") {
      console.log("Last match wasn't a premier league game. updating...")
    } else {
      latestApiFixtureId = lastFixtureData.response[0]?.fixture?.id;
    } 
 
    const { data: cachedMatch } = await supabase
      .from("match_history")
      .select("data")
      .eq("id", latestApiFixtureId)
      .limit(1)
      .maybeSingle();

    if (cachedMatch) {
      console.log("Cache Hit: Serving the latest match from DB");
      return new Response(JSON.stringify(cachedMatch.data), { status: 200 });
    }

    console.log("Cache miss. Fetching from APIs...");
   
    const fixturesRes = await fetch(
      `https://v3.football.api-sports.io/fixtures?team=${33}&season=${season}`,
      { headers }
    );

    const fixturesData = await fixturesRes.json();
    
    const now = new Date().toISOString();
    
    const pastFixtures = fixturesData.response
      .filter((f: any) => f.fixture.date < now && f.league.name === "Premier League")
      .sort((a: any, b: any) => new Date(b.fixture.date).getTime() - new Date(a.fixture.date).getTime());

    const latestMatch = pastFixtures[0];
    console.log({ latestMatch });

    if (!latestMatch) throw new Error("No past matches found");

    const fixtureId = latestMatch.fixture.id;

    const [ statsRes, eventsRes ] = await Promise.all([
      fetch(`https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixtureId}`, { headers }),
      fetch(`https://v3.football.api-sports.io/fixtures/events?fixture=${fixtureId}`, { headers })
    ]);

    const statsData = await statsRes.json();
    const eventsData = await eventsRes.json();

    const finalPayload = {
      ...latestMatch,
      statisticsSummary: statsData.response.map((ts: any) => ({
        id: ts.team.id,
        name: ts.team.name,
        ballPossession: ts.statistics.find((s: any) => s.type === "Ball Possession")?.value || "0%"
      })),
      events: eventsData.response
    };

    await supabase.from("match_history").upsert({
      id: fixtureId,
      team_id: teamId,
      season: season,
      match_date: latestMatch.fixture.date,
      data: finalPayload
    });

    return new Response(JSON.stringify("Match history update successfully"), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });

  } catch (error) {
    console.error("FUNCTION ERROR:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  }
});
