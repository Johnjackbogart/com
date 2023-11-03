import fs from 'fs';
import { drizzle } from "drizzle-orm/node-postgres";
import postgres from 'postgres';
import { Client } from 'pg';
import { env } from "~/env.mjs";

console.log(fs.readFileSync('../../prod-ca-2021.crt').toString());

const client = new Client({
  connectionString: env.DB_URL, 
});

await client.connect();
const db = drizzle(client);
export default db;
