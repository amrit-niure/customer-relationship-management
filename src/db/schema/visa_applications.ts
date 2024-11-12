import { pgTable, uuid, varchar, timestamp, text, real } from 'drizzle-orm/pg-core';
import { customers} from './customers';
import { overseerEnum, visaTypeEnum, statusEnum } from "./enums";
import { relations } from 'drizzle-orm';

export const visaApplications = pgTable('visa_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('first_name').notNull(),
  middleName: varchar('middle_name'),
  lastName: varchar('last_name').notNull(),
  email: varchar('email').notNull().unique(),
  address: text('address').notNull(),
  passportNumber: varchar('passport_number').notNull().unique(),
  visaAppliedDate: timestamp('visa_applied_date').notNull().defaultNow(),
  visaStatus: statusEnum('visa_status').notNull(),
  previousVisa: visaTypeEnum('previous_visa').notNull(),
  visaType: visaTypeEnum('visa_type').notNull(),
  totalAmount: real('total_amount').notNull().default(0.0),
  totalPaid: real('total_paid').notNull().default(0.0),
  overseer: overseerEnum('overseer'),
  customerId: uuid('customer_id').notNull().references(() => customers.id),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdateFn( ()=> new Date()).notNull(),
});

export const visaApplicationsRelations = relations(visaApplications, ({ one }) => ({
    customer: one(customers, {
      fields: [visaApplications.customerId],
      references: [customers.id],
    }),
  }));