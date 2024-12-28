ALTER TABLE "client_assignments" DROP CONSTRAINT "client_assignments_agent_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "client_assignments" DROP CONSTRAINT "client_assignments_assigned_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "client_assignments" DROP CONSTRAINT "client_assignments_client_id_clients_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client_assignments" ADD CONSTRAINT "client_assignments_agent_id_users_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client_assignments" ADD CONSTRAINT "client_assignments_assigned_by_users_id_fk" FOREIGN KEY ("assigned_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client_assignments" ADD CONSTRAINT "client_assignments_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
