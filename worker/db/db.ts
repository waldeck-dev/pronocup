import { Sabr, SabrTable } from "../deps.ts";
import { IMatch } from "../types/fd-org.ts";

const sabr = new Sabr();

export const db = {
  sabr,
  matches: new SabrTable<IMatch>(sabr, "matches"),
};

await sabr.init();
