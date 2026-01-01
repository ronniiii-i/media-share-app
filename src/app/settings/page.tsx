import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import DeleteAccountButton from "./DeleteAccountButton";
import Image from "next/image";
import Link from "next/link";

export default async function SettingsPage() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const groupCount = await db.group.count({
    where: { ownerId: session.user.id },
  });
  const mediaCount = await db.media.count({
    where: { userId: session.user.id },
  });

  return (
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Account Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your profile and vault preferences.
          </p>
        </header>

        <div className="grid gap-6">
          {/* Profile Card */}
          <section className="border-border bg-secondary rounded-2xl border p-8 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="border-primary/20 relative h-24 w-24 overflow-hidden rounded-full border-2 p-1">
                <div className="border-border relative h-full w-full overflow-hidden rounded-full border">
                  <Image
                    src={session.user.image ?? ""}
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{session.user.name}</h2>
                <p className="text-muted-foreground">{session.user.email}</p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="bg-background/50 border-border/50 rounded-xl border p-6 text-center">
                <p className="text-primary text-3xl font-bold">{groupCount}</p>
                <p className="text-muted-foreground mt-1 text-[10px] font-bold tracking-widest uppercase">
                  Groups Owned
                </p>
              </div>
              <div className="bg-background/50 border-border/50 rounded-xl border p-6 text-center">
                <p className="text-primary text-3xl font-bold">{mediaCount}</p>
                <p className="text-muted-foreground mt-1 text-[10px] font-bold tracking-widest uppercase">
                  Items Uploaded
                </p>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="border-border bg-secondary rounded-2xl border p-8">
            <h3 className="border-border mb-6 border-b pb-2 text-lg font-semibold">
              Preferences
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-2">
                <div className="space-y-1">
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-muted-foreground text-xs">
                    Receive updates about new media in your vaults.
                  </p>
                </div>
                {/* Toggle Placeholder */}
                <div className="bg-border relative h-6 w-11 rounded-full">
                  <div className="bg-muted-foreground absolute top-1 left-1 h-4 w-4 rounded-full"></div>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-primary text-sm font-medium transition">
                Change Display Name
              </button>
            </div>
          </section>

          {/* Sign Out */}
          <section className="border-border bg-secondary flex items-center justify-between rounded-2xl border p-8">
            <div>
              <h3 className="font-bold">Session</h3>
              <p className="text-muted-foreground text-sm">
                Logout of your current session.
              </p>
            </div>
            <Link
              href="/api/auth/signout"
              className="bg-background border-border hover:bg-accent rounded-lg border px-6 py-2.5 text-sm font-bold transition"
            >
              Sign Out
            </Link>
          </section>

          {/* Danger Zone */}
          <section className="rounded-2xl border border-red-900/20 bg-red-950/10 p-8">
            <h3 className="mb-2 font-bold text-red-400">Danger Zone</h3>
            <p className="mb-6 text-sm text-red-200/50">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <DeleteAccountButton />
          </section>
        </div>
      </div>
    </main>
  );
}
