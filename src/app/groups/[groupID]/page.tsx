import { db } from "@/server/db";
import Image from "next/image";
import UploadZone from "./UploadZone";

export default async function GroupDetailsPage({
  params,
}: {
  params: { groupId: string };
}) {
  const media = await db.media.findMany({
    where: { groupId: params.groupId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] p-12 text-white">
      <h1 className="mb-8 text-4xl font-bold">Group Media</h1>

      <UploadZone groupId={params.groupId} />

      <div className="mt-12 grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-3">
        {media.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2"
          >
            {item.type.startsWith("image") ? (
              <Image
                src={item.url}
                alt={item.name}
                width={400}
                height={400}
                className="aspect-square w-full rounded object-cover"
              />
            ) : (
              <video
                src={item.url}
                controls
                className="aspect-square w-full rounded object-cover"
              />
            )}
            <p className="mt-2 truncate px-1 text-xs text-gray-400">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
