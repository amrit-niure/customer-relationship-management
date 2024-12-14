import { pgEnum } from "drizzle-orm/pg-core";

// User Enums
export const roleEnum = pgEnum('user_role', [
  'ADMIN', 
  'MANAGER', 
  'AGENT',
  'MIGRTATION_AGENT', 
  'USER'
]);

export const userStatusEnum = pgEnum('user_status', [
  'ACTIVE', 
  'INACTIVE', 
  'SUSPENDED'
]);

export const branchEnum = pgEnum('branch', [
  'AUSTRALIA', 
  'PHILIPPINES', 
  'DUBAI', 
  'NEPAL'
]);

// Client Enums
export const visaTypeEnum = pgEnum('visa_type', [
    "SUB_500",
    "SUB_482",
    "SUB_485",
    "SUB_407",
    "SUB_186",
    "SUB_189",
    "SUB_190",
    "SUB_600",
    "SUB_820",
    "SUB_801",
]);

// Appointment Enums
export const appointmentStatusEnum = pgEnum('appointment_status', [
  'SCHEDULED', 
  'CONFIRMED', 
  'COMPLETED', 
  'CANCELLED'
]);

// Office Visit Enums
export const officeVisitStatus = pgEnum('office_visit_status', [
  'WAITING', 
  'IN_PROGRESS', 
  'COMPLETED', 
  'CANCELLED'
]);

// Task Enums
export const taskStatusEnum = pgEnum('task_status', [
  'PENDING',
  'IN_PROGRESS', 
  'BLOCKED', 
  'COMPLETED', 
  'CANCELLED'
]);

export const taskPriorityEnum = pgEnum('task_priority', [
  'LOW', 
  'MEDIUM', 
  'HIGH', 
  'CRITICAL'
]);

export const taskTypeEnum = pgEnum('task_type', [
  'CLIENT_FOLLOW_UP',
  'DOCUMENT_PREPARATION',
  'VISA_APPLICATION_REVIEW',
  'CONSULTATION_PREP',
  'INTERNAL_ADMIN',
  'COMMUNICATION',
  'OTHER'
]);

// Client Assignment Enums
export const clientAssignmentStatusEnum = pgEnum('client_assignment_status', [
  'ACTIVE', 
  'PENDING', 
  'INACTIVE'
]);