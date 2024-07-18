"use server";

import { asc } from "drizzle-orm";
import { db } from "./db";
import { customersTable } from "./db/schema";

export async function fetchCustomers() {
  try {
    const data = await db
      .select({ id: customersTable.id, name: customersTable.name })
      .from(customersTable)
      .orderBy(asc(customersTable.name));
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all customers.");
  }
}
