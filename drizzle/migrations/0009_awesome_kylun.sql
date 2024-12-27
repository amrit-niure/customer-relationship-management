ALTER TABLE "office_visits" DROP CONSTRAINT "office_visits_appointment_id_appointments_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "office_visits" ADD CONSTRAINT "office_visits_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
