ALTER TABLE "office_visits" DROP CONSTRAINT "office_visits_client_id_clients_id_fk";
--> statement-breakpoint
ALTER TABLE "office_visits" DROP CONSTRAINT "office_visits_agent_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "office_visits" ADD CONSTRAINT "office_visits_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "office_visits" ADD CONSTRAINT "office_visits_agent_id_users_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
