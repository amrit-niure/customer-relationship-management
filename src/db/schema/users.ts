import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  index,
  text
} from "drizzle-orm/pg-core";
import {
  roleEnum,
  userStatusEnum,
  branchEnum
} from "./enums";
import { relations } from "drizzle-orm";
import { appointments } from "./appointments";
import { clientAssignments } from "./client-assignments";
import { officeVisits } from "./office-visits";
import { taskComments } from "./task-comments";
import { tasks } from "./tasks";
import { sessions } from "./session";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  middleName: varchar("middle_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  image: text('image'),
  hashedPassword: varchar("hashed_password").notNull(),
  role: roleEnum("role").default("USER").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull().unique(),
  branch: branchEnum("branch").default("AUSTRALIA"),
  address: varchar("address", { length: 256 }).notNull(),
  status: userStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
}, (table) => [
  index('users_email_idx').on(table.email),
  index('users_phone_idx').on(table.phoneNumber),

]);

export const usersRelations = relations(users, ({ many }) => ({
  appointments: many(appointments), // One user (agent) can have many appointments
  officeVisits: many(officeVisits),  // One user (agent) can have many office visits

  assignedAgent: many(clientAssignments, {
    relationName: 'assignedAgent'
  }),
  assignedBy: many(clientAssignments, {
    relationName: 'assignedByUser'
  }),
  // New task-related relations
  assignedTo: many(tasks, {
    relationName: 'assignedTo' // Tasks assigned to this user
  }),
  taskCreatedBy: many(tasks, {
    relationName: 'createdBy' // Tasks created by this user
  }),
  taskComments: many(taskComments), // Comments made by this user
  sessions: many(sessions),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;


