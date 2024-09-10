import { drizzle, BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const sqlite = new Database("sqlite.db");
export const db: BunSQLiteDatabase = drizzle(sqlite);
