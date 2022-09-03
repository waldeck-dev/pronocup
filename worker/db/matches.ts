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

  const createMatch = (m: IMatch) => db.matches.create(m.id!.toString(), m);

  matches.forEach(async (m) => {
    if (!m.id) return

    const matchExists = await db.matches.has(m.id.toString());
    if (!matchExists) return createMatch(m);

    const match = await db.matches.get(m.id.toString()) as IMatch;
    if (match.lastUpdated !== m.lastUpdated) {
      await db.matches.delete(m.id.toString());
      createMatch(m);
    }
  });
}
