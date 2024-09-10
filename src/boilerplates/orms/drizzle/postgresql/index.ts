import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing environment variable: DATABASE_URL");
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();
export const db = drizzle(client, { schema: schema });