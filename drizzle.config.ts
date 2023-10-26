import { type Config } from "drizzle-kit";

import { env } from "~/env.mjs";

export default {
  schema: "./src/drizzle/schema.ts",
  driver: "pg",
  dbCredentials: {
    host: env.DB_HOST,
    password: env.DB_PW,
    database: env.DB_DB,
  },
} satisfies Config;
