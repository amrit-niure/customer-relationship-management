import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sessions } from "./sessions";
import { resetTokens } from "./reset_token";
import { branchEnum, roleEnum, userStatusEnum } from "./enums";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  middleName: varchar("middle_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  hashedPassword: varchar("hashed_password").notNull(),
  role: roleEnum("role").default("USER").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  phoneNumber: numeric("phone_number").notNull().unique(),
  branch: branchEnum("branch").default("AUSTRALIA"),
  address: varchar("address", { length: 256 }).notNull(),
  status: userStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  resetTokens: many(resetTokens),
}));

export type User = typeof users.$inferSelect; // return type when queried
export type ClientUser = Omit<typeof users.$inferSelect, "hashedPassword">; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type
