export type FixtureProps = {
    id: number;
    status: string;
    matchday: number;
    stage: string;
    competition_id: number;
    home_team_id: number;
    away_team_id: number;
    home_score: number | null;
    away_score: number | null;
    winner: string | null;
    utc_date: Date;
    last_updated: Date;
}

export type CompetionProps = {
    id: number;
    name: string;
    code: string;
    emblem: string;
}

export type TeamProps = {
    id: number;
    name: string;
    short_name: string;
    tla: string;
    crest: string;
}

export type LeagueTableProps = {
    id: string;
    team_id: number;
    position: number;
    played_games: number;
    won: number;
    draw: number;
    lost: number;
    form: string | null;
    points: number;
    updated_at: Date;
}

export type VoteProps = {
    id?: string;
    user_id: string;
    match_id: string;
    player_id: string;
    position_number: number;
    position: string;
};

export type PlayerProps = {
    id: string;
    name: string;
    shirt_number: number;
    position: "Goalkeeper" | "Attacker" | "Defender" | "Midfielder";
    created_at: Date;
}

export type PlayerXiProps = {
    match_id: number;
    position_number: number;
    player_id: string;
    votes_received: number;
    vote_percentage: number;
}

 type ScorePair = {
    away: number | null;
    home: number | null;
 } 

type Period = 'penalty' | 'fulltime' | 'halftime' | 'extratime';

type Event = {
    team: {
        id: number;
        logo: string;
        name: string;
    };
    time: {
        extra: number | null;
        elapsed: number;
    };
    type: "subst" | "Card" | "Goal";
    assist: {
        id:  number | null;
        name: string | null;
    };
    detail: string;
    player: {
        id: number;
        name: string;
    };
    comments: string | null;
}

type League = {
    id: number;
    flag: string;
    logo: string;
    name: string;
    round: string;
    season: number;
    country: string;
    standings: boolean;
}

type Fixture = {
    id: number;
    date: Date;
    venue: {
      id: number;
      city: string;
      name: string;
    };
    status: {
      long: string;
      extra: number | null;
      short: string;
      elapsed: number;
    };
    periods: {
      first: number;
      second: number;
    };
    referee: string | null;
    timezone: string;
    timestamp: number;
}

type StatisticsSummary = {
      id: number;
      name: string;
      ballPossession: string;
}

 type MatchData = {
    goals: ScorePair;
    score: {
        [K in Period]: ScorePair;   
    };
    events: Event[];
    league: League;
    fixture: Fixture;
    statisticsSummary: StatisticsSummary[];
}

export type MatchHistoryProps = {
    id: number;
    team_id: number;
    season: number;
    data: MatchData;
    match_date: Date;
    created_at: Date;
}

export interface PlayerDetails {
  id: number;
  pos: "G" | "D" | "M" | "F";
  grid: string;
  name: string;
  number: number;
}

export interface LineupEntry {
  player: PlayerDetails;
}

export type LineupProps = {
    id: number;
    match_date: Date;
    updated_at: Date;
    created_at: Date;
    formation: string;
    lineup_data: LineupEntry[];
} 