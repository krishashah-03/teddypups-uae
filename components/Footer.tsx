import Image from "next/image";
import Link from "next/link";
import { EMAIL, PHONE, SOCIAL, WHATSAPP } from "@/lib/site";
import PupStop from "./pup/PupStop";
import Floaters, { Moon } from "./Floaters";

export default function Footer() {
  return (
    <footer className="night-sky relative overflow-hidden text-milk">
      <Floaters kind="stars" count={18} />
      <Moon className="absolute right-[6%] top-8 h-12 w-12 opacity-90" />
      <div className="wrap relative py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="display text-5xl md:text-6xl">Home, at last.</p>
            <p className="mt-4 max-w-sm text-milk/80">
              TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.
            </p>
            <PupStop pose="basket" act="basket" lane className="mt-6 hidden w-64 md:block" />
          </div>
          <div>
            <h3 className="hand text-honey">Explore</h3>
            <ul className="mt-3 space-y-2 font-semibold">
              <li><Link href="/puppies">Available puppies</Link></li>
              <li><Link href="/gone-home">Gone home</Link></li>
              <li><Link href="/happy-families">Happy families</Link></li>
              <li><Link href="/how-it-works">How it works</Link></li>
              <li><Link href="/how-it-works#delivery">Delivery &amp; collection</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Visit &amp; contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="hand text-honey">Say hello</h3>
            <ul className="mt-3 space-y-2 font-semibold">
              <li><a href={WHATSAPP} target="_blank" rel="noopener">WhatsApp {PHONE}</a></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li className="font-normal text-milk/80">Downtown Dubai, United Arab Emirates</li>
              <li className="flex flex-wrap gap-2 pt-2">
                {Object.entries(SOCIAL).map(([k, v]) => (
                  <a key={k} href={v} target="_blank" rel="noopener" className="rounded-full border border-milk/30 px-3 py-1 text-sm transition-colors hover:bg-milk/10">{k}</a>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <PupStop pose="basket" act="basket" lane className="mx-auto mt-10 w-60 md:hidden" />
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-milk/15 pt-6 text-sm text-milk/70">
          <span className="flex items-center gap-2">
            <Image src="/brand/logo.png" alt="" width={24} height={24} className="rounded-full" />
            © 2026 TeddyPups U.A.E.
          </span>
          <span className="hand text-honey">every puppy is family</span>
        </div>
      </div>
    </footer>
  );
}
