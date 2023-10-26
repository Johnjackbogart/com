import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from 'postgres';
import { env } from "~/env.mjs";

const client = postgres('', {
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  user: env.DB_USER,
  password: env.DB_PW,
  database: env.DB_DB,
});

const db = drizzle(client);
await migrate(db, { migrationsFolder: 'drizzle' });
export default db;
