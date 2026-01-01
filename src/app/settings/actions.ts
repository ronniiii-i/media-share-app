"use server";

import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export async function deleteAccount() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  
  await db.user.delete({
    where: { id: session.user.id },
  });

  redirect("/");
}
