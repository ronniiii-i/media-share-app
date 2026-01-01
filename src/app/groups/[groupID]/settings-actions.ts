"use server";

import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function leaveGroup(groupId: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await db.groupMember.deleteMany({
    where: { groupId, userId: session.user.id },
  });

  redirect("/groups");
}

export async function deleteGroup(groupId: string) {
  const session = await auth();
  const group = await db.group.findUnique({ where: { id: groupId } });

  if (group?.ownerId !== session?.user.id)
    throw new Error("Only owners can delete");

  await db.group.delete({ where: { id: groupId } });
  redirect("/groups");
}

export async function renameGroup(groupId: string, newName: string) {
  const session = await auth();
  const group = await db.group.findUnique({ where: { id: groupId } });

  if (group?.ownerId !== session?.user.id)
    throw new Error("Only owners can rename");

  await db.group.update({
    where: { id: groupId },
    data: { name: newName },
  });

  revalidatePath(`/groups/${groupId}`);
}

export async function removeMember(groupId: string, targetUserId: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const group = await db.group.findUnique({
    where: { id: groupId },
  });

  if (group?.ownerId !== session.user.id) {
    throw new Error("Only the group owner can remove members.");
  }

  if (targetUserId === group.ownerId) {
    throw new Error("You cannot remove yourself as owner.");
  }

  await db.groupMember.deleteMany({
    where: {
      groupId: groupId,
      userId: targetUserId,
    },
  });

  revalidatePath(`/groups/${groupId}`);
}
