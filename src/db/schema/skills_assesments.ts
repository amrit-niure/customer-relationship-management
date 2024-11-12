import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { customers} from ".";
import { outcomeEnum, saStatusEnum } from "./enums";
import { relations } from 'drizzle-orm';

export const skillsAssessments = pgTable('skills_assessments', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').notNull().references(() => customers.id),
  occupation: varchar('occupation').notNull(),
  assessingAuthority: varchar('assessing_authority').notNull(),
  applicationDate: timestamp('application_date').notNull(),
  status: saStatusEnum('status').notNull(),
  outcomeReceived: boolean('outcome_received').notNull().default(false),
  outcomeDate: timestamp('outcome_date'),
  outcomeResult: outcomeEnum('outcome').default('PENDING'),
  appealSubmitted: boolean('appeal_submitted').notNull().default(false),
  appealDate: timestamp('appeal_date'),
  appealOutcome: outcomeEnum('appeal_outcome'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdateFn( ()=> new Date()).notNull(),
});

export const skillsAssessmentsRelations = relations(skillsAssessments, ({ one }) => ({
    customer: one(customers, {
      fields: [skillsAssessments.customerId],
      references: [customers.id],
    }),
  }));