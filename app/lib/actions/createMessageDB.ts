"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { messagesTable } from "../db/schema";

export async function createMessage(formData: FormData) {
  // console.log(formData);
  try {
    const newMessage = formData.get("message");
    if (typeof newMessage !== "string") {
      throw new Error("Invalid message, NO ES STRING");
    }
    await db.insert(messagesTable).values({ message: newMessage });
    revalidatePath("/");
  } catch (error) {
    return {
      ok: false,
    };
  }
  return {
    ok: true,
  };
}
