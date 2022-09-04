import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.154.0/testing/asserts.ts";
// import { createFutureMatch, createPastMatch } from "./utils.ts";

import { toDate } from "../db/matches.ts";

Deno.test("Test toDate()", () => {
  const dt = "2000-01-01T00:00:00Z";

  // Date is VALID
  assertEquals(toDate(dt), { date: new Date(dt) });

  // Date is NOT valid
  const { error } = toDate("invalid");
  assert(error instanceof Error);
});
