import dotenv from 'dotenv';

interface Config {
  FALCO_GEO_PORT: number;
  FALCO_GEO_DB_HOST: string;
  FAlCO_GEO_NOTION_API_KEY: string;
  DATABASE_URL: string;
  FALCO_GEO_DB_USER: string;
  FALCO_GEO_DB_PASSWORD: string;
  FALCO_GEO_DB: string;
  FALCO_GEO_DB_PORT: number;
  FALCO_GEO_API_ENV: string;
  FALCO_GEO_SENTRY_DSN: string;
  FALCO_WEBMAP: string;
}

function initConfig(): Config {
  const { parsed } = dotenv.config();
  if (!parsed) throw new Error('.env is missing or empty.');
  return parsed as unknown as Config;
}

export const config = initConfig();
