import { db } from "@/server/db";
import { auth } from "@/server/auth";

import SettingsModal from "./SettingsModal";

import MediaGallery from "./MediaGallery";
import InviteButton from "./InviteButton";
import UploadSection from "./UploadSection";

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function GroupDetailsPage({
  params,
}: {
  params: { groupID: string };
}) {

  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const membership = await db.groupMember.findFirst({
    where: {
      groupId: params.groupID,
      userId: session?.user.id,
    },
  });

  const group = await db.group.findUnique({
    where: { id: params.groupID },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!membership && group?.ownerId !== session?.user.id) {
    redirect("/groups?error=not-a-member");
  }

  const media = await db.media.findMany({
    where: { groupId: params.groupID },
    orderBy: { createdAt: "desc" },
  });
  const serializedMedia = media.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));

  if (!group) {
    return <div>Group not found</div>;
  }
  const isOwner = group?.ownerId === session?.user.id;

  const transformedGroup = group
    ? {
        id: group.id,
        name: group.name,
        ownerId: group.ownerId,
        members: group.members
          .filter((m) => m.user.name !== null)
          .map((m) => ({
            userId: m.userId,
            user: { name: m.user.name! },
          })),
      }
    : null;

  return (
    <main className="flex w-full flex-col items-center justify-start">
      <div className="flex w-full items-center justify-between">
        <Link
          href="/groups"
          className="text-sm font-semibold text-[hsl(280,100%,70%)] hover:underline"
        >
          ← Back to My Groups
        </Link>
        <div className="flex items-center gap-4">
          <InviteButton inviteCode={group?.inviteCode ?? ""} />
          <UploadSection groupId={params.groupID} />{" "}
          {transformedGroup && (
            <SettingsModal group={transformedGroup} isOwner={isOwner} />
          )}
        </div>
      </div>

      <div className="mt-4 mb-8 flex items-center gap-4">
        <h1 className="text-4xl font-bold">{group?.name}</h1>
      </div>

      <MediaGallery media={serializedMedia} groupId={params.groupID} />
    </main>
  );
}
