import { db } from "./db.ts";
import { getAuthHeaders } from "../db/fd-org.ts";
import { IMatch } from "../types/fd-org.ts";

async function fetchMatches(competitionId: number) {
  const response = await fetch(
    `${Deno.env.get("FDORG_URL")}/competitions/${competitionId}/matches`,
    { headers: getAuthHeaders() },
  )
    .then((res) => res.json())
    .catch((error) => console.error("Unable to fecth matches: " + error));

  return response.matches as IMatch[];
}

export async function updateMatchesFromApi(competitionId: number) {
  const matches = await fetchMatches(competitionId);

  const createMatch = async (m: IMatch) =>
    await db.matches.create(m.id!.toString(), m);

  const updatedMatches: IMatch[] = [];
  for (const m of matches) {
    if (!m.id) continue;

    const matchId = m.id.toString();
    const matchExists = await db.matches.has(matchId);
    if (!matchExists) {
      await createMatch(m);
      updatedMatches.push(m);
    }

    const match = await db.matches.get(matchId) as IMatch;
    if (match.lastUpdated !== m.lastUpdated) {
      await db.matches.delete(matchId);
      createMatch(m);
      updatedMatches.push(m);
    }
  }

  return updatedMatches;
}

export function toDate(dateString: string) {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime())
    ? { date }
    : { error: new Error(`${dateString} is not a valid Date`) };
}

