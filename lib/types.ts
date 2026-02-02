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

export type PlayerProps = {
    id: string;
    name: string;
    shirt_number: number;
    position: string;
    created_at: Date;
}