import {
  mysqlTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email_address: varchar("email_address", { length: 256 }),
    password: varchar("password", { length: 256 }),
  },
  (users) => ({
    emailIndex: uniqueIndex("email_idx").on(users.email_address),
  })
);
