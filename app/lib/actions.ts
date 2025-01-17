"use server";

import { z } from "zod";
import { db } from "./db";
import { invoicesTable } from "./db/schema";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { CreateInvoiceState } from "./definitions";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(
  prevState: CreateInvoiceState,
  formData: FormData
): Promise<CreateInvoiceState> {
  // Validado por zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: parseFloat(formData.get("amount") as string),
    status: formData.get("status"),
  });

  // Validando la respuesta de safeParse
  if (!validatedFields.success) {
    return {
      message: null,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Preparando data para inserción
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    const invoicesNewUUID: string = uuidv4();

    await db
      .insert(invoicesTable)
      .values({
        id: invoicesNewUUID,
        customer_id: customerId,
        amount: amountInCents,
        status,
        date,
      })
      .execute();
    revalidatePath("/");
  } catch (error) {
    return { message: "No se creó la factura", errors: {} };
  }
  redirect("/");
}
