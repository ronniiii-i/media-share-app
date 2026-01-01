"use client";

import Image from "next/image";
import { useState } from "react";
import {
  deleteGroup,
  leaveGroup,
  renameGroup,
  removeMember,
} from "./settings-actions";

export default function SettingsModal({
  group,
  isOwner,
}: {
  group: object & {
    id: string;
    name: string;
    members: { userId: string; user: { name: string; image?: string } }[];
    ownerId: string;
  };
  isOwner: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState(group.name);

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-full p-2 transition hover:bg-white/10"
      >
        ⚙️ <span className="sr-only">Settings</span>
      </button>
    );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#1a1b36] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Group Settings</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {isOwner && (
          <div className="mb-8 space-y-4">
            <div>
              <label className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Group Name
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[hsl(280,100%,70%)] focus:outline-none"
                />
                <button
                  onClick={() => renameGroup(group.id, newName)}
                  className="rounded-lg bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Members
          </p>
          <div className="space-y-2">
            {group.members.map(
              (m: { userId: string; user: { name: string } }) => (
                <div
                  key={m.userId}
                  className="flex items-center justify-between rounded-lg bg-white/5 p-2"
                >
                  <div className="flex items-center gap-2">
                    {m.user.image && (
                      <Image
                        src={m.user.image}
                        className="rounded-full"
                        alt=""
                        width={24}
                        height={24}
                      />
                    )}
                    <span className="text-sm">
                      {m.user.name} {m.userId === group.ownerId && "⭐"}
                    </span>
                  </div>

                  {isOwner && m.userId !== group.ownerId && (
                    <button
                      onClick={async () => {
                        if (confirm(`Remove ${m.user.name} from the group?`)) {
                          await removeMember(group.id, m.userId);
                        }
                      }}
                      className="rounded px-2 py-1 text-xs font-bold text-red-400 transition hover:bg-red-400/10 hover:text-red-300"
                    >
                      Kick
                    </button>
                  )}
                </div>
              ),
            )}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Danger Zone
          </p>
          <button
            onClick={() => confirm("Leave this group?") && leaveGroup(group.id)}
            className="w-full rounded-xl bg-orange-500/10 py-3 text-sm font-bold text-orange-500 transition hover:bg-orange-500/20"
          >
            Leave Group
          </button>

          {isOwner && (
            <button
              onClick={() =>
                confirm("DELETE ENTIRE GROUP? This cannot be undone.") &&
                deleteGroup(group.id)
              }
              className="w-full rounded-xl bg-red-500/10 py-3 text-sm font-bold text-red-500 transition hover:bg-red-500/20"
            >
              Delete Group Permanently
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
