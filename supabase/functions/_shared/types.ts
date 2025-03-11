export type Competition = {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string | null;
};

export type Season = {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: string | null;
};

export type Club = {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
};

export type Score = {
    winner: string | null;
    duration: string;
    fullTime: ScoreDetail;
    halfTime: ScoreDetail;
};

export type ScoreDetail = {
    home: number | null;
    away: number | null;
};

export type Odds = {
    msg: string;
};

export type Area = {
    id: number;
    name: string;
    code: string;
    flag: string;
};

export type Fixture = {
    area: Area;
    competition: Competition;
    season: Season;
    id: number;
    utcDate: string;
    status: string;
    matchday: number;
    stage: string;
    group: string | null;
    lastUpdated: string;
    homeTeam: Club;
    awayTeam: Club;
    score: Score;
    odds: Odds;
    referees: any[];
};
