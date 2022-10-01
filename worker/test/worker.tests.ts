import {
  getFirstGoal,
  getScore,
  getWinner,
  isExactScore,
  processPrediction,
  SCORES,
} from "../worker/score.ts";
import { IPronostic, IScore, ITrueFalse, Team } from "../types/pronostics.ts";
import { IGoal, IMatch, PlayTime } from "../types/fd-org.ts";
import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";

Deno.test("Test getWinner()", () => {
  const expectations: [IScore, Team][] = [
    [{ home: 1, away: 0 }, Team.HOME],
    [{ home: 0, away: 1 }, Team.AWAY],
    [{ home: 0, away: 0 }, Team.DRAW],
  ];
  for (const [score, result] of expectations) {
    assertEquals(getWinner(score), result);
  }
});

Deno.test("Test getScore()", () => {
  const expectations: [[ITrueFalse, boolean], number][] = [
    [[{ true: 1, false: 0 }, true], 1],
    [[{ true: 1, false: 0 }, false], 0],
  ];
  for (const [[gameScore, prediction], expectedScore] of expectations) {
    assertEquals(getScore(gameScore, prediction), expectedScore);
  }
  // @ts-ignore: Test invalid `gameScore` param
  assertEquals(getScore({ foo: 1, bar: 0 }, "foo"), 0);
});

Deno.test("Test isExactScore()", () => {
  const expectations: [IScore, IScore, boolean][] = [
    [{ home: 1, away: 0 }, { home: 1, away: 0 }, true],
    [{ home: 1, away: 0 }, { away: 0, home: 1 }, true],
    [{ home: 1, away: 0 }, { home: 2, away: 0 }, false],
    [{ home: 1, away: 0 }, { away: 0, home: 2 }, false],
  ];
  for (const [player, actual, expectation] of expectations) {
    assertEquals(isExactScore(player, actual), expectation);
  }
});

Deno.test("Test getFirstGoal()", () => {
  const expectations: [IGoal[], number][] = [
    [[{ minute: 10, team: { id: 456 } }], 10],
    [[{ minute: 90, team: { id: 123 } }, { minute: 5, team: { id: 456 } }], 5],
  ];
  for (const [goals, minute] of expectations) {
    assertEquals(getFirstGoal(goals)?.minute, minute);
  }
  assertEquals(getFirstGoal([]), null);
});

Deno.test("Test processPrediction()", () => {
  // Only Fulltime score predicted
  const prediction1: IPronostic = {
    score: { [PlayTime.FullTime]: { home: 1, away: 0 } },
  };
  const actual1 = {
    score: {
      [PlayTime.FullTime]: { home: 2, away: 0 },
      [PlayTime.HalfTime]: { home: 0, away: 0 },
    },
  };
  assertEquals(
    processPrediction(prediction1, actual1 as IMatch),
    {
      score: {
        [PlayTime.FullTime]: SCORES.winner[PlayTime.FullTime].true,
        [PlayTime.HalfTime]: null,
      },
      exactScore: {
        [PlayTime.FullTime]: SCORES.exactScore[PlayTime.FullTime].false,
        [PlayTime.HalfTime]: null,
      },
      goals: {
        minute_first: null,
      },
    },
  );

  // Fail Fulltime score ; win Halftime score
  const prediction2: IPronostic = {
    score: {
      [PlayTime.FullTime]: { home: 1, away: 0 },
      [PlayTime.HalfTime]: { home: 1, away: 0 },
    },
  };
  const actual2 = {
    score: {
      [PlayTime.FullTime]: { home: 1, away: 2 },
      [PlayTime.HalfTime]: { home: 1, away: 0 },
    },
  };
  assertEquals(
    processPrediction(prediction2, actual2 as IMatch),
    {
      score: {
        [PlayTime.FullTime]: SCORES.winner[PlayTime.FullTime].false,
        [PlayTime.HalfTime]: SCORES.winner[PlayTime.HalfTime].true,
      },
      exactScore: {
        [PlayTime.FullTime]: SCORES.exactScore[PlayTime.FullTime].false,
        [PlayTime.HalfTime]: SCORES.exactScore[PlayTime.HalfTime].true,
      },
      goals: {
        minute_first: null,
      },
    },
  );

  // Fail Fulltime score ; fail goals
  const prediction3: IPronostic = {
    score: {
      [PlayTime.FullTime]: { home: 1, away: 0 },
    },
    goals: { minute_first: 33 },
  };
  const actual3 = {
    score: {
      [PlayTime.FullTime]: { home: 1, away: 2 },
      [PlayTime.HalfTime]: { home: 1, away: 0 },
    },
    goals: [{ minute: 1 }],
  };
  assertEquals(
    processPrediction(prediction3, actual3 as IMatch),
    {
      score: {
        [PlayTime.FullTime]: SCORES.winner[PlayTime.FullTime].false,
        [PlayTime.HalfTime]: null,
      },
      exactScore: {
        [PlayTime.FullTime]: SCORES.exactScore[PlayTime.FullTime].false,
        [PlayTime.HalfTime]: null,
      },
      goals: {
        minute_first: SCORES.minuteFirstGoal.false,
      },
    },
  );
});
