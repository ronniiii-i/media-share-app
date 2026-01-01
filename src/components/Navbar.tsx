import Link from "next/link";
import { auth } from "@/server/auth";
import Image from "next/image";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="border-border bg-background/80 sticky top-0 z-50 flex w-full items-center justify-between border-b px-8 py-4 backdrop-blur-md">
      <Link
        href="/"
        className="text-foreground text-2xl font-bold tracking-tighter"
      >
        MEDIA<span className="text-muted-foreground font-light">SHARE</span>
      </Link>

      <div className="flex items-center gap-6">
        {session ? (
          <>
            <Link
              href="/groups"
              className="bg-primary text-primary-foreground rounded-xl px-6 py-2 text-sm font-bold font-medium shadow-sm transition transition-colors hover:opacity-90"
            >
              Dashboard
            </Link>
            <Link href="/settings" className="group flex items-center gap-2">
              <div className="border-border group-hover:border-primary relative h-9 w-9 overflow-hidden rounded-full border transition">
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
            className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-bold transition-opacity hover:opacity-90"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
