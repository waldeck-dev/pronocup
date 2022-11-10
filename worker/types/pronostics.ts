import { PlayTime } from "./fd-org.ts";

export enum Team {
  HOME = "home",
  AWAY = "away",
  DRAW = "draw",
}

export interface IScore {
  [Team.HOME]: number;
  [Team.AWAY]: number;
}

export interface IPronostic {
  score: {
    [PlayTime.FullTime]: IScore;
    [PlayTime.HalfTime]?: IScore;
  };
  goals?: {
    minute_first: number;
  };
}

export interface ITrueFalse {
  true: number;
  false: number;
}

export interface IGameScore {
  winner: {
    [PlayTime.FullTime]: ITrueFalse;
    [PlayTime.HalfTime]: ITrueFalse;
  };
  draw: {
    [PlayTime.FullTime]: ITrueFalse;
    [PlayTime.HalfTime]: ITrueFalse;
  };
  exactScore: {
    [PlayTime.FullTime]: ITrueFalse;
    [PlayTime.HalfTime]: ITrueFalse;
  };
  minuteFirstGoal: ITrueFalse;
}

export interface IScoreResponse {
  score: {
    [PlayTime.FullTime]: number;
    [PlayTime.HalfTime]: number | null;
  };
  exactScore: {
    [PlayTime.FullTime]: number;
    [PlayTime.HalfTime]: number | null;
  };
  goals: {
    minute_first: number | null;
  };
}
