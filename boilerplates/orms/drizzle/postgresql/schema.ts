import {
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email_address: text("email_address"),
  password: text("password"),
});

