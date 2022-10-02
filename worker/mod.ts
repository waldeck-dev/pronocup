// Loading .env
import { config } from "./deps.ts";
config({
  export: true,
  path: "./.env/.env",
  example: "./.env/.env.example",
  defaults: "./.env/.env.defaults",
});

import { db } from "./db/db.ts";
import {
  getProcessedMatches,
  pushMatchesToApi,
  updateMatchesFromApi,
} from "./db/matches.ts";

export async function runWorker() {
  const competitionId = parseInt(
    Deno.env.get("FDORG_COMPETITION_ID") as string,
  );

  const updatedMatches = await updateMatchesFromApi(competitionId);
  if (updatedMatches.length === 0) return;

  const processedMatches = await getProcessedMatches();
  console.log("PROCESSED", processedMatches);

  const allMatches = await db.matches.getAll(true);
  await pushMatchesToApi(allMatches);
}

runWorker();
