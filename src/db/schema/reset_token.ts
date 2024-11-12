import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";


export const resetTokens = pgTable('reset_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
});

export const resetTokenRealtions = relations(resetTokens,
    ({one}) => ({
        users: one(users,{
            fields: [resetTokens.userId],
            references: [users.id]
        })
    })
)