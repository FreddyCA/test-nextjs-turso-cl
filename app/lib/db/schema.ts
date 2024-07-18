import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const messagesTable = sqliteTable("messages", {
  id: integer("id").primaryKey(),
  message: text("message").notNull(),
});

export const invoicesTable = sqliteTable("invoices", {
  id: text("id").primaryKey(),
  customer_id: text("customer_id").notNull(),
  amount: integer("amount").notNull(),
  status: text("status").notNull(),
  date: text("date").notNull(),
});

export const customersTable = sqliteTable("customers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  image_url: text("image_url").notNull(),
});