import Image from "next/image";
import Link from "next/link";
import type { Puppy } from "@/lib/puppies";

const DOORS = ["#a24a1a", "#5a3a28", "#d4853a", "#7a3a22", "#c2622b", "#4a2c1c"];
const doorColor = (i: number) => DOORS[i % DOORS.length];

export const label = (p: Puppy) => (p.name ? `${p.name}` : p.breed);
export const sub = (p: Puppy, withVideo = false) =>
  `${p.name ? `${p.breed} · ` : ""}${p.gender === "Boy" ? "boy" : p.gender === "Girl" ? "girl" : "boy & girl"} · ${p.age}${withVideo && p.gallery.some((g) => g.video) ? ", with video" : ""}`;

/** A puppy peeking out from behind a door, used on the home page. */
export function DoorCard({ p, i, open = false }: { p: Puppy; i: number; open?: boolean }) {
  return (
    <Link href={`/puppies/${p.slug}`} className={`door-link group block w-full text-center ${open ? "is-open" : ""}`}>
      <p className={`display text-xl md:text-2xl leading-tight text-balance transition-colors duration-300 ${open ? "text-toffee" : ""}`}>{label(p)}</p>
      <p className="mt-1 text-xs font-semibold text-cocoa-soft text-balance">{sub(p, true).replace(/^.*? · /, p.name ? "" : "")}</p>
      <div className="door-frame mt-3">
        <Image src={p.card} alt={p.alt} fill sizes="(min-width:1024px) 16rem, 45vw" className="object-cover" />
        <div className="door-leaf grid place-items-center" style={{ background: doorColor(i) }}>
          <div className="absolute inset-3 rounded-t-full border border-milk/30" />
          <svg viewBox="0 0 24 24" className="h-7 w-7 opacity-50" fill="#f9cdbf" aria-hidden>
            <ellipse cx="6" cy="10" rx="2.3" ry="3" /><ellipse cx="10.5" cy="5.8" rx="2.3" ry="3" /><ellipse cx="16.5" cy="5.8" rx="2.3" ry="3" /><ellipse cx="21" cy="10" rx="2.3" ry="3" />
            <path d="M12.8 11c-3 0-6 3.6-6 6.2 0 2 1.6 2.8 3.4 2.8 1 0 1.7-.4 2.6-.4s1.6.4 2.6.4c1.8 0 3.4-.8 3.4-2.8 0-2.6-3-6.2-6-6.2z" />
          </svg>
          <span className="absolute right-3 top-1/2 h-2.5 w-2.5 rounded-full border border-cocoa bg-honey" />
        </div>
        <span className="door-tag absolute right-1 top-[16%] z-10 rotate-6 rounded-md border-2 border-cocoa bg-milk px-2 py-0.5 text-xs font-bold shadow-sm">Available</span>
      </div>
    </Link>
  );
}

/** Card used in the /puppies grid. */
export function PuppyTile({ p, priority }: { p: Puppy; priority?: boolean }) {
  const video = p.gallery.some((g) => g.video);
  return (
    <Link href={`/puppies/${p.slug}`} className="group block">
      <div className="polaroid -rotate-1 group-even:rotate-1">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-honey-soft">
          <Image src={p.card} alt={p.alt || `${p.breed} puppy`} fill priority={priority} sizes="(min-width:1024px) 22rem, (min-width:640px) 45vw, 90vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <span className="absolute left-2 top-2 rounded-full border-2 border-cocoa bg-milk px-2.5 py-0.5 text-xs font-bold">Available</span>
          {video && <span className="absolute right-2 top-2 rounded-full bg-cocoa/85 px-2.5 py-0.5 text-xs font-bold text-milk">▶ video</span>}
        </div>
        <p className="display mt-3 text-xl leading-tight">{label(p)}</p>
        <p className="text-sm font-semibold text-cocoa-soft">{sub(p)}</p>
      </div>
    </Link>
  );
}

/** Admit-one ticket for the "gone home" page. */
export function Ticket({ p }: { p: Puppy }) {
  return (
    <Link href={`/puppies/${p.slug}`} className="group block">
      <div className="paper overflow-hidden !shadow-[0_6px_0_rgb(42_23_14_/_.35)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
        <div className="relative aspect-[4/5] bg-honey-soft">
          <Image src={p.card} alt={p.alt || `${p.breed} puppy`} fill sizes="(min-width:1024px) 22rem, (min-width:640px) 45vw, 90vw" className="object-cover saturate-[.85]" />
        </div>
        <div className="border-t-2 border-dashed border-cocoa/50 p-4">
          <p className="hand text-xs text-toffee-ink">one ticket home</p>
          <p className="display text-xl">{p.name ?? p.breed}</p>
          <p className="text-sm font-semibold text-cocoa-soft">
            {p.breed}, {p.gender === "Boy" ? "boy" : "girl"}
          </p>
          <div className="mt-2 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-cocoa-soft">
            <span>{p.origin === "local" ? "Dubai showroom" : "TeddyPups"}</span>
            <span>home ♥ admit one</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
