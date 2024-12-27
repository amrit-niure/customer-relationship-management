import * as argon from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { 
    users, 
    clients, 
    appointments, 
    clientAssignments, 
    officeVisits, 
    tasks, 
    taskComments,
} from "./schema";
import { 
    roleEnum, 
    userStatusEnum, 
    branchEnum,
    visaTypeEnum,
    appointmentStatusEnum,
    officeVisitStatus,
    taskStatusEnum,
    taskPriorityEnum,
    taskTypeEnum,
    clientAssignmentStatusEnum
} from "./schema/enums";
import "dotenv/config";
import pg from "pg";
import { faker } from "@faker-js/faker";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "Database URL not found. Please set DATABASE_URL in your environment variables.",
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

// Function to generate a unique email
const generateUniqueEmail = async () => {
    let email: string = "";
    let isUnique = false;

    while (!isUnique) {
        email = faker.internet.email();
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingUser.length === 0) {
            isUnique = true;
        }
    }

    return email;
};

async function _seedAdmin() {

  const existingAdmin = await db
    .select()
    .from(users)
    .where(eq(users.role, "ADMIN"))
    .limit(1);

  if (existingAdmin.length === 0) {
    if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_EMAIL) {
      throw new Error(
        "Admin credentials not found. Please set both ADMIN_EMAIL and ADMIN_PASSWORD in your environment variables.",
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL;
    const hashedPassword = await argon.hash(adminPassword);

    // Insert the admin user
    await db.insert(users).values({
      firstName: "Amrit",
      lastName: "Niure",
      email: adminEmail,
      hashedPassword: hashedPassword,
      address: "104 Bathurst Street, Sydney NSW 2000, Australia",
      phoneNumber: "+61424562124",
      title: "IT Administrator",
      role: "ADMIN",
      status: "ACTIVE",
    });

    console.log("Admin user created successfully");
  } else {
    console.log("Admin user already exists");
  }
}
async function _seedUsers() {
    const existingUsers = await db.select().from(users);
    
    if (existingUsers.length > 1) return; // Skip if users already exist (except admin)

    const userRoles: typeof roleEnum.enumValues = ['ADMIN', 'MANAGER', 'AGENT', 'MIGRTATION_AGENT','USER'];
    const branches: typeof branchEnum.enumValues = ['AUSTRALIA', 'PHILIPPINES', 'DUBAI', 'NEPAL'];
    const userStatuses: typeof userStatusEnum.enumValues = ['ACTIVE', 'INACTIVE', 'SUSPENDED'];

    const usersToInsert = await Promise.all(
        Array.from({ length: 5 }).map(async () => {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const hashedPassword = await argon.hash('Password123!');

            return {
                firstName,
                lastName,
                email: await generateUniqueEmail(),
                hashedPassword,
                phoneNumber: faker.phone.number({ style: 'international'}),
                role: faker.helpers.arrayElement(userRoles),
                branch: faker.helpers.arrayElement(branches),
                title: faker.person.jobTitle(),
                address: faker.location.streetAddress(),
                status: faker.helpers.arrayElement(userStatuses)
            };
        })
    );

    await db.insert(users).values(usersToInsert);
}

async function _seedClients() {
    const existingClients = await db.select().from(clients);
    
    if (existingClients.length >= 5) return;

    const visaTypes: typeof visaTypeEnum.enumValues = [
        "SUB_500", "SUB_482", "SUB_485", "SUB_407", 
        "SUB_186", "SUB_189", "SUB_190", "SUB_600", 
        "SUB_820", "SUB_801"
    ];

    const clientsToInsert = Array.from({ length: 5 }).map(() => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number({ style: 'international' }),
        address: faker.location.streetAddress(),
        passportNumber: faker.string.alphanumeric(10).toUpperCase(),
        currentVisa: faker.helpers.arrayElement(visaTypes),
        visaExpiry: faker.date.future(),
        isActive: true
    }));

    await db.insert(clients).values(clientsToInsert);
}

async function _seedAppointments() {
    const existingClients = await db.select({ id: clients.id }).from(clients);
    const existingUsers = await db.select({ id: users.id }).from(users);

    if (existingClients.length === 0 || existingUsers.length === 0) return;

    const appointmentStatuses: typeof appointmentStatusEnum.enumValues = [
        'SCHEDULED', 'COMPLETED', 'CANCELLED', 'EXPIRED'
    ];

    const appointmentsToInsert = Array.from({ length: 5 }).map(() => ({
        clientId: faker.helpers.arrayElement(existingClients).id,
        agentId: faker.helpers.arrayElement(existingUsers).id,
        status: faker.helpers.arrayElement(appointmentStatuses),
        purpose: faker.lorem.sentence(),
        appointmentDateTime: faker.date.future().toISOString(),
        isWalkIn: faker.datatype.boolean()
    }));

    await db.insert(appointments).values(appointmentsToInsert);
}

async function _seedClientAssignments() {
    const existingClients = await db.select({ id: clients.id }).from(clients);
    const existingUsers = await db.select({ id: users.id }).from(users);

    if (existingClients.length === 0 || existingUsers.length === 0) return;

    const assignmentStatuses: typeof clientAssignmentStatusEnum.enumValues = [
        'ACTIVE', 'PENDING', 'INACTIVE'
    ];

    const assignmentsToInsert = Array.from({ length: 5 }).map(() => ({
        agentId: faker.helpers.arrayElement(existingUsers).id,
        assignedBy: faker.helpers.arrayElement(existingUsers).id,
        clientId: faker.helpers.arrayElement(existingClients).id,
        status: faker.helpers.arrayElement(assignmentStatuses),
        primaryContact: faker.datatype.boolean()
    }));

    await db.insert(clientAssignments).values(assignmentsToInsert);
}

async function _seedOfficeVisits() {
    const existingClients = await db.select({ id: clients.id }).from(clients);
    const existingUsers = await db.select({ id: users.id }).from(users);
    const existingAppointments = await db.select({ id: appointments.id }).from(appointments);

    if (existingClients.length === 0 || existingUsers.length === 0) return;

    const officeVisitStatuses: typeof officeVisitStatus.enumValues = [
        'WAITING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'
    ];

    const officeVisitsToInsert = Array.from({ length: 5 }).map(() => ({
        clientId: faker.helpers.arrayElement(existingClients).id,
        agentId: faker.helpers.arrayElement(existingUsers).id,
        dateTime: faker.date.past(),
        appointmentId: existingAppointments.length > 0 
            ? faker.helpers.arrayElement(existingAppointments).id 
            : null,
        status: faker.helpers.arrayElement(officeVisitStatuses),
        purpose: faker.lorem.sentence(),
        isScheduled: faker.datatype.boolean()
    }));

    await db.insert(officeVisits).values(officeVisitsToInsert);
}

async function _seedTasks() {
    const existingClients = await db.select({ id: clients.id }).from(clients);
    const existingUsers = await db.select({ id: users.id }).from(users);
    const existingAppointments = await db.select({ id: appointments.id }).from(appointments);
    const existingOfficeVisits = await db.select({ id: officeVisits.id }).from(officeVisits);

    if (existingClients.length === 0 || existingUsers.length === 0) return;

    const taskStatuses: typeof taskStatusEnum.enumValues = [
        'PENDING', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED', 'CANCELLED'
    ];
    const taskPriorities: typeof taskPriorityEnum.enumValues = [
        'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
    ];
    const taskTypes: typeof taskTypeEnum.enumValues = [
        'CLIENT_FOLLOW_UP', 'DOCUMENT_PREPARATION', 'VISA_APPLICATION_REVIEW', 
        'CONSULTATION_PREP', 'INTERNAL_ADMIN', 'COMMUNICATION', 'MARKETING', 'OTHER'
    ];

    const tasksToInsert = Array.from({ length: 5 }).map(() => ({
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        assignedToId: faker.helpers.arrayElement(existingUsers).id,
        createdById: faker.helpers.arrayElement(existingUsers).id,
        clientId: faker.helpers.arrayElement(existingClients).id,
        appointmentId: existingAppointments.length > 0 
            ? faker.helpers.arrayElement(existingAppointments).id 
            : null,
        officeVisitId: existingOfficeVisits.length > 0 
            ? faker.helpers.arrayElement(existingOfficeVisits).id 
            : null,
        status: faker.helpers.arrayElement(taskStatuses),
        priority: faker.helpers.arrayElement(taskPriorities),
        type: faker.helpers.arrayElement(taskTypes),
        dueDate: faker.date.future(),
        isUrgent: faker.datatype.boolean(),
        estimatedWorkHours: faker.number.int({ min: 1, max: 8 })
    }));

    await db.insert(tasks).values(tasksToInsert);
}

async function _seedTaskComments() {
    const existingTasks = await db.select({ id: tasks.id }).from(tasks);
    const existingUsers = await db.select({ id: users.id }).from(users);

    if (existingTasks.length === 0 || existingUsers.length === 0) return;

    const commentsToInsert = Array.from({ length: 5 }).map(() => ({
        taskId: faker.helpers.arrayElement(existingTasks).id,
        commentById: faker.helpers.arrayElement(existingUsers).id,
        content: faker.lorem.paragraph()
    }));

    await db.insert(taskComments).values(commentsToInsert);
}

async function main() {
    const startTime = Date.now();
    console.log("Seeding Started...");

    await _seedAdmin();
    await _seedUsers();
    await _seedClients();
    await _seedAppointments();
    await _seedClientAssignments();
    await _seedOfficeVisits();
    await _seedTasks();
    await _seedTaskComments();

    const endTime = Date.now();
    const durationInMs = endTime - startTime;
    console.log(`Data seeded successfully in ${durationInMs} ms.`);
    process.exit(0);
}

main().catch((err) => {
    console.error("Error seeding database:", err);
    process.exit(1);
});