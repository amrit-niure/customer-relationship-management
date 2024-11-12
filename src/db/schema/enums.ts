import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["ADMIN", "USER"]);
export const appointmentStatusEnum = pgEnum("status", [
  "CONFIRMED",
  "CANCELLED",
  "VISITED",
]);
export const overseerEnum = pgEnum("overseer", ["DEEPAK", "GANESH"]);
export const statusEnum = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);
export const sbsStatusEnum = pgEnum("sbs_status", [
  "PENDING",
  "APPROVED",
  "NOT APPROVED",
]);
export const branchEnum = pgEnum("branch", [
  "AUSTRALIA",
  "NEPAL",
  "DUBAI",
  "PHILIPPINES",
]);
export const userStatusEnum = pgEnum("user_status", ["ACTIVE", "INACTIVE"]);
export const visaTypeEnum = pgEnum("visa_type", [
  "SUB_500",
  "SUB_482",
  "SUB_407",
  "SUB_186",
  "SUB_189",
  "SUB_190",
  "SUB_600",
  "SUB_820",
  "SUB_801",
]);
export const jrpStageEnum = pgEnum("jrp_stage", [
  "JRPRE",
  "JRE",
  "JRWA",
  "JRFA",
]);
export const saStatusEnum = pgEnum("sa_status", [
  "SUBMITTED",
  "UNDER_ASSESSMENT",
  "ADDITIONAL_INFO_REQUIRED",
  "COMPLETED",
  "APPEALED",
]);
export const saTypeEnum = pgEnum("sa_type", [
  "SKILLS_ASSESSMENT",
  "QUALIFICATION_ASSESSMENT",
  "PROVISIONAL_SKILLS_ASSESSMENT",
]);
export const outcomeEnum = pgEnum("outcome", [
  "SUCCESSFUL",
  "UNSUCCESSFUL",
  "PENDING",
]);
