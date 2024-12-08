import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  clientId: integer('client_id').references(() => clients.id),
  agentId: integer('agent_id').references(() => users.id),
  dateTime: timestamp('date_time').notNull(),
  status: text('status').default('scheduled'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const walkIns = pgTable('walk_ins', {
  id: serial('id').primaryKey(),
  clientId: integer('client_id').references(() => clients.id),
  agentId: integer('agent_id').references(() => users.id),
  dateTime: timestamp('date_time').notNull(),
  status: text('status').default('in_progress'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  agentId: integer('agent_id').references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').default('pending'),
  dueDate: timestamp('due_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const clientAssignments = pgTable('client_assignments', {
  id: serial('id').primaryKey(),
  agentId: integer('agent_id').references(() => users.id),
  clientId: integer('client_id').references(() => clients.id),
  assignmentType: text('assignment_type').notNull(), // 'appointment' or 'walk_in'
  assignmentId: integer('assignment_id'), // References either appointments.id or walkIns.id
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});