import {
  pgTable,
  uuid,
  timestamp,
  boolean,
  index
} from "drizzle-orm/pg-core";
import { clientAssignmentStatusEnum } from "./enums";
import { users } from "./users";
import { clients } from "./clients";
import { relations } from "drizzle-orm";

export const clientAssignments = pgTable('client_assignments', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').references(() => users.id).notNull(),
  assignedBy: uuid('assigned_by').references(() => users.id),
  clientId: uuid('client_id').references(() => clients.id).notNull(),
  status: clientAssignmentStatusEnum('status').default('ACTIVE').notNull(),
  primaryContact: boolean('primary_contact').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdateFn(() => new Date()).notNull(),
}, (table) => [index('unique_client_assignment')
  .on(table.agentId, table.clientId)
]);

export const clientAssignmentsRelations = relations(clientAssignments, ({ one }) => ({
client: one(clients, {
  fields: [clientAssignments.clientId],
  references: [clients.id]
}),
agent: one(users, {
  fields: [clientAssignments.agentId],
  references: [users.id],
  relationName: 'assignedAgent'
}),
assignedBy: one(users, {
  fields: [clientAssignments.assignedBy],
  references: [users.id],
  relationName: 'assignedByUser'
})
}));
