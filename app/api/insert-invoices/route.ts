import { db } from "@/app/lib/db";
import initialDB from "../../lib/placeholder-data";
import { invoicesTable } from "@/app/lib/db/schema";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
export const runtime = 'edge';
export async function POST() {
  const invoices = initialDB.invoices;
  try {
    for (const invoice of invoices) {
      const invoicesNewUUID: string = uuidv4();
      await db.insert(invoicesTable).values({
        id: invoicesNewUUID,
        customer_id: invoice.customer_id,
        amount: invoice.amount,
        status: invoice.status,
        date: invoice.date,
      });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error al enviar invoices", error);
    if (error instanceof Error) {
      return NextResponse.json({ ok: false, error: error.message });
    } else {
      return NextResponse.json({
        ok: false,
        error: "Error al enviar invoices",
      });
    }
  }
}
