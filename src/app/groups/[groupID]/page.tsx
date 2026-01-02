import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { type Metadata } from "next";

import SettingsModal from "./SettingsModal";

import MediaGallery from "./MediaGallery";
import InviteButton from "./InviteButton";
import UploadSection from "./UploadSection";

import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ groupID: string }> }): Promise<Metadata> {
  const { groupID } = await params;
  const group = await db.group.findUnique({ where: { id: groupID } });

  return {
    title: group ? `${group.name} Vault` : "Vault Details",
  };
}

export default async function GroupDetailsPage({
  params,
}: {
  params: Promise<{ groupID: string }>;
}) {
  const resolvedParams = await params;
  const { groupID } = resolvedParams;

  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const membership = await db.groupMember.findFirst({
    where: {
      groupId: groupID,
      userId: session?.user.id,
    },
  });

  const group = await db.group.findUnique({
    where: { id: groupID },
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
    where: { groupId: groupID },
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
    <main className="bg-background text-foreground flex w-full flex-col items-center justify-start p-8">
      <div className="flex w-full max-w-7xl items-center justify-between">
        <Link
          href="/groups"
          className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
        >
          ← Back to My Groups
        </Link>
        <div className="flex items-center gap-3">
          <InviteButton inviteCode={group?.inviteCode ?? ""} />
          <UploadSection groupId={groupID} />
          {transformedGroup && (
            <SettingsModal group={transformedGroup} isOwner={isOwner} />
          )}
        </div>
      </div>

      <div className="mt-8 mb-12 w-full max-w-7xl text-left">
        <h1 className="text-5xl font-bold tracking-tight">{group?.name}</h1>
        <p className="text-muted-foreground mt-2">Vault Storage</p>
      </div>

      <div className="w-full max-w-7xl">
        <MediaGallery media={serializedMedia} groupId={groupID} />
      </div>
    </main>
  );
}
