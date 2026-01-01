"use client";

import { useState } from "react";
import { deleteAccount } from "./actions";

export default function DeleteAccountButton() {
  const [confirmText, setConfirmText] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== "DELETE") return;
    setIsPending(true);
    await deleteAccount();
  };

  return (
    <div className="mt-4 space-y-4">
      <p className="text-xs text-gray-500 italic">
        Type <span className="font-mono text-white">DELETE</span> below to
        confirm.
      </p>
      <input
        type="text"
        placeholder="Type DELETE"
        className="w-full rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-white focus:border-red-500/50 focus:outline-none"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
      />
      <button
        disabled={confirmText !== "DELETE" || isPending}
        onClick={handleDelete}
        className="w-full rounded-xl bg-red-600 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30"
      >
        {isPending ? "Deleting Account..." : "Permanently Delete Account"}
      </button>
    </div>
  );
}
