"use client";

import { UploadButton } from "@/utils/uploadthing";

import "@uploadthing/react/styles.css";

export default function GroupDetailsPage({
  params
}: {
  params: { groupID: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] p-12 text-white">
      <h1 className="mb-8 text-4xl font-bold text-white">Group Media</h1>

      <div className="rounded-xl bg-white/10 p-8 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold">Upload New Media</h2>

        <UploadButton
          endpoint="mediaUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            alert("Upload Completed!");
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>

      <div className="mt-12">
        <p className="text-gray-400 italic">Photos will appear here soon...</p>
      </div>
    </main>
  );
}
