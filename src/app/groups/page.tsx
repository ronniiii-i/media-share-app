import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import CreateGroupButton from "./CreateGroupButton";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const owned = await db.group.findMany({
    where: { ownerId: session.user.id },
    include: { _count: { select: { media: true, members: true } } },
  });

  const joined = await db.groupMember.findMany({
    where: {
      userId: session.user.id,
      group: { NOT: { ownerId: session.user.id } },
    },
    include: {
      group: {
        include: { _count: { select: { media: true, members: true } } },
      },
    },
  });

  const allGroups = [
    ...owned.map((g) => ({ ...g, isOwner: true })),
    ...joined.map((m) => ({ ...m.group, isOwner: false })),
  ].sort((a, b) => b.name.localeCompare(a.name));

  return (
    <main className="min-h-screen bg-[#15162c] p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Your Vaults</h1>
            <p className="text-gray-400">All your shared media in one place.</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/settings"
              className="rounded-full border border-white/10 px-6 py-2 text-sm font-semibold hover:bg-white/5"
            >
              ⚙️ Settings
            </Link>
            <CreateGroupButton />
          </div>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allGroups.map((group) => (
            <GroupCard key={group.id} group={group} isOwner={group.isOwner} />
          ))}
          {allGroups.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-white/10 py-20 text-center">
              <p className="text-gray-500">
                No groups yet. Create one to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function GroupCard({
  group,
  isOwner,
}: {
  group: {
    id: string;
    name: string;
    _count: { media: number; members: number };
  };
  isOwner: boolean;
}) {
  return (
    <Link
      href={`/groups/${group.id}`}
      className="group block rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/10"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{group.name}</h3>
        <span className="text-xs font-medium tracking-widest text-gray-500 uppercase">
          {isOwner ? "Owner" : "Member"}
        </span>
      </div>
      <div className="mt-4 flex gap-4 text-sm text-gray-400">
        <span>🖼️ {group._count.media} Files</span>
        <span>👤 {group._count.members} Members</span>
      </div>
    </Link>
  );
}
