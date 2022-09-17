import { db } from "./db.ts";
import { pushMatchesToApi, updateMatchesFromApi } from "./matches.ts";

export function getAuthHeaders() {
  const token = Deno.env.get("FDORG_TOKEN");
  if (!token) throw new Error("FDORG_TOKEN env variable must be set");

  return new Headers({ "X-Auth-Token": token });
}

export async function runWorker() {
  const competitionId = parseInt(
    Deno.env.get("FDORG_COMPETITION_ID") as string,
  );

  const _matches = await updateMatchesFromApi(competitionId);

  const allMatches = await db.matches.getAll(true);
  await pushMatchesToApi(allMatches);
}
