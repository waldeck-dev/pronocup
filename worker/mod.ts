// Loading .env
import { config } from "./deps.ts";
config({
  export: true,
  path: "./.env/.env",
  example: "./.env/.env.example",
  defaults: "./.env/.env.defaults",
});

import { runWorker } from "./db/fd-org.ts";

runWorker();
