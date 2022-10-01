export enum PlayTime {
  FullTime = "fullTime",
  HalfTime = "halfTime",
}

export enum Team {
  HOME = "home",
  AWAY = "away",
  DRAW = "draw",
}

export interface IScore {
  home: number;
  away: number;
}

export interface IPronostic {
  score: {
    fullTime: IScore;
    halfTime: IScore;
  };
  goals: {
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
}
