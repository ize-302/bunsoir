import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE as string,
});

export const db = drizzle(connection);
