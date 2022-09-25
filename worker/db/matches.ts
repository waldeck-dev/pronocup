import { db } from "./db.ts";
import { getAuthHeaders as getFdOrgHeaders } from "../db/fd-org.ts";
import { getAuthHeaders as getBackHeaders } from "../db/back.ts";
import { ICountry, IMatch, Team } from "../types/fd-org.ts";
import Countries from "./countries.json" assert { type: "json" };

async function fetchMatches(competitionId: number) {
  const response = await fetch(
    `${Deno.env.get("FDORG_URL")}/competitions/${competitionId}/matches`,
    { headers: getFdOrgHeaders() },
  )
    .then((res) => res.json())
    .catch((error) => console.error("Unable to fecth matches: " + error));

  return response.matches as IMatch[];
}

export async function createMatch(m: IMatch) {
  [Team.AWAY, Team.HOME].forEach((team: Team) => {
    const name = m[team].name;
    if (!name) return;
    const country = (Countries as Record<string, ICountry>)[name];
    Object.assign(m[team], country);
  });
  await db.matches.create(m.id!.toString(), m);
}

export async function updateMatchesFromApi(competitionId: number) {
  const matches = await fetchMatches(competitionId);

  const updatedMatches: IMatch[] = [];

  for (const m of matches) {
    if (!m.id) continue;

    const matchId = m.id.toString();
    const matchExists = await db.matches.has(matchId);

    if (matchExists) {
      const match = await db.matches.get(matchId) as IMatch;
      if (match.lastUpdated !== m.lastUpdated) {
        await db.matches.delete(matchId);
      } else continue;
    }

    await createMatch(m);
    updatedMatches.push(m);
  }

  return updatedMatches;
}

export async function pushMatchesToApi(matches: IMatch[]) {
  await fetch(
    `${Deno.env.get("STRAPI_URL")}/matches`,
    {
      method: "PUT",
      headers: getBackHeaders(),
      body: JSON.stringify({ data: { matches } }),
    },
  );
}

export function toDate(dateString: string) {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime())
    ? { date }
    : { error: new Error(`${dateString} is not a valid Date`) };
}
