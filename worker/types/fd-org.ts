export enum Status {
  SCHEDULED = "SCHEDULED",
  LIVE = "LIVE",
  IN_PLAY = "IN_PLAY",
  PAUSED = "PAUSED",
  FINISHED = "FINISHED",
  POSTPONED = "POSTPONED",
  SUSPENDED = "SUSPENDED",
  CANCELLED = "CANCELLED",
}

export enum Stage {
  FINAL = "FINAL",
  THIRD_PLACE = "THIRD_PLACE",
  SEMI_FINALS = "SEMI_FINALS",
  QUARTER_FINALS = "QUARTER_FINALS",
  LAST_16 = "LAST_16",
  GROUP_STAGE = "GROUP_STAGE",
}

export enum Team {
  HOME = "homeTeam",
  AWAY = "awayTeam",
}

interface ITeam {
  id: number | null;
  name: string | null;
  shortName: string | null;
  tla: string | null;
  crest: string | null;
}

interface IScoreDetails {
  home: number | null;
  away: number | null;
}

interface IScore {
  winner: string | null;
  duration: string | null;
  fullTime: IScoreDetails;
  halfTime: IScoreDetails;
}

export interface IMatch {
  id: number | null;
  utcDate: string | null;
  status: Status;
  stage: Stage;
  group: string | null;
  lastUpdated: string | null;
  homeTeam: ITeam;
  awayTeam: ITeam;
  score: IScore;
}

export interface ICountry {
  nameFr: string;
  iso2: string;
  emoji: string;
}
