import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const sessions = pgTable('sessions', {
    id: varchar('id').primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    expiresAt: timestamp('expires_at').notNull(),
});

export const sessionsRelations = relations(sessions,
    ({ one }) => ({
        users: one(users, {
            fields: [sessions.userId],
            references: [users.id]
        })
    }))
