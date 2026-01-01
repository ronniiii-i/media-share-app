"use client";

import { useState } from "react";
import UploadZone from "./UploadZone";

export default function UploadSection({ groupId }: { groupId: string }) {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowUpload(true)}
        className="bg-primary text-primary-foreground rounded-xl px-6 py-2 text-sm font-bold transition hover:opacity-90"
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
