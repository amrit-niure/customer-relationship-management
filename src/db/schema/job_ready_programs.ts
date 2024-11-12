import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { customers } from './customers';
import { jrpStageEnum, outcomeEnum } from "./enums";
import { relations } from 'drizzle-orm';

export const jobReadyPrograms = pgTable('job_ready_programs', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').notNull().references(() => customers.id),
  programType: varchar('program_type').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  stage: jrpStageEnum('stage').notNull(),
  workplacement: varchar('workplacement'),
  employerName: varchar('employer_name'),
  employerABN: varchar('employer_abn'),
  supervisorName: varchar('supervisor_name'),
  supervisorContact: varchar('supervisor_contact'),
  completionDate: timestamp('completion_date'),
  outcomeResult: outcomeEnum('outcome').default('PENDING'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdateFn( ()=> new Date()).notNull(),
});

export const jobReadyProgramsRelations = relations(jobReadyPrograms, ({ one }) => ({
    customer: one(customers, {
      fields: [jobReadyPrograms.customerId],
      references: [customers.id],
    }),
  }));

