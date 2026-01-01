import Link from "next/link";
import { auth, signIn, signOut } from "@/server/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="flex flex-col items-center items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Media <span className="text-[hsl(280,100%,70%)]">Share</span> App
        </h1>

        <div className="flex flex-col items-center justify-center gap-4">
          {session ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-2xl text-white">
                Welcome back, <span>{session.user?.name}</span>!
              </p>
              <div className="flex gap-4">
                <Link
                  href="/groups"
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                >
                  Go to Groups
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
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
              <button className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
                Sign in with Google
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
