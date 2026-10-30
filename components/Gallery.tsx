"use client";
import Image from "next/image";
import { useState } from "react";
import type { GalleryItem } from "@/lib/puppies";

export default function Gallery({ items, alt }: { items: GalleryItem[]; alt: string }) {
  const [i, setI] = useState(0);
  const [play, setPlay] = useState(false);
  const cur = items[i];
  const go = (n: number) => {
    setPlay(false);
    setI((n + items.length) % items.length);
  };

  return (
    <div>
      <div className="paper relative aspect-[4/5] overflow-hidden !rounded-3xl bg-honey-soft">
        {play && cur.video ? (
          <video src={cur.video} poster={cur.src} controls autoPlay playsInline className="h-full w-full object-cover" />
        ) : (
          <>
            <Image key={cur.src} src={cur.src} alt={i === 0 ? alt : `${alt}, photo ${i + 1}`} fill priority={i === 0} sizes="(min-width:1024px) 40rem, 100vw" className="object-cover" />
            {cur.video && (
              <button onClick={() => setPlay(true)} aria-label="Play video" className="absolute inset-0 grid place-items-center bg-cocoa/10">
                <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-cocoa bg-milk text-2xl shadow-[0_4px_0_rgb(42_23_14)]">▶</span>
              </button>
            )}
          </>
        )}
        {items.length > 1 && (
          <>
            <button onClick={() => go(i - 1)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-2 border-cocoa bg-milk text-xl font-bold">‹</button>
            <button onClick={() => go(i + 1)} aria-label="Next photo" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-2 border-cocoa bg-milk text-xl font-bold">›</button>
            <span className="absolute bottom-3 right-3 rounded-full bg-cocoa/85 px-3 py-1 text-xs font-bold text-milk">{i + 1} / {items.length}</span>
          </>
        )}
      </div>
      {items.length > 1 && (
        <ul className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {items.map((g, n) => (
            <li key={g.src} className="shrink-0">
              <button onClick={() => go(n)} aria-label={`Show photo ${n + 1}`} aria-current={n === i} className={`relative block h-16 w-16 overflow-hidden rounded-lg border-2 ${n === i ? "border-toffee-deep" : "border-cocoa/30"}`}>
                <Image src={g.src} alt="" fill sizes="4rem" className="object-cover" />
                {g.video && <span className="absolute inset-0 grid place-items-center bg-cocoa/30 text-xs text-milk">▶</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
