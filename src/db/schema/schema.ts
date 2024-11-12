// import { pgTable, uuid, varchar, boolean, timestamp, integer, text, pgEnum, real } from 'drizzle-orm/pg-core';
// import { relations } from 'drizzle-orm';

// // Enums
// export const roleEnum = pgEnum('role', ['ADMIN', 'USER']);
// export const overseerEnum = pgEnum('overseer', ['DEEPAK', 'GANESH']);
// export const statusEnum = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED']);
// export const visaTypeEnum = pgEnum('visa_type', ['SUB_500', 'SUB_482', 'SUB_407', 'SUB_186', 'SUB_189', 'SUB_190', 'SUB_600', 'SUB_820', 'SUB_801']);
// export const jrpStatusEnum = pgEnum('jrp_status', ['ENROLLED', 'IN_PROGRESS', 'COMPLETED', 'WITHDRAWN']);
// export const saStatusEnum = pgEnum('sa_status', ['SUBMITTED', 'UNDER_ASSESSMENT', 'ADDITIONAL_INFO_REQUIRED', 'COMPLETED', 'APPEALED']);
// export const saTypeEnum = pgEnum('sa_type', ['SKILLS_ASSESSMENT', 'QUALIFICATION_ASSESSMENT', 'PROVISIONAL_SKILLS_ASSESSMENT']);


// export const createdAt = timestamp('created_at', { mode: 'date' }).defaultNow().notNull();
// export const updatedAt = timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdateFn( ()=> new Date()).notNull();

// // Tables
// export const users = pgTable('users', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   firstName: varchar('first_name').notNull(),
//   lastName: varchar('last_name').notNull(),
//   email: varchar('email').notNull(),
//   hashedPassword: varchar('hashed_password').notNull(),
//   role: roleEnum('role').default('USER'),
//   emailVerified: boolean('email_verified').notNull(),
//   createdAt: createdAt,
//   updatedAt: updatedAt,
// });

// export const sessions = pgTable('sessions', {
//   id: varchar('id').primaryKey(),
//   userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
//   expiresAt: timestamp('expires_at').notNull(),
// });

// export const emailVerificationCodes = pgTable('email_verification_codes', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   code: varchar('code').notNull(),
//   userId: uuid('user_id').notNull().unique().references(() => users.id),
//   email: varchar('email').notNull(),
//   expiresAt: timestamp('expires_at').notNull(),
//   sentAt: timestamp('sent_at').notNull(),
// });

// export const resetTokens = pgTable('reset_tokens', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   code: varchar('code').notNull().unique(),
//   expiresAt: timestamp('expires_at').notNull(),
//   userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
// });

// export const customers = pgTable('customers', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   firstName: varchar('first_name').notNull(),
//   middleName: varchar('middle_name'),
//   lastName: varchar('last_name').notNull(),
//   email: varchar('email').notNull().unique(),
//   address: text('address').notNull(),
//   passportNumber: varchar('passport_number').unique(),
//   currentVisa: visaTypeEnum('current_visa'),
//   visaExpiry: timestamp('visa_expiry'),
//   phone: varchar('phone').notNull().unique(),
//   createdAt: createdAt,
//   updatedAt: updatedAt,
// });

// export const visaApplications = pgTable('visa_applications', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   firstName: varchar('first_name').notNull(),
//   middleName: varchar('middle_name'),
//   lastName: varchar('last_name').notNull(),
//   email: varchar('email').notNull().unique(),
//   address: text('address').notNull(),
//   passportNumber: varchar('passport_number').notNull().unique(),
//   visaAppliedDate: timestamp('visa_applied_date').notNull().defaultNow(),
//   visaStatus: statusEnum('visa_status').notNull(),
//   previousVisa: visaTypeEnum('previous_visa').notNull(),
//   visaType: visaTypeEnum('visa_type').notNull(),
//   totalAmount: real('total_amount').notNull().default(0.0),
//   totalPaid: real('total_paid').notNull().default(0.0),
//   overseer: overseerEnum('overseer'),
//   customerId: uuid('customer_id').notNull().references(() => customers.id),
//   createdAt: createdAt,
//   updatedAt: updatedAt,
// });

// export const jobReadyPrograms = pgTable('job_ready_programs', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   customerId: uuid('customer_id').notNull().references(() => customers.id),
//   programType: varchar('program_type').notNull(),
//   startDate: timestamp('start_date').notNull(),
//   endDate: timestamp('end_date').notNull(),
//   status: jrpStatusEnum('status').notNull(),
//   workplacement: varchar('workplacement'),
//   employerName: varchar('employer_name'),
//   employerABN: varchar('employer_abn'),
//   supervisorName: varchar('supervisor_name'),
//   supervisorContact: varchar('supervisor_contact'),
//   completionDate: timestamp('completion_date'),
//   certificateIssued: boolean('certificate_issued').notNull().default(false),
//   createdAt: createdAt,
//   updatedAt: updatedAt,
// });

// export const skillsAssessments = pgTable('skills_assessments', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   customerId: uuid('customer_id').notNull().references(() => customers.id),
//   occupation: varchar('occupation').notNull(),
//   assessingAuthority: varchar('assessing_authority').notNull(),
//   applicationDate: timestamp('application_date').notNull(),
//   status: saStatusEnum('status').notNull(),
//   documentationSubmitted: boolean('documentation_submitted').notNull(),
//   skillsAssessmentType: saTypeEnum('skills_assessment_type').notNull(),
//   outcomeReceived: boolean('outcome_received').notNull().default(false),
//   outcomeDate: timestamp('outcome_date'),
//   outcomeResult: varchar('outcome_result'),
//   appealSubmitted: boolean('appeal_submitted').notNull().default(false),
//   appealDate: timestamp('appeal_date'),
//   appealOutcome: varchar('appeal_outcome'),
//   createdAt: createdAt,
//   updatedAt: updatedAt,
// });

// // Relations
// export const usersRelations = relations(users, ({ many, one }) => ({
//   sessions: many(sessions),
//   emailVerificationCode: one(emailVerificationCodes),
//   resetTokens: many(resetTokens),
// }));

// export const customersRelations = relations(customers, ({ many }) => ({
//   visaApplications: many(visaApplications),
//   jobReadyPrograms: many(jobReadyPrograms),
//   skillsAssessments: many(skillsAssessments),
// }));