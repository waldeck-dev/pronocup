import {
  IGameScore,
  IScore,
  ITrueFalse,
  PlayTime,
  Team,
} from "../types/pronostics.ts";

const SCORES: IGameScore = {
  winner: {
    [PlayTime.FullTime]: { true: 10, false: 1 },
    [PlayTime.HalfTime]: { true: 5, false: -2 },
  },
  draw: {
    [PlayTime.FullTime]: { true: 5, false: -2 },
    [PlayTime.HalfTime]: { true: 2, false: -4 },
  },
};

/**
 * @param param0 Score that is to be evaluated
 * @returns {Team} Winner of the match (home | away), or Draw if no winner
 */
export function getWinner({ home, away }: IScore) {
  if (home === away) return Team.DRAW;
  return home > away ? Team.HOME : Team.AWAY;
}

/**
 * @param gameScore Score that are to be distributed
 * @param scoreKey Player score key identifier
 * @returns {number} Score to be added for this prediction
 */
export function getScore(
  gameScore: ITrueFalse,
  scoreKey: boolean,
) {
  const keyStr = scoreKey.toString();

  if (["true", "false"].includes(keyStr)) {
    // @ts-ignore: key will always be 'true' or 'false'
    return gameScore[keyStr];
  }

  return 0;
}

