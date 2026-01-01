import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function JoinPage({
  params,
}: {
  params: { inviteCode: string };
}) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const group = await db.group.findUnique({
    where: { inviteCode: params.inviteCode },
  });

  if (!group) return <div>Invite link invalid or expired.</div>;

  const existingMember = await db.groupMember.findFirst({
    where: {
      groupId: group.id,
      userId: session.user.id,
    },
  });

  if (!existingMember) {
    await db.groupMember.create({
      data: {
        groupId: group.id,
        userId: session.user.id,
      },
    });
  }

  redirect(`/groups/${group.id}`);
}
