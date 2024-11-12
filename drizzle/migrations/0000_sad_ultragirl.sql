CREATE TYPE "public"."status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."branch" AS ENUM('AUSTRALIA', 'NEPAL', 'DUBAI', 'PHILIPPINES');--> statement-breakpoint
CREATE TYPE "public"."jrp_stage" AS ENUM('JRPRE', 'JRE', 'JRWA', 'JRFA');--> statement-breakpoint
CREATE TYPE "public"."outcome" AS ENUM('SUCCESSFUL', 'UNSUCCESSFUL', 'PENDING');--> statement-breakpoint
CREATE TYPE "public"."overseer" AS ENUM('DEEPAK', 'GANESH');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
CREATE TYPE "public"."sa_status" AS ENUM('SUBMITTED', 'UNDER_ASSESSMENT', 'ADDITIONAL_INFO_REQUIRED', 'COMPLETED', 'APPEALED');--> statement-breakpoint
CREATE TYPE "public"."sa_type" AS ENUM('SKILLS_ASSESSMENT', 'QUALIFICATION_ASSESSMENT', 'PROVISIONAL_SKILLS_ASSESSMENT');--> statement-breakpoint
CREATE TYPE "public"."sbs_status" AS ENUM('PENDING', 'APPROVED', 'NOT APPROVED');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "public"."visa_type" AS ENUM('SUB_500', 'SUB_482', 'SUB_407', 'SUB_186', 'SUB_189', 'SUB_190', 'SUB_600', 'SUB_820', 'SUB_801');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trading_name" varchar(256) NOT NULL,
	"name" varchar(56),
	"director" varchar(56) NOT NULL,
	"email" varchar(256) NOT NULL,
	"phone" varchar(10) NOT NULL,
	"abn" integer NOT NULL,
	"address" text NOT NULL,
	"website" varchar(256),
	"sbs_status" "sbs_status" DEFAULT 'NOT APPROVED' NOT NULL,
	"associated_clients" integer,
	CONSTRAINT "company_email_unique" UNIQUE("email"),
	CONSTRAINT "company_phone_unique" UNIQUE("phone"),
	CONSTRAINT "company_abn_unique" UNIQUE("abn")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar NOT NULL,
	"middle_name" varchar,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"address" text NOT NULL,
	"passport_number" varchar,
	"current_visa" "visa_type",
	"visa_expiry" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "customers_email_unique" UNIQUE("email"),
	CONSTRAINT "customers_phone_unique" UNIQUE("phone"),
	CONSTRAINT "customers_passport_number_unique" UNIQUE("passport_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reset_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar NOT NULL,
	"expires_at" timestamp NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "reset_tokens_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"middle_name" varchar(255),
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"hashed_password" varchar NOT NULL,
	"role" "role" DEFAULT 'USER' NOT NULL,
	"title" varchar(255) NOT NULL,
	"phone_number" numeric NOT NULL,
	"branch" "branch" DEFAULT 'AUSTRALIA',
	"address" varchar(256) NOT NULL,
	"status" "user_status" DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "visa_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar NOT NULL,
	"middle_name" varchar,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"address" text NOT NULL,
	"passport_number" varchar NOT NULL,
	"visa_applied_date" timestamp DEFAULT now() NOT NULL,
	"visa_status" "status" NOT NULL,
	"previous_visa" "visa_type" NOT NULL,
	"visa_type" "visa_type" NOT NULL,
	"total_amount" real DEFAULT 0 NOT NULL,
	"total_paid" real DEFAULT 0 NOT NULL,
	"overseer" "overseer",
	"customer_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "visa_applications_email_unique" UNIQUE("email"),
	CONSTRAINT "visa_applications_passport_number_unique" UNIQUE("passport_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_ready_programs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" uuid NOT NULL,
	"program_type" varchar NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"stage" "jrp_stage" NOT NULL,
	"workplacement" varchar,
	"employer_name" varchar,
	"employer_abn" varchar,
	"supervisor_name" varchar,
	"supervisor_contact" varchar,
	"completion_date" timestamp,
	"outcome" "outcome" DEFAULT 'PENDING',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skills_assessments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" uuid NOT NULL,
	"occupation" varchar NOT NULL,
	"assessing_authority" varchar NOT NULL,
	"application_date" timestamp NOT NULL,
	"status" "sa_status" NOT NULL,
	"outcome_received" boolean DEFAULT false NOT NULL,
	"outcome_date" timestamp,
	"outcome" "outcome" DEFAULT 'PENDING',
	"appeal_submitted" boolean DEFAULT false NOT NULL,
	"appeal_date" timestamp,
	"appeal_outcome" "outcome",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reset_tokens" ADD CONSTRAINT "reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "visa_applications" ADD CONSTRAINT "visa_applications_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_ready_programs" ADD CONSTRAINT "job_ready_programs_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skills_assessments" ADD CONSTRAINT "skills_assessments_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
