// football-data.org types

export type Area = {
  id: number;
  name: string;
  code: string;
  flag: string;
};

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

export type ScoreDetail = {
  home: number | null;
  away: number | null;
};

export type Score = {
  winner: string | null;
  duration: string;
  fullTime: ScoreDetail;
  halfTime: ScoreDetail;
};

export type Odds = {
  msg: string;
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

export type FixturesResponse = {
  id: number;
  filters: {
    competitions: string;
    permission: string;
    limit: number;
  };
  resultSet: {
    count: number;
    competitions: string;
    first: string;
    last: string;
    played: number;
    wins: number;
    draws: number;
    losses: number;
  };
  matches: Array<Fixture>;
};

export type Venue = {
  venue_name: string;
  venue_address: string;
  venue_city: string;
  venue_capacity: string;
  venue_surface: string;
};

export type PlTeam = {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
};

export type PlTeamStats = {
  position: number;
  team: PlTeam;
  playedGames: number;
  form: string | null;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
};

export type PlStandings = {
  table: PlTeamStats[];
};

// apifootball.com types

export type Player = {
  player_key: number;
  player_id: string;
  player_image: string;
  player_name: string;
  player_complete_name: string;
  player_number: string;
  player_country?: string;
  player_type: string;
  player_age: string;
  player_match_played: string;
  player_goals: string;
  player_yellow_cards: string;
  player_red_cards: string;
  player_injured: string;
  player_substitute_out: string;
  player_substitutes_on_bench: string;
  player_assists: string;
  player_birthdate: string;
  player_is_captain?: string;
  player_shots_total?: string;
  player_goals_conceded?: string;
  player_fouls_committed?: string;
  player_tackles?: string;
  player_blocks?: string;
  player_crosses_total?: string;
  player_interceptions?: string;
  player_clearances?: string;
  player_dispossesed?: string;
  player_saves?: string;
  player_inside_box_saves?: string;
  player_duels_total?: string;
  player_duels_won?: string;
  player_dribble_attempts?: string;
  player_dribble_succ?: string;
  player_pen_comm?: string;
  player_pen_won?: string;
  player_pen_scored?: string;
  player_pen_missed?: string;
  player_passes?: string;
  player_passes_accuracy?: string;
  player_key_passes?: string;
  player_woordworks?: string;
  player_rating?: string;
};

export type Coach = {
  coach_name: string;
  coach_country?: string;
  coach_age?: string;
};

export type Team = {
  team_key: string;
  team_name: string;
  team_country: string;
  team_founded: string;
  team_badge: string;
  venue: Venue;
  players: Player[];
  coaches: Coach[];
};

// api-football.com types

export type ApiPeriods = {
  first: number | null;
  second: number | null;
};

export type ApiVenue = {
  id: number;
  name: string;
  city: string;
};

export type ApiStatus = {
  long: string;
  short: string;
  elapsed: number | null;
};

export type ApiFixture = {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: ApiPeriods;
  venue: ApiVenue;
  status: ApiStatus;
};

export type ApiLeague = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
};

export type ApiTeam = {
  id: number;
  name: string;
  logo: string;
  winnner: boolean | null;
};

export type ApiTeams = {
  home: ApiTeam;
  away: ApiTeam;
};

export type ApiGoal = {
  home: number | null;
  away: number | null;
};

export type ApiScore = {
  halftime: ApiGoal;
  fulltime: ApiGoal;
  extratime: ApiGoal | null;
  penalty: ApiGoal | null;
};

export type TeamStatisticsSummary = {
  id: number;
  name: string;
  ballPossession: string | null;
};

export type EventTime = {
  elapsed: number;
  extra?: number | null;
};

export type EventTeam = {
  id: number;
  name: string;
  logo: string;
};

export type EventPlayer = {
  id: number;
  name: string;
};

export type EventAssist = {
  id?: number | null;
  name?: string | null;
};

export type FixtureEvent = {
  time: EventTime;
  team: EventTeam;
  player: EventPlayer;
  assist: EventAssist;
  type: string;
  detail: string;
  comments?: string | null;
};

export type FixtureClub = {
  crest: string;
  shortName: string;
};

export type Crests = {
  home: FixtureClub;
  away: FixtureClub;
};

export type ApiFixtureResponse = {
  fixture: ApiFixture;
  league: ApiLeague;
  teams: ApiTeams;
  goals: ApiGoal;
  score: ApiScore;
  statisticsSummary?: TeamStatisticsSummary[];
  events?: FixtureEvent[];
  crests?: Crests;
};
