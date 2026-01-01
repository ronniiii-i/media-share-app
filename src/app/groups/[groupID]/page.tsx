import { db } from "@/server/db";
import UploadZone from "./UploadZone";
import MediaGallery from "./MediaGallery";
import InviteButton from "./InviteButton";
import UploadSection from "./UploadSection";

import Link from "next/link";

export default async function GroupDetailsPage({
  params,
}: {
  params: { groupID: string };
}) {
  const media = await db.media.findMany({
    where: { groupId: params.groupID },
    orderBy: { createdAt: "desc" },
  });
  const serializedMedia = media.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));
  const group = await db.group.findUnique({
    where: { id: params.groupID },
  });
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
          <UploadSection groupId={params.groupID} />
        </div>
      </div>

      <div className="mt-4 mb-8 flex items-center gap-4">
        <h1 className="text-4xl font-bold">{group?.name}</h1>
      </div>

      <MediaGallery media={serializedMedia} groupId={params.groupID} />
    </main>
  );
}
