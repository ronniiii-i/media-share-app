"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGroup } from "./actions";

export default function CreateGroupButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (!name.trim()) return;
    setIsPending(true);
    try {
      const formData = new FormData();
      formData.append("groupName", name);
      const newGroup = await createGroup(formData);
      setIsOpen(false);
      setName("");
      router.push(`/groups/${newGroup?.id}`);
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-[hsl(280,100%,70%)] px-6 py-2 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-90"
      >
        + New Group
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in w-full max-w-sm rounded-3xl border border-white/10 bg-[#1a1b36] p-6 shadow-2xl duration-200">
            <h2 className="mb-4 text-xl font-bold text-white">
              Create a New Group
            </h2>
            <input
              autoFocus
              placeholder="Family Vacation, Project X..."
              className="mb-6 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[hsl(280,100%,70%)] focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-xl bg-white/5 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                disabled={isPending}
                onClick={handleCreate}
                className="flex-1 rounded-xl bg-[hsl(280,100%,70%)] py-3 text-sm font-bold text-white disabled:opacity-50"
              >
                {isPending ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
