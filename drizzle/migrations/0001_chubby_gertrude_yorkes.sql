ALTER TABLE "reset_tokens" DROP CONSTRAINT "reset_tokens_code_unique";--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "expires_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "reset_tokens" ADD COLUMN "token" text;--> statement-breakpoint
ALTER TABLE "reset_tokens" ADD COLUMN "token_expires_at" timestamp NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reset_tokens_token_idx" ON "reset_tokens" USING btree ("token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_user_id_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
ALTER TABLE "reset_tokens" DROP COLUMN IF EXISTS "code";--> statement-breakpoint
ALTER TABLE "reset_tokens" DROP COLUMN IF EXISTS "expires_at";--> statement-breakpoint
ALTER TABLE "reset_tokens" ADD CONSTRAINT "reset_tokens_token_unique" UNIQUE("token");