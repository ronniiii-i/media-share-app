import Link from "next/link";
import { auth, signIn, signOut } from "@/server/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="bg-background text-foreground relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden">
      {/* Background Decorative Element */}
      <div className="bg-primary/5 absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
      <div className="bg-primary/5 absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />

      <div className="relative z-10 container flex flex-col items-center justify-center gap-8 px-4 text-center">
        {/* Badge */}
        <div className="border-border bg-secondary/50 text-muted-foreground inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wider uppercase">
          Private Media Hosting
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl space-y-4">
          <h1 className="text-6xl font-bold tracking-tight sm:text-8xl">
            Collect moments, <br />
            <span className="text-primary italic">not just files.</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
            The elegant way to share high-resolution memories with your inner
            circle. No social media noise, just your curated vaults.
          </p>
        </div>

        {/* Action Area */}
        <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {session ? (
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <p className="text-muted-foreground text-sm font-medium">
                  Logged in as{" "}
                  <span className="text-foreground">{session.user?.name}</span>
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/groups"
                  className="bg-primary text-primary-foreground shadow-primary/10 rounded-xl px-10 py-4 text-lg font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-95"
                >
                  Enter Your Vaults
                </Link>

                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button className="border-border bg-secondary/50 hover:bg-secondary rounded-xl border px-10 py-4 text-lg font-medium transition">
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button className="group bg-primary text-primary-foreground shadow-primary/10 flex items-center gap-3 rounded-2xl px-12 py-5 text-xl font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                <span>Start Sharing</span>
                <span className="text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
              <p className="text-muted-foreground mt-4 text-xs">
                Join with your Google account to get started.
              </p>
            </form>
          )}
        </div>

        {/* Features Row */}
        <div className="border-border/50 mt-20 grid grid-cols-1 gap-8 border-t pt-12 sm:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-primary font-bold">Secure Vaults</h3>
            <p className="text-muted-foreground text-sm">
              Invite-only groups ensure your media stays private.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-primary font-bold">Original Quality</h3>
            <p className="text-muted-foreground text-sm">
              We don&apos;t crush your pixels. Full-res downloads for everyone.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-primary font-bold">Simple Curation</h3>
            <p className="text-muted-foreground text-sm">
              Clean, minimal interface designed for viewing, not scrolling.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
