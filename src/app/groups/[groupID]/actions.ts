"use server";

import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { revalidatePath } from "next/cache";

export async function deleteMedia(mediaId: string, groupId: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  
  await db.media.delete({
    where: {
      id: mediaId,
    },
  });

  revalidatePath(`/groups/${groupId}`);
}
