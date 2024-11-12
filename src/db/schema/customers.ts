import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { visaApplications } from "./visa_applications";
import { jobReadyPrograms } from "./job_ready_programs";
import { skillsAssessments } from "./skills_assesments";
import { visaTypeEnum } from "./enums";

export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('first_name').notNull(),
  middleName: varchar('middle_name'),
  lastName: varchar('last_name').notNull(),
  email: varchar('email').notNull().unique(),
  phone: varchar('phone').notNull().unique(),
  address: text('address').notNull(),
  passportNumber: varchar('passport_number').unique(),
  currentVisa: visaTypeEnum
  ('current_visa'),
  visaExpiry: timestamp('visa_expiry'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdateFn( ()=> new Date()).notNull(),
});

export const customersRelations = relations(customers, ({ many }) => ({
  visaApplications: many(visaApplications),
  jobReadyPrograms: many(jobReadyPrograms),
  skillsAssessments: many(skillsAssessments),
}));