'use server'
import { desc } from "drizzle-orm";
import { db } from "../db";
import { messagesTable } from "../db/schema";

export async function getMessages() {
  const response = await db
    .select()
    .from(messagesTable)
    .orderBy(desc(messagesTable.id))
    .limit(5);

  return response;
}
