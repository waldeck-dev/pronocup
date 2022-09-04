import { IMatch, Stage, Status } from "../types/fd-org.ts";

export function createMatch(): IMatch {
  return {
    id: Math.floor(Math.random() * 10000),
    utcDate: (new Date()).toISOString(),
    status: Status.SCHEDULED,
    stage: Stage.FINAL,
    group: "GROUP_A",
    lastUpdated: (new Date()).toISOString(),
    homeTeam: {
      id: 1,
      name: "Home Team",
      shortName: "Home",
      tla: "HOM",
      crest: null,
    },
    awayTeam: {
      id: 1,
      name: "Home Team",
      shortName: "Home",
      tla: "HOM",
      crest: null,
    },
    score: {
      winner: "home",
      duration: null,
      fullTime: { home: 1, away: 0 },
      halfTime: { home: 0, away: 0 },
    },
  };
}

export function createFutureMatch() {
  const m = createMatch();
  m.utcDate = new Date((new Date()).setFullYear(2050)).toISOString();
  return m;
}

export function createPastMatch() {
  const m = createMatch();
  m.utcDate = new Date((new Date()).setFullYear(2000)).toISOString();
  return m;
}
