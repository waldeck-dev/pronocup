import {
  IGameScore,
  IPronostic,
  IScore,
  IScoreResponse,
  ITrueFalse,
  Team,
} from "../types/pronostics.ts";
import { IGoal, IMatch, PlayTime } from "../types/fd-org.ts";

export const SCORES: IGameScore = {
  winner: {
    [PlayTime.FullTime]: { true: 10, false: 1 },
    [PlayTime.HalfTime]: { true: 5, false: -2 },
  },
  draw: {
    [PlayTime.FullTime]: { true: 10, false: 1 },
    [PlayTime.HalfTime]: { true: 5, false: -2 },
  },
  exactScore: {
    [PlayTime.FullTime]: { true: 8, false: 0 },
    [PlayTime.HalfTime]: { true: 8, false: -4 },
  },
  minuteFirstGoal: { true: 10, false: -2 },
};

/**
 * @param param0 Score that is to be evaluated
 * @returns {Team} Winner of the match (home | away), or Draw if no winner
 */
export function getWinner(score: IScore | undefined) {
  if (score === undefined) return null;
  const { home, away } = score;
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
): number {
  const keyStr = scoreKey.toString();

  if (["true", "false"].includes(keyStr)) {
    // @ts-ignore: key will always be 'true' or 'false'
    return gameScore[keyStr];
  }

  return 0;
}

export function isExactScore(playerScore: IScore, actualScore: IScore) {
  return playerScore.home === actualScore.home &&
    playerScore.away === actualScore.away;
}

export function getFirstGoal(goals: IGoal[]): IGoal | null {
  if (!Array.isArray(goals) || goals.length === 0) return null;
  return goals.sort((a, b) => a.minute - b.minute)[0];
}

/**
 * @param prediction Predicted results from player
 * @param actualResult Actual results of the match
 * @returns Points scored by player for each category
 */
export function processPrediction(
  prediction: IPronostic,
  actualResult: IMatch,
): IScoreResponse {
  const playerScore = prediction.score;
  const playerWinner = {
    [PlayTime.FullTime]: getWinner(playerScore[PlayTime.FullTime]),
    [PlayTime.HalfTime]: getWinner(playerScore[PlayTime.HalfTime]),
  };
  const playerMinuteFirstGoal = prediction.goals?.minute_first;

  const actualScore = actualResult.score;
  const actualWinner = {
    [PlayTime.FullTime]: getWinner(actualScore[PlayTime.FullTime] as IScore),
    [PlayTime.HalfTime]: getWinner(actualScore[PlayTime.HalfTime] as IScore),
  };
  const firstGoal = getFirstGoal(actualResult.goals);
  const actualMinuteFirstGoal = firstGoal ? firstGoal.minute : -1;

  const score: IScoreResponse = {
    score: {
      [PlayTime.FullTime]: actualWinner[PlayTime.FullTime] === Team.DRAW
        ? getScore(
          SCORES.draw[PlayTime.FullTime],
          playerWinner[PlayTime.FullTime] === Team.DRAW,
        )
        : getScore(
          SCORES.winner[PlayTime.FullTime],
          playerWinner[PlayTime.FullTime] === actualWinner[PlayTime.FullTime],
        ),

      [PlayTime.HalfTime]: playerWinner[PlayTime.HalfTime] !== null
        ? actualWinner[PlayTime.HalfTime] === Team.DRAW
          ? getScore(
            SCORES.draw[PlayTime.HalfTime],
            playerWinner[PlayTime.HalfTime] === Team.DRAW,
          )
          : getScore(
            SCORES.winner[PlayTime.HalfTime],
            playerWinner[PlayTime.HalfTime] === actualWinner[PlayTime.HalfTime],
          )
        : null,
    },

    exactScore: {
      [PlayTime.FullTime]: getScore(
        SCORES.exactScore[PlayTime.FullTime],
        isExactScore(
          playerScore[PlayTime.FullTime],
          actualScore[PlayTime.FullTime] as IScore,
        ),
      ),

      [PlayTime.HalfTime]: playerWinner[PlayTime.HalfTime] !== null
        ? getScore(
          SCORES.exactScore[PlayTime.HalfTime],
          isExactScore(
            playerScore[PlayTime.HalfTime] as IScore,
            actualScore[PlayTime.HalfTime] as IScore,
          ),
        )
        : null,
    },

    goals: {
      minute_first: playerMinuteFirstGoal
        ? getScore(
          SCORES.minuteFirstGoal,
          playerMinuteFirstGoal === actualMinuteFirstGoal,
        )
        : null,
    },
  };

  return score;
}
