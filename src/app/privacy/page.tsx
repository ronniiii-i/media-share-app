import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-3xl">
        
        <header className="mt-12 mb-16">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="mt-6 text-5xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            We believe your memories should be yours alone. Here is how we
            protect them.
          </p>
        </header>

        <div className="space-y-12">
          
          <section className="border-border bg-secondary/30 rounded-2xl border p-8">
            <h2 className="text-primary mb-4 text-xl font-bold">
              1. You Own Your Data
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              MediaShare does not claim any ownership over the photos or videos
              you upload. We do not sell your data, and we do not use your media
              to train machine learning models. Your vaults are your private
              property.
            </p>
          </section>

          
          <section className="space-y-4">
            <h2 className="text-xl font-bold">2. Storage & Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              All media is stored using secure cloud infrastructure. Access is
              restricted solely to members of the specific group (vault) where
              the media was uploaded. Our source code is open-source, meaning
              our security practices are transparent and verifiable by the
              community.
            </p>
          </section>

          
          <section className="space-y-4">
            <h2 className="text-xl font-bold">3. Authentication</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use Google OAuth for secure sign-in. We only store your name,
              email, and profile picture to identify you within your sharing
              groups. We never see or store your Google password.
            </p>
          </section>

          
          <section className="border-primary/20 space-y-4 border-l-2 pl-6 italic">
            <h2 className="text-foreground text-lg font-semibold">
              Our Deletion Guarantee
            </h2>
            <p className="text-muted-foreground">
              If you choose to delete a photo or your entire account, we remove
              it from our active databases immediately. We believe in the &quot;Right
              to be Forgotten.&quot;
            </p>
          </section>
        </div>

        
        <footer className="border-border text-muted-foreground mt-20 border-t pt-8 text-center text-sm">
          <p>Last updated: January 2026</p>
          <p className="mt-2">
            Questions?
            <a
              href="mailto:ronniiiip@gmail.com"
              className="text-primary hover:underline"
            >
              Reach out to us.
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
