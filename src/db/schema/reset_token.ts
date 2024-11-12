import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";


export const resetTokens = pgTable('reset_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  token: text('token').unique(),
  tokenExpiresAt: timestamp('token_expires_at', { mode: "date" }).notNull(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
},    (table) => [
    index("reset_tokens_token_idx").on(table.token),
]);

export const resetTokenRealtions = relations(resetTokens,
    ({one}) => ({
        users: one(users,{
            fields: [resetTokens.userId],
            references: [users.id]
        })
    })
)