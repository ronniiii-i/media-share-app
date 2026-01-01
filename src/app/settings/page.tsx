import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import DeleteAccountButton from "./DeleteAccountButton";
import Image from "next/image";
import Link from "next/link";

export default async function SettingsPage() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  // Get some fun stats for the user
  const groupCount = await db.group.count({
    where: { ownerId: session.user.id },
  });
  const mediaCount = await db.media.count({
    where: { userId: session.user.id },
  });

  return (
    <main className="min-h-screen bg-[#15162c] p-8 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Account Settings</h1>

        <div className="grid gap-8">
          {/* Profile Card */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="flex items-center gap-6">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[hsl(280,100%,70%)]">
                <Image src={session.user.image ?? ""} alt="User" fill />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{session.user.name}</h2>
                <p className="text-gray-400">{session.user.email}</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 p-4 text-center">
                <p className="text-2xl font-bold text-[hsl(280,100%,70%)]">
                  {groupCount}
                </p>
                <p className="text-xs text-gray-500 uppercase">Groups Owned</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 text-center">
                <p className="text-2xl font-bold text-blue-400">{mediaCount}</p>
                <p className="text-xs text-gray-500 uppercase">
                  Items Uploaded
                </p>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="mb-4 text-lg font-semibold">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 py-2">
                <span>Email Notifications</span>
                <div className="h-6 w-10 rounded-full bg-white/10"></div>{" "}
                {/* Just a placeholder UI */}
              </div>
              <button className="text-sm text-gray-400 transition hover:text-white">
                Change Display Name
              </button>
            </div>
          </section>

          {/* Sign Out */}
          <section className="flex items-center justify-between rounded-3xl border border-red-500/10 bg-red-500/5 p-8">
            <div>
              <h3 className="font-bold">Session</h3>
              <p className="text-sm text-gray-400">
                Logout of your current session.
              </p>
            </div>
            <Link
              href="/api/auth/signout"
              className="rounded-xl bg-white/10 px-6 py-2 font-bold hover:bg-white/20"
            >
              Sign Out
            </Link>
          </section>

          {/* Danger Zone */}
          <section className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8">
            <h3 className="mb-2 font-bold text-red-500">Danger Zone</h3>
            <DeleteAccountButton />
          </section>
        </div>
      </div>
    </main>
  );
}
