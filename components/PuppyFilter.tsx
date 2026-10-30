"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Puppy } from "@/lib/puppies";
import { label, sub } from "./PuppyCards";
import { Paw } from "./Icons";
import { WHATSAPP } from "@/lib/site";

const BREEDS = [
  ["maltipoo", "Maltipoo"],
  ["pomeranian", "Pomeranian"],
  ["poodle", "Poodle"],
  ["cavapoo", "Cavapoo"],
  ["shih-tzu", "Shih Tzu"],
] as const;
const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

type F = { origin: string; collection: string; breed: string; gender: string };

function PortraitTile({ p, i, priority }: { p: Puppy; i: number; priority: boolean }) {
  const video = p.gallery.some((g) => g.video);
  const tilt = [-4, 3, -2, 5][i % 4];
  const blob = ["#f6dcae", "#fbe3b4", "#f3d3b8", "#f9cdbf"][i % 4];
  return (
    <Link href={`/puppies/${p.slug}`} className="group relative block text-center">
      <div className="relative mx-auto w-[88%] max-w-[19rem]" style={{ transform: `rotate(${tilt * 0.3}deg)` }}>
        {/* cream blob offset behind the portrait */}
        <div className="absolute inset-0 translate-x-[-8%] translate-y-[6%] scale-[1.06]" style={{ background: blob, borderRadius: "58% 42% 52% 48% / 48% 56% 44% 52%" }} />
        <div className="relative aspect-square overflow-hidden rounded-full border-[3px] border-cocoa bg-honey-soft transition-transform duration-500 group-hover:scale-[1.03]">
          <Image src={p.card} alt={p.alt || `${p.breed} puppy`} fill priority={priority} sizes="(min-width:1024px) 20rem, (min-width:640px) 45vw, 80vw" className="object-cover" />
        </div>
        {/* hand-drawn loops */}
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute -inset-[7%] h-[114%] w-[114%] overflow-visible" fill="none" stroke="#2a170e" strokeLinecap="round" aria-hidden>
          <path d="M12 62 C4 30 34 4 66 6 C90 8 98 30 94 54" strokeWidth=".7" />
          <path d="M18 78 C44 98 84 88 94 56" strokeWidth=".9" />
        </svg>
        <span className="door-tag absolute right-[-2%] top-[4%] z-10 rotate-[8deg] rounded-xl border-2 border-cocoa bg-milk px-3 py-0.5 font-hand text-sm font-semibold shadow-[0_3px_0_rgb(42_23_14_/_.2)] transition-transform duration-300 group-hover:-rotate-3">Available</span>
        {video && <span className="absolute bottom-[10%] left-[4%] z-10 rounded-full bg-cocoa/85 px-2.5 py-0.5 text-xs font-bold text-milk">▶ video</span>}
        {/* sprinkles */}
        <svg viewBox="0 0 24 24" className="absolute -left-3 top-1/2 h-7 w-7 -rotate-12 transition-transform duration-300 group-hover:scale-125" fill="none" stroke="#2a170e" strokeWidth="2" aria-hidden><path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z" /></svg>
        <Paw className="absolute -right-4 bottom-[18%] h-5 w-5 rotate-12 text-toffee" />
        <svg viewBox="0 0 24 24" className="absolute -right-2 top-[42%] h-6 w-6 text-toffee-deep" fill="currentColor" aria-hidden><path d="M12 1c1 6 4 9 11 11-7 2-10 5-11 11-1-6-4-9-11-11 7-2 10-5 11-11z" /></svg>
      </div>
      <p className="display mt-9 text-2xl leading-tight">{label(p)}</p>
      <p className="text-sm font-semibold text-cocoa-soft">{sub(p)}</p>
    </Link>
  );
}

export default function PuppyFilter({ puppies }: { puppies: Puppy[] }) {
  const sp = useSearchParams();
  const f: F = { origin: sp.get("origin") ?? "", collection: sp.get("collection") ?? "", breed: sp.get("breed") ?? "", gender: sp.get("gender") ?? "" };
  const active = Object.values(f).some(Boolean);

  const shown = puppies.filter(
    (p) =>
      (!f.origin || p.origin === f.origin) &&
      (!f.collection || (f.collection === "korean-teacup" ? p.breed.startsWith("Korean Teacup") : true)) &&
      (!f.breed || norm(p.breed).includes(norm(f.breed))) &&
      (!f.gender || (f.gender === "boy" ? p.gender.startsWith("Boy") : p.gender.endsWith("girl") || p.gender === "Girl")),
  );

  const href = (patch: Partial<F>) => {
    const next = { ...f, ...patch };
    const q = new URLSearchParams();
    (Object.keys(next) as (keyof F)[]).forEach((k) => next[k] && q.set(k, next[k]));
    const s = q.toString();
    return s ? `/puppies?${s}` : "/puppies";
  };
  const chip = (on: boolean) =>
    `rounded-full border-2 border-cocoa px-4 py-1.5 text-sm font-bold transition-all duration-200 ${on ? "bg-cocoa text-milk -translate-y-0.5 shadow-[0_3px_0_rgb(142_63_21)]" : "bg-milk hover:-translate-y-0.5 hover:bg-honey-soft"}`;

  const row = (name: string, chips: React.ReactNode) => (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="hand w-16 shrink-0 text-toffee-ink">{name}</span>
      <div className="flex flex-wrap gap-2">{chips}</div>
    </div>
  );
  const toggle = (key: keyof F, v: string, text: string, extra: Partial<F> = {}) => (
    <Link key={v} href={href({ [key]: f[key] === v ? "" : v, ...extra })} scroll={false} replace className={chip(f[key] === v)} aria-pressed={f[key] === v}>{text}</Link>
  );

  return (
    <>
      <div className="paper relative space-y-4 p-5 md:p-6" role="group" aria-label="Filter puppies">
        <span className="absolute -top-3 left-8 h-5 w-20 -rotate-3 bg-honey/70" aria-hidden />
        {row("where", <>
          <Link href={href({ origin: "", collection: "" })} scroll={false} replace className={chip(!f.origin && !f.collection)}>Everywhere</Link>
          <Link href={href({ origin: f.origin === "imported" && !f.collection ? "" : "imported", collection: "" })} scroll={false} replace className={chip(f.origin === "imported" && !f.collection)}>Imported</Link>
          <Link href={href({ origin: "imported", collection: f.collection ? "" : "korean-teacup" })} scroll={false} replace className={chip(!!f.collection)}>Korean Teacup</Link>
        </>)}
        {row("breed", BREEDS.map(([v, l]) => toggle("breed", v, l)))}
        {row("boy or girl", <>{toggle("gender", "boy", "Boys")}{toggle("gender", "girl", "Girls")}</>)}
        {active && <Link href="/puppies" scroll={false} replace className="hand absolute right-5 top-4 text-sm text-toffee-ink underline underline-offset-4">Clear filters</Link>}
      </div>

      <p className="hand mt-8 text-toffee-ink" aria-live="polite">{active ? `${shown.length} puppies match` : `${puppies.length} puppies looking for a home`}</p>

      {shown.length ? (
        <ul className="dots mt-6 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <li key={p.slug}><PortraitTile p={p} i={i} priority={i < 3} /></li>
          ))}
        </ul>
      ) : (
        <div className="paper mx-auto mt-12 max-w-lg p-8 text-center">
          <p className="display text-3xl">No pups match — yet</p>
          <p className="mt-2 text-cocoa-soft">Tell us what you&apos;re looking for and we&apos;ll source it for you.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/puppies" replace className="btn btn-ghost">Clear filters</Link>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-leaf">Ask on WhatsApp</a>
          </div>
        </div>
      )}
    </>
  );
}
