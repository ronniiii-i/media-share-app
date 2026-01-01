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
      className="absolute top-2 right-2 rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100"
    >
      Delete
    </button>
  );
}
