import {
  pgTable,
  uuid,
  timestamp,
  text,
  boolean
} from "drizzle-orm/pg-core";
import { officeVisitStatus } from "./enums";
import { users } from "./users";
import { clients } from "./clients";
import { appointments } from "./appointments";
import { relations } from "drizzle-orm";

export const officeVisits = pgTable('office_visits', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').references(() => clients.id, { onDelete: "cascade" }).notNull(),
  agentId: uuid('agent_id').references(() => users.id, { onDelete: "cascade" }),
  dateTime: timestamp('date_time').notNull(),
  appointmentId: uuid('appointment_id').references(() => appointments.id, { onDelete: "cascade" }),
  status: officeVisitStatus('status').default('WAITING').notNull(),
  purpose: text('purpose'),
  isScheduled: boolean('is_scheduled').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdateFn(() => new Date()).notNull(),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: "set null" }),
  updatedBy: uuid('updated_by').references(() => users.id, { onDelete: "set null" }),
});

export const officeVisitsRelations = relations(officeVisits, ({ one }) => ({
  client: one(clients, {
    fields: [officeVisits.clientId],
    references: [clients.id]
  }),
  agent: one(users, {
    fields: [officeVisits.agentId],
    references: [users.id]
  }),
  appointment: one(appointments, {
    fields: [officeVisits.appointmentId],
    references: [appointments.id]
  })
}));