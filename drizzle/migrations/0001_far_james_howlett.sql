ALTER TABLE "tasks" ADD COLUMN "office_visit_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_office_visit_id_office_visits_id_fk" FOREIGN KEY ("office_visit_id") REFERENCES "public"."office_visits"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
