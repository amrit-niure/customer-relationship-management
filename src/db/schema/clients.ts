import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    text,
    boolean,
    index
  } from "drizzle-orm/pg-core";
  import { visaTypeEnum } from "./enums";
import { relations } from "drizzle-orm";
import { appointments } from "./appointments";
import { clientAssignments } from "./client-assignments";
import { officeVisits } from "./office-visits";
import { tasks } from "./tasks";
  
  export const clients = pgTable('customers', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name',{ length: 255 }).notNull(),
    middleName: varchar('middle_name',{ length: 255 }),
    lastName: varchar('last_name',{ length: 255 }).notNull(),
    email: varchar('email',{ length: 255 }).notNull().unique(),
    phone: varchar('phone').notNull().unique(),
    address: text('address'),
    passportNumber: varchar('passport_number',{ length: 255 }).unique(),
    currentVisa: visaTypeEnum('current_visa'),
    visaExpiry: timestamp('visa_expiry'),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdateFn( ()=> new Date()).notNull(),
  }, (table) => [
    index('clients_email_idx').on(table.email),
    index('clients_phone_idx').on(table.phone),
    index('clients_passport_idx').on(table.passportNumber)
]);

export const clientsRelations = relations(clients, ({ many }) => ({
    appointments: many(appointments), // One client can have many appointments
    officeVisits: many(officeVisits), // One client can have many office visits
    clientAssignments: many(clientAssignments), // One client can have many assignments to different agents
    
    // New relation
    tasks: many(tasks) // Tasks associated with this client
  }));