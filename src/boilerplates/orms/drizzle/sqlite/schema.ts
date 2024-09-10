import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    email_address: text("email_address"),
    password: text("password"),
  },
  (users) => ({
    emailIndex: uniqueIndex("emailIndex").on(users.email_address),
  })
);
