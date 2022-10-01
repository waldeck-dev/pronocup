import { getScore, getWinner } from "../worker/score.ts";
import { IScore, ITrueFalse, Team } from "../types/pronostics.ts";
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
  // @ts-ignore: Test invalide `gameScore` param
  assertEquals(getScore({ foo: 1, bar: 0 }, "foo"), 0);
});
