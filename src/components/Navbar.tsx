import Link from "next/link";
import { auth } from "@/server/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#15162c]/50 px-8 py-4 backdrop-blur-md w-full">
      <Link
        href="/"
        className="text-2xl font-extrabold tracking-tight text-white"
      >
        MEDIA<span className="text-[hsl(280,100%,70%)]">SHARE</span>
      </Link>

      <div className="flex items-center gap-4">
        {session ? (
          <>
            <span className="text-sm text-gray-300">
              Hi, {session.user.name}
            </span>
            <Link
              href="/api/auth/signout"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Sign Out
            </Link>
          </>
        ) : (
          <Link
            href="/api/auth/signin"
            className="rounded-full bg-[hsl(280,100%,70%)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
