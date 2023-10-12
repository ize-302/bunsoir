import type { Config } from "drizzle-kit";

export default {
  out: "./drizzle",
  schema: "./db/schema.ts",
  breakpoints: true,
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string, // "mysql://USER:PASSWORD@HOST:PORT/DATABASE",
  },
} satisfies Config;
