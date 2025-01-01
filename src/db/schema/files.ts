import { integer, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { clients } from "./clients";
import { relations } from "drizzle-orm";

export const files = pgTable("files", {
  id: uuid('id').primaryKey().defaultRandom(),
  documentId: varchar("document_id", { length: 255 }),
  clientId: uuid("client_id").references(() => clients.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }),
  webUrl: text("web_url"),
  mimeType: text("mime_type"),
  downloadUrl: text("download_url"),
  size: integer("size"),
  uploadedAt: timestamp('uploaded_at', { mode: 'date' }).defaultNow().notNull(),
});

export const filesRelation = relations(files, ({ one }) => ({
  client: one(clients, {
    fields: [files.clientId],
    references: [clients.id],
    relationName: "clientFiles"
  })
}));

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert; 