"use client";

import { useState } from "react";

export default function InviteButton({ inviteCode }: { inviteCode: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    const link = `${window.location.origin}/join/${inviteCode}`;
    void navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyLink}
      className="bg-secondary border-border hover:bg-accent flex items-center gap-2 rounded-full rounded-xl border bg-white/10 px-4 py-2 text-sm font-medium transition transition-colors hover:bg-white/20 active:scale-95"
    >
      {copied ? "✅ Link Copied!" : "🔗 Copy Invite Link"}
    </button>
  );
}
