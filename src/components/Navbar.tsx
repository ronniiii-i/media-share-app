import Link from "next/link";
import { auth } from "@/server/auth";
import Image from "next/image";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#15162c]/50 px-8 py-4 backdrop-blur-md w-full">
      <Link
        href="/groups"
        className="text-2xl font-extrabold tracking-tight text-white"
      >
        MEDIA<span className="text-[hsl(280,100%,70%)]">SHARE</span>
      </Link>

      <div className="flex items-center gap-6">
        {session ? (
          <>
            <Link
              href="/groups"
              className="text-sm font-medium text-gray-300 hover:text-white"
            >
              Dashboard
            </Link>
            <Link href="/settings" className="group flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/20 transition group-hover:border-[hsl(280,100%,70%)]">
                <Image
                  src={session.user.image ?? ""}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          </>
        ) : (
          <Link
            href="/api/auth/signin"
            className="rounded-full bg-[hsl(280,100%,70%)] px-4 py-2 text-sm font-semibold text-white"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
