"use server";

import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { revalidatePath } from "next/cache";

export async function createGroup(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to create a group");
  }

  const name = formData.get("groupName") as string;
  const userId = session.user.id;

  await db.group.create({
    data: {
      name: name,
      ownerId: userId,
      members: {
        create: {
          userId: userId,
        },
      },
    },
  });

  revalidatePath("/groups");
}
