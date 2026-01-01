"use client";

import { deleteMedia } from "./actions";

export default function DeleteButton({
  id,
  groupId,
}: {
  id: string;
  groupId: string;
}) {
  return (
    <button
      onClick={async () => {
        if (confirm("Are you sure you want to delete this?")) {
          await deleteMedia(id, groupId);
        }
      }}
      className="absolute top-2 right-2 rounded-lg rounded-md border border-red-500/20 bg-red-600 bg-red-950/80 px-2 px-3 py-1 py-1.5 text-xs text-[10px] font-bold text-red-200 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100"
    >
      Delete
    </button>
  );
}
