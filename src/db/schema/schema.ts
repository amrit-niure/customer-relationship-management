import {
    pgTable,
    uuid,
    timestamp,
    text,
    boolean,
    index,
    varchar,
    integer
} from "drizzle-orm/pg-core";
import { appointmentStatusEnum, branchEnum, clientAssignmentStatusEnum, officeVisitStatus, roleEnum, taskPriorityEnum, taskStatusEnum, taskTypeEnum, userStatusEnum, visaTypeEnum } from "./enums";
import { relations } from "drizzle-orm";


export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    middleName: varchar("middle_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    hashedPassword: varchar("hashed_password").notNull(),
    role: roleEnum("role").default("USER").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }).notNull().unique(),
    branch: branchEnum("branch").default("AUSTRALIA"),
    address: varchar("address", { length: 256 }).notNull(),
    status: userStatusEnum("status").default("ACTIVE").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" })
        .defaultNow()
        .$onUpdateFn(() => new Date())
        .notNull(),
}, (table) => [
    index('users_email_idx').on(table.email),
    index('users_phone_idx').on(table.phoneNumber)
]);

export const appointments = pgTable('appointments', {
    id: uuid('id').primaryKey().defaultRandom(),
    clientId: uuid('client_id').references(() => clients.id).notNull(),
    agentId: uuid('agent_id').references(() => users.id),
    status: appointmentStatusEnum('status').default('SCHEDULED').notNull(),
    purpose: text('purpose'),
    appointmentDateTime: timestamp('appointment_date_time').notNull(),
    isWalkIn: boolean('is_walk_in').default(false).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdateFn(() => new Date()).notNull(),
});

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

export const clients = pgTable('clients', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    middleName: varchar('middle_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    phone: varchar('phone').notNull().unique(),
    address: text('address'),
    passportNumber: varchar('passport_number', { length: 255 }).unique(),
    currentVisa: visaTypeEnum('current_visa'),
    visaExpiry: timestamp('visa_expiry'),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdateFn(() => new Date()).notNull(),
}, (table) => [
    index('clients_email_idx').on(table.email),
    index('clients_phone_idx').on(table.phone),
    index('clients_passport_idx').on(table.passportNumber)
]);


export const officeVisits = pgTable('office_visits', {
    id: uuid('id').primaryKey().defaultRandom(),
    clientId: uuid('client_id').references(() => clients.id).notNull(),
    agentId: uuid('agent_id').references(() => users.id),
    dateTime: timestamp('date_time').notNull(),
    appointmentId: uuid('appointment_id').references(() => appointments.id),
    status: officeVisitStatus('status').default('WAITING').notNull(),
    purpose: text('purpose'),
    isScheduled: boolean('is_scheduled').default(false).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdateFn(() => new Date()).notNull(),
});

export const tasks = pgTable('tasks', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),

    // Assignee and Creator
    assignedToId: uuid('assigned_to_id').references(() => users.id),
    createdById: uuid('created_by_id').references(() => users.id).notNull(),

    clientId: uuid('client_id').references(() => clients.id),
    appointmentId: uuid('appointment_id').references(() => appointments.id),
    officeVisitId: uuid('office_visit_id').references(() => officeVisits.id),

    // Task Metadata
    status: taskStatusEnum('status').default('PENDING').notNull(),
    priority: taskPriorityEnum('priority').default('MEDIUM').notNull(),
    type: taskTypeEnum('type').notNull(),

    // Tracking and Deadlines
    dueDate: timestamp('due_date'),
    completedAt: timestamp('completed_at'),

    // Additional Tracking
    isUrgent: boolean('is_urgent').default(false).notNull(),
    estimatedWorkHours: integer('estimated_work_hours'),

    // Timestamps
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .$onUpdateFn(() => new Date())
        .notNull(),
});

export const taskComments = pgTable('task_comments', {
    id: uuid('id').primaryKey().defaultRandom(),
    taskId: uuid('task_id').references(() => tasks.id).notNull(),
    commentById: uuid('comment_by_id').references(() => users.id).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
    id: varchar('id').primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
},
    (table) => [
        index("sessions_user_id_idx").on(table.userId),
    ]);



//Relations

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

export const clientsRelations = relations(clients, ({ many }) => ({
    appointments: many(appointments), // One client can have many appointments
    officeVisits: many(officeVisits), // One client can have many office visits
    clientAssignments: many(clientAssignments), // One client can have many assignments to different agents

    // New relation
    tasks: many(tasks) // Tasks associated with this client
}));

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

export const taskCommentsRelations = relations(taskComments, ({ one }) => ({
    task: one(tasks, {
        fields: [taskComments.taskId],
        references: [tasks.id]
    }),
    commentBy: one(users, {
        fields: [taskComments.commentById],
        references: [users.id]
    })
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
    assignedTo: one(users, {
        fields: [tasks.assignedToId],
        references: [users.id],
        relationName: "assignedTo"
    }),
    createdBy: one(users, {
        fields: [tasks.createdById],
        references: [users.id],
        relationName: "createdBy"
    }),
    client: one(clients, {
        fields: [tasks.clientId],
        references: [clients.id]
    }),
    appointment: one(appointments, {
        fields: [tasks.appointmentId],
        references: [appointments.id]
    }),
    officeVisit: one(officeVisits, {
        fields: [tasks.officeVisitId],
        references: [officeVisits.id]
    }),
    comments: many(taskComments)
}));

export const usersRelations = relations(users, ({ many }) => ({
    appointments: many(appointments), // One user (agent) can have many appointments
    officeVisits: many(officeVisits),  // One user (agent) can have many office visits

    assignedAgent: many(clientAssignments, {
        relationName: 'assignedAgent'
    }),
    assignedBy: many(clientAssignments, {
        relationName: 'assignedByUser'
    }),
    // New task-related relations
    assignedTo: many(tasks, {
        relationName: 'assignedTo' // Tasks assigned to this user
    }),
    taskCreatedBy: many(tasks, {
        relationName: 'createdBy' // Tasks created by this user
    }),
    taskComments: many(taskComments), // Comments made by this user
    sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions,
    ({ one }) => ({
        users: one(users, {
            fields: [sessions.userId],
            references: [users.id]
        })
    }))