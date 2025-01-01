import gql from "graphql-tag";

export const typeDefs = gql`
  # football-data.org schema
  type Area {
    id: Int!
    name: String!
    code: String!
    flag: String!
  }

  type Competition {
    id: Int!
    name: String!
    code: String!
    type: String!
    emblem: String!
  }

  type Season {
    id: Int!
    startDate: String!
    endDate: String!
    currentMatchday: Int!
    winner: String
  }

  type Club {
    id: Int!
    name: String!
    shortName: String!
    tla: String!
    crest: String!
  }

  type Score {
    winner: String
    duration: String!
    fullTime: ScoreDetail
    halfTime: ScoreDetail
  }

  type ScoreDetail {
    home: Int
    away: Int
  }

  type Odds {
    msg: String!
  }

  type Fixture {
    area: Area!
    competition: Competition!
    season: Season!
    id: Int!
    utcDate: String!
    status: String!
    matchday: Int!
    stage: String!
    group: String
    lastUpdated: String!
    homeTeam: Club!
    awayTeam: Club!
    score: Score!
    odds: Odds!
    referees: [String!]
  }

  type Filters {
    competitions: String!
    permission: String!
    limit: Int!
  }

  type ResultSet {
    count: Int!
    competitions: String!
    first: String!
    last: String!
    played: Int!
    wins: Int!
    draws: Int!
    losses: Int!
  }

  type FixturesResponse {
    filters: Filters!
    resultSet: ResultSet!
    matches: [Fixture!]
  }

  type Venue {
    venue_name: String!
    venue_address: String!
    venue_city: String!
    venue_capacity: String!
    venue_surface: String!
  }

  type PlTeam {
    id: Int!
    name: String!
    shortName: String!
    tla: String!
    crest: String!
  }

  type PlTeamStats {
    position: Int!
    team: PlTeam!
    playedGames: Int!
    form: String
    won: Int!
    draw: Int!
    lost: Int!
    points: Int!
    goalsFor: Int!
    goalsAgainst: Int!
    goalDifference: Int
  }

  # apifootball.com schema

  type Player {
    player_key: Int!
    player_id: String!
    player_image: String!
    player_name: String!
    player_complete_name: String!
    player_number: String!
    player_country: String
    player_type: String!
    player_age: String!
    player_match_played: String!
    player_goals: String!
    player_yellow_cards: String!
    player_red_cards: String!
    player_injured: String!
    player_substitute_out: String!
    player_substitutes_on_bench: String!
    player_assists: String!
    player_birthdate: String!
    player_is_captain: String
    player_shots_total: String
    player_goals_conceded: String
    player_fouls_committed: String
    player_tackles: String
    player_blocks: String
    player_crosses_total: String
    player_interceptions: String
    player_clearances: String
    player_dispossesed: String
    player_saves: String
    player_inside_box_saves: String
    player_duels_total: String
    player_duels_won: String
    player_dribble_attempts: String
    player_dribble_succ: String
    player_pen_comm: String
    player_pen_won: String
    player_pen_scored: String
    player_pen_missed: String
    player_passes: String
    player_passes_accuracy: String
    player_key_passes: String
    player_woordworks: String
    player_rating: String
  }

  type Coach {
    coach_name: String!
    coach_country: String
    coach_age: String
  }

  type Team {
    team_key: String!
    team_name: String!
    team_country: String!
    team_founded: String!
    team_badge: String!
    venue: Venue!
    players: [Player!]!
    coaches: [Coach!]!
  }

  # api-football.com schema

  type ApiPeriods {
    first: Int
    second: Int
  }

  type ApiVenue {
    id: Int!
    name: String!
    city: String!
  }

  type ApiStatus {
    long: String!
    short: String!
    elapsed: Int
  }

  type ApiFixture {
    id: Int!
    referee: String
    timezone: String!
    date: String!
    timestamp: Int!
    periods: ApiPeriods!
    venue: ApiVenue!
    status: ApiStatus!
  }

  type ApiLeague {
    id: Int!
    name: String!
    country: String!
    logo: String!
    flag: String!
    season: Int!
    round: String!
  }

  type ApiTeam {
    id: Int!
    name: String!
    logo: String!
    winner: Boolean
  }

  type ApiTeams {
    home: ApiTeam!
    away: ApiTeam!
  }

  type ApiGoal {
    home: Int
    away: Int
  }

  type ApiScore {
    halftime: ApiGoal!
    fulltime: ApiGoal!
    extratime: ApiGoal
    penalty: ApiGoal
  }

  type ApiLeague {
    id: Int!
    name: String!
    country: String!
    logo: String!
    flag: String!
    season: Int!
    round: String!
  }

  type TeamStatisticsSummary {
    id: Int!
    name: String!
    ballPossession: String
  }

  type EventTime {
    elapsed: Int!
    extra: Int
  }

  type EventTeam {
    id: Int!
    name: String!
    logo: String!
  }

  type EventPlayer {
    id: Int!
    name: String!
  }

  type EventAssist {
    id: Int
    name: String
  }

  type FixtureEvent {
    time: EventTime!
    team: EventTeam!
    player: EventPlayer!
    assist: EventAssist
    type: String!
    detail: String!
    comments: String
  }

  type FixtureClub {
    crest: String!
    shortName: String!
  }

  type Crests {
    home: FixtureClub!
    away: FixtureClub!
  }

  type ApiFixtureResponse {
    fixture: ApiFixture!
    league: ApiLeague!
    teams: ApiTeams!
    goals: ApiGoal!
    score: ApiScore!
    statisticsSummary: [TeamStatisticsSummary!]
    events: [FixtureEvent!]
    crests: Crests!
  }

  # Resover Query
  type Query {
    getFixtures(id: ID!): FixturesResponse!
    getNextFixture(id: ID!): Fixture!
    getResults(id: ID!): [Fixture!]
    getTeam(id: ID!): Team!
    getPlStandings: [PlTeamStats!]!
    getPreviousFixture(id: ID!, season: Int!): ApiFixtureResponse!
    getForm(id: ID!, season: Int!): String!
  }
`;
