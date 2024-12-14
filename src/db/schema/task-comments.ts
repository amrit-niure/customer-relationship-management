import {
    pgTable,
    uuid,
    text,
    timestamp
  } from "drizzle-orm/pg-core";
  import { users } from "./users";
  import { tasks } from "./tasks";
  
  export const taskComments = pgTable('task_comments', {
    id: uuid('id').primaryKey().defaultRandom(),
    taskId: uuid('task_id').references(() => tasks.id).notNull(),
    commentById: uuid('comment_by_id').references(() => users.id).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  });