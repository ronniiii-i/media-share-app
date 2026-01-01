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
    // Updated background to bg-background (Stone Brown)
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Your Vaults</h1>
            <p className="text-muted-foreground mt-1">
              All your shared media in one place.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/settings"
              className="border-border bg-secondary/50 hover:bg-secondary rounded-xl border px-5 py-2 text-sm font-medium transition"
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
            <div className="border-border col-span-full rounded-3xl border border-dashed py-20 text-center">
              <p className="text-muted-foreground">
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
      // Updated to bg-secondary with a subtle border
      className="group border-border bg-secondary hover:border-primary/30 block rounded-2xl border p-6 transition-all hover:scale-[1.02]"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-foreground text-lg font-bold">{group.name}</h3>
        <span className="text-muted-foreground bg-background/50 rounded-md px-2 py-1 text-[10px] font-bold tracking-widest uppercase">
          {isOwner ? "Owner" : "Member"}
        </span>
      </div>

      <div className="text-muted-foreground mt-6 flex gap-4 text-xs font-medium">
        <div className="flex items-center gap-1.5">
          <span className="opacity-70">🖼️</span>
          <span>{group._count.media} Files</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="opacity-70">👤</span>
          <span>{group._count.members} Members</span>
        </div>
      </div>
    </Link>
  );
}
