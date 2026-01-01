import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { createGroup } from "./actions";

export default async function GroupsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const groups = await db.group.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 rounded-xl border border-white/20 bg-white/5 p-6">
          <h2 className="mb-4 text-xl font-bold">Create a New Group</h2>
          <form action={createGroup} className="flex gap-4">
            <input
              name="groupName"
              placeholder="Friend Group Name"
              className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-6 py-2 font-bold transition hover:bg-purple-700"
            >
              Create
            </button>
          </form>
        </div>

        <h1 className="mb-6 text-3xl font-extrabold">My Groups</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {groups.map((group) => (
            <div
              key={group.id}
              className="rounded-xl border border-white/20 bg-white/10 p-6"
            >
              <h2 className="text-xl font-bold">{group.name}</h2>
              <p className="text-sm text-white/60">
                Created {new Date(group.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
          {groups.length === 0 && <p>No groups found. Create one above!</p>}
        </div>
      </div>
    </main>
  );
}
