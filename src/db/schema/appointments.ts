import {
    pgTable,
    uuid,
    timestamp,
    text,
    boolean
  } from "drizzle-orm/pg-core";
  import { appointmentStatusEnum } from "./enums";
  import { users } from "./users";
  import { clients } from "./clients";
import { relations } from "drizzle-orm";
import { officeVisits } from "./office-visits";
import { tasks } from "./tasks";
  
  export const appointments = pgTable('appointments', {
    id: uuid('id').primaryKey().defaultRandom(),
    clientId: uuid('client_id').references(() => clients.id,{onDelete: "cascade"}).notNull(),
    agentId: uuid('agent_id').references(() => users.id,{onDelete: "cascade"}),
    status: appointmentStatusEnum('status').default('SCHEDULED').notNull(),
    purpose: text('purpose'),
    appointmentDateTime: timestamp('appointment_date_time').notNull(),
    isWalkIn: boolean('is_walk_in').default(false).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdateFn( ()=> new Date()).notNull(),
    bookedBy: uuid('booked_by').references(() => users.id, { onDelete: "set null"}),
    updatedBy: uuid('updated_by').references(() => users.id, { onDelete: "set null"}),
  });

  export const appointmentsRelations = relations(appointments, ({ one, many }) => ({
    client: one(clients, {
      fields: [appointments.clientId],
      references: [clients.id]
    }),
    agent: one(users, {
      fields: [appointments.agentId],
      references: [users.id]
    }),
    officeVisits: many(officeVisits), // One appointment can have many office visits
    
    // New relation
    tasks: many(tasks) // Tasks associated with this appointment
  }));