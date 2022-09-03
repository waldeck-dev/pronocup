import { config } from "./deps.ts";

// Loading .env
config({
  export: true,
  path: "./.env/.env",
  example: "./.env/.env.example",
  defaults: "./.env/.env.defaults",
});
