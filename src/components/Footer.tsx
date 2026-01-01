import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-border bg-background w-full border-t py-16">
      <div className="container mx-auto px-8">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          {/* Brand & Mission */}
          <div className="flex flex-col items-center md:items-start">
            <span className="text-foreground text-xl font-bold tracking-tighter">
              MEDIA
              <span className="text-muted-foreground font-light">SHARE</span>
            </span>
            <p className="text-muted-foreground mt-2 text-center text-sm md:text-left">
              Your memories, kept in good company.
            </p>
          </div>

          {/* Navigation & Social */}
          <div className="flex flex-col items-center gap-6 md:items-end">
            <div className="text-muted-foreground flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold tracking-widest uppercase">
              <Link href="/groups" className="hover:text-primary transition">
                Vaults
              </Link>
              <Link href="/settings" className="hover:text-primary transition">
                Account
              </Link>
              <Link href="/privacy" className="hover:text-primary transition">
                Privacy
              </Link>
              <a
                href="mailto:ronniiiip@gmail.com"
                className="hover:text-primary transition"
              >
                Support
              </a>
            </div>

            {/* GitHub Button */}
            <a
              href="https://github.com/ronniiii-i/media-share-app"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border bg-secondary/50 hover:bg-secondary hover:text-primary flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold transition"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Source on GitHub
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-border/20 text-muted-foreground/40 mt-16 flex flex-col items-center justify-between border-t pt-8 text-[10px] font-medium tracking-[0.2em] uppercase md:flex-row">
          <p>© 2026 MEDIASHARE CORE</p>
          <div className="mt-4 flex items-center gap-4 md:mt-0">
            <span className="text-primary/60">Open Source</span>
            <span className="bg-border h-1 w-1 rounded-full"></span>
            <span>MIT License</span>
          </div>
        </div>
      </div>
    </footer>
  );
}