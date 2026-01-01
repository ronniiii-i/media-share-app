"use server";

import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { revalidatePath } from "next/cache";

export async function deleteMedia(mediaId: string, groupId: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const membership = await db.groupMember.findFirst({
    where: {
      groupId: groupId,
      userId: session?.user.id,
    },
  });

  if (!membership) {
    throw new Error("You must be a member of the group to delete media.");
  }

  await db.media.delete({
    where: {
      id: mediaId,
    },
  });

  revalidatePath(`/groups/${groupId}`);
}
