import { db } from "@/app/lib/db";
import { customersTable } from "@/app/lib/db/schema";
import initialDB from "@/app/lib/placeholder-data";
import { NextResponse } from "next/server";
export const runtime = 'edge';
export async function POST() {
  const customers = initialDB.customers;

  try {
    for (const customer of customers) {
      await db.insert(customersTable).values({
        id: customer.id,
        email: customer.email,
        name: customer.name,
        image_url: customer.image_url,
      });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error al enviar customers", error);
    if (error instanceof Error) {
      return NextResponse.json({ ok: false, error: error.message });
    } else {
      return NextResponse.json({
        ok: false,
        error: "Error al enviar customers",
      });
    }
  }
}
