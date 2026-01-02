import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function JoinPage({
  params,
}: {
  params: Promise<{ inviteCode: string }>;
}) {
  const { inviteCode } = await params;

  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const group = await db.group.findUnique({
    where: { inviteCode: inviteCode },
  });

  if (!group)
    return (
      <div className="text-muted-foreground p-8 text-center">
        Invite link invalid or expired.
      </div>
    );

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
