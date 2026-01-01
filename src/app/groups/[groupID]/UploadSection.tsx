"use client";

import { useState } from "react";
import UploadZone from "./UploadZone";

export default function UploadSection({ groupId }: { groupId: string }) {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowUpload(true)}
        className="rounded-full bg-[hsl(280,100%,70%)] px-6 py-2 text-sm font-bold text-white transition hover:opacity-90 active:scale-95"
      >
        + Add Media
      </button>

      {showUpload && (
        <UploadZone
          groupId={groupId}
          closeUpload={() => setShowUpload(false)}
        />
      )}
    </div>
  );
}
