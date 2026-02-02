import { createClient } from "https://esm.sh/@supabase/supabase-js";

console.log("Hello from sync-matches");

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SB_URL")!,
    Deno.env.get("SB_SERVICE_ROLE_KEY")!
  );
  try{
    const res = await fetch(
      `https://api.football-data.org/v4/teams/66/matches`,
      {
        headers: {
          "X-Auth-Token": Deno.env.get("FOOTBALL_DATA_API_KEY")!,
        },
      }
    );

    if (!res){
      console.error("failed to fetch from api.football-data.org");
    }

    const { matches } = await res.json();

    const rawTeams = matches.flatMap(match => [
      {
          id: match.homeTeam.id,
          name: match.homeTeam.name,
          short_name: match.homeTeam.shortName,
          tla: match.homeTeam.tla,
          crest: match.homeTeam.crest,
        },
        {
          id: match.awayTeam.id,
          name: match.awayTeam.name,
          short_name: match.awayTeam.shortName,
          tla: match.awayTeam.tla,
          crest: match.awayTeam.crest,
        }
    ])

    const allTeams = Array.from(
      new Map(rawTeams.map((team) => [team.id, team])).values()
    );

    const {error: teamError} = await supabase.from("teams").upsert(allTeams, {onConflict: "id"});

    if (teamError) {
      console.error("Error inserting pl teams sync-matches:", teamError)
      return
    }

    const rawCompetitions = matches.map(match => ({
        id: match.competition.id,
        name: match.competition.name,
        code: match.competition.code,
        emblem: match.competition.emblem,

    }))

    const allCompetitions = Array.from(
      new Map(rawCompetitions.map((comp) => [comp.id, comp])).values()
    );

    const {error: competitionError} = await supabase.from("competitions").upsert(allCompetitions, {onConflict: "id"})
    
    if (competitionError) {
      console.error("Error inserting competitions sync-matches:", competitionError)
      return
    }

    const rawMatches = matches.map(match => ({
        id: match.id,
        utc_date: match.utcDate,
        status: match.status,
        matchday: match.matchday,
        stage: match.stage,
        competition_id: match.competition.id,
        home_team_id: match.homeTeam.id,
        away_team_id: match.awayTeam.id,
        home_score: match.score.fullTime.home,
        away_score: match.score.fullTime.away,
        winner: match.score.winner,
        last_updated: match.lastUpdated,
    }))

    const allMatches = Array.from(new Map(rawMatches.map((match) => [match.id, match])).values());

    const {error: matchesError} = await supabase.from("matches").upsert(allMatches, {onConflict: "id"});
    
    if (matchesError) {
      console.error("Error inserting competitions sync-matches:", matchesError)
      return
    }

    return new Response(
      JSON.stringify({message: "Sync complete"}), { headers: {"Content-Type": "application/json"}},
    );
  }catch(error){
    return new Response(JSON.stringify({ error }), {status: 500})
  } 
})
