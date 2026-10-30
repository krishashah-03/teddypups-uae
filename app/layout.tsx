import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces, Shantell_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import PupJourney from "@/components/pup/PupJourney";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["SOFT", "WONK"] });
const shantell = Shantell_Sans({ subsets: ["latin"], variable: "--font-shantell" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "TeddyPups U.A.E. — Premium teacup puppies in Dubai", template: "%s | TeddyPups U.A.E." },
  description:
    "Meet your new best friend in our Downtown Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.",
  openGraph: { title: "TeddyPups U.A.E.", description: "Premium teacup puppies in Dubai. Every puppy is family.", type: "website" },
};
export const viewport: Viewport = { themeColor: "#fffdf8", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${fraunces.variable} ${shantell.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:left-4 focus:top-4 focus:rounded-full focus:bg-milk focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <MobileBar />
        <PupJourney />
      </body>
    </html>
  );
}
