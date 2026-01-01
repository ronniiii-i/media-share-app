import { db } from "@/server/db";
import Image from "next/image";
import UploadZone from "./UploadZone";
import MediaGallery from "./MediaGallery";
import DeleteButton from "./DeleteButton";

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
  return (
    <main className="flex flex-col items-center justify-start">
      <div className="w-full max-w-5xl">
        <Link
          href="/groups"
          className="text-sm font-semibold text-[hsl(280,100%,70%)] hover:underline"
        >
          ← Back to My Groups
        </Link>
      </div>

      <h1 className="mt-4 mb-8 text-4xl font-bold">Group Media</h1>

      <UploadZone groupId={params.groupID} />
      <MediaGallery media={serializedMedia} groupId={params.groupID} />
    </main>
  );
}
