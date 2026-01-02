import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";


export const metadata: Metadata = {
  title: {
    default: "MediaShare | Private High-Fidelity Vaults",
    template: "%s | MediaShare",
  },
  description:
    "An elegant, open-source space to share high-resolution memories with your inner circle.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "MediaShare",
    description: "Collect moments, not just files.",
    url: "https://mediashareapp.vercel.app",
    siteName: "MediaShare",
    images: [
      {
        url: "/og-image.png", // Create a 1200x630 image in your /public folder!
        width: 1200,
        height: 630,
        alt: "MediaShare Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MediaShare",
    description: "The elegant way to share media with your inner circle.",
    images: ["/og-image.png"],
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="flex min-h-screen flex-col items-center">
        <Navbar />
        <div className="w-full">
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
