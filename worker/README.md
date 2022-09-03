# Worker

## Data provider

- Football-data.org: [https://www.football-data.org/](https://www.football-data.org/)

## Local development

Set up environement variables

```sh
cd worker
cp ./.env/.env.example ./.env/.env

# Edit .env file with actual values
nano ./.env/.env

```

Running worker

```sh
deno run --allow-env --allow-read --allow-write --allow-net mod.ts
```
