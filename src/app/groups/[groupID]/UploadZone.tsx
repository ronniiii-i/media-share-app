"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

import "@uploadthing/react/styles.css";

export default function UploadZone({ groupId }: { groupId: string }) {
  const router = useRouter();

  return (
    <div className="rounded-xl bg-white/10 p-8 shadow-xl">
      <h2 className="mb-4 text-xl font-semibold">Upload New Media</h2>

      <div className="w-full max-w-3xl rounded-3xl border border-dashed border-white/20 bg-white/5 p-2 transition-colors hover:border-[hsl(280,100%,70%)]/50">
        <UploadDropzone
          endpoint="mediaUploader"
          input={{ groupId }}
          appearance={{
            button:
              "!bg-[hsl(280,100%,60%)] text-white px-4 py-2 rounded-xl after:bg-white/20",
            container: "border-none bg-transparent py-10",
            label: "!text-gray-50 hover:!text-[hsl(280,100%,70%)]",
          }}
          onClientUploadComplete={() => {
            router.refresh();
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </div>
  );
}
