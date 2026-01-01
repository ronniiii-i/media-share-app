"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

import "@uploadthing/react/styles.css";

export default function UploadZone({
  groupId,
  closeUpload,
}: {
  groupId: string;
  closeUpload: () => void;
}) {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-50 m-auto flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-md"
      onClick={closeUpload}
    >
      <div
        className="sizes:max-w-lg relative flex w-full max-w-2xl flex-col items-center rounded-xl border border-white/20 bg-black/80 p-8 shadow-xl backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-semibold">Upload New Media</h2>
        <button
          className="hover:scale-1.2 absolute top-4 right-4 cursor-pointer"
          onClick={closeUpload}
        >
          ✕
        </button>

        <div className="w-full max-w-3xl rounded-3xl border border-dashed border-white/20 bg-black p-2 transition-colors hover:border-[hsl(280,100%,70%)]/50">
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
    </div>
  );
}
