import { integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { sbsStatusEnum } from "./enums";

export const company = pgTable("company",{
    id: uuid('id').primaryKey().defaultRandom(),
    tradingName: varchar('trading_name', {length: 256}).notNull(),
    name: varchar('name', {length: 56}),
    director: varchar('director', {length: 56}).notNull(),
    email: varchar('email', {length: 256}).notNull().unique(),
    phone: varchar('phone', {length: 10}).notNull().unique(),
    abn: integer('abn').notNull().unique(),
    address: text('address').notNull(),
    website: varchar('website', {length: 256}),
    sbsStatus:sbsStatusEnum('sbs_status').default('NOT APPROVED').notNull(),
    associatedClients: integer('associated_clients'),
})