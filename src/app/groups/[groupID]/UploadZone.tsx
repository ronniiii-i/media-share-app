"use client";

import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

import "@uploadthing/react/styles.css";

export default function UploadZone({ groupId }: { groupId: string }) {
  const router = useRouter();

  return (
    <div className="rounded-xl bg-white/10 p-8 shadow-xl">
      <h2 className="mb-4 text-xl font-semibold">Upload New Media</h2>
      <UploadButton
        endpoint="mediaUploader"
        input={{ groupId }}
        onClientUploadComplete={() => {
          alert("Saved to database!");
          router.refresh(); // This tells the server page to fetch new data
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
