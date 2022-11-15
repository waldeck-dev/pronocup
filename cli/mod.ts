import { IAuthResponse } from "./types/api.ts";
import { Auth } from "./ui/auth.ts";
import { MainMenu } from "./ui/main-menu.ts";
import { clear } from "./ui/utils.ts";

export let jwt = "";
export let user = {};

async function main() {
  clear();

  const data = await Auth() as IAuthResponse;
  jwt = data.jwt;
  user = data.user;

  await MainMenu.show();
}

await main();
