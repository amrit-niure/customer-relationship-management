ALTER TABLE "customers" RENAME TO "clients";--> statement-breakpoint
ALTER TABLE "clients" DROP CONSTRAINT "customers_email_unique";--> statement-breakpoint
ALTER TABLE "clients" DROP CONSTRAINT "customers_phone_unique";--> statement-breakpoint
ALTER TABLE "clients" DROP CONSTRAINT "customers_passport_number_unique";--> statement-breakpoint
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_client_id_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "client_assignments" DROP CONSTRAINT "client_assignments_client_id_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "office_visits" DROP CONSTRAINT "office_visits_client_id_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_client_id_customers_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointments" ADD CONSTRAINT "appointments_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client_assignments" ADD CONSTRAINT "client_assignments_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "office_visits" ADD CONSTRAINT "office_visits_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_phone_unique" UNIQUE("phone");--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_passport_number_unique" UNIQUE("passport_number");