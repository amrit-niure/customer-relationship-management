import {
    pgTable,
    uuid,
    text,
    timestamp
  } from "drizzle-orm/pg-core";
  import { users } from "./users";
  import { tasks } from "./tasks";
import { relations } from "drizzle-orm";
  
  export const taskComments = pgTable('task_comments', {
    id: uuid('id').primaryKey().defaultRandom(),
    taskId: uuid('task_id').references(() => tasks.id).notNull(),
    commentById: uuid('comment_by_id').references(() => users.id).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  });

  export const taskCommentsRelations = relations(taskComments, ({ one }) => ({
    task: one(tasks, {
      fields: [taskComments.taskId],
      references: [tasks.id]
    }),
    commentBy: one(users, {
      fields: [taskComments.commentById],
      references: [users.id]
    })
  }));