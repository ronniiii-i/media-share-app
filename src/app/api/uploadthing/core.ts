import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { z } from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  mediaUploader: f({
    image: { maxFileSize: "4MB" },
    video: { maxFileSize: "16MB" },
  })
    .input(z.object({ groupId: z.string() }))

    .middleware(async ({ input }) => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");

      return { userId: session.user.id, groupId: input.groupId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.media.create({
        data: {
          url: file.url,
          name: file.name,
          type: file.type,
          userId: metadata.userId,
          groupId: metadata.groupId,
        },
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
