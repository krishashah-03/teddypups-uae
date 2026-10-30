"use client";
import { useMemo, useState } from "react";
import PupStop from "./pup/PupStop";
import { cuePup } from "./pup/PupJourney";
import { wa } from "@/lib/site";

const PINS = ["#d94f4f", "#3d6fd1", "#e0a43a", "#d94f8a", "#e07a3a", "#3d6fd1"];

/** Cork-board FAQ: searchable pinned notes that fold open. */
export default function FaqBoard({ items }: { items: readonly [string, string][] }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  const shown = useMemo(() => {
    const n = q.trim().toLowerCase();
    return items.map((it, i) => ({ it, i })).filter(({ it }) => !n || (it[0] + " " + it[1]).toLowerCase().includes(n));
  }, [q, items]);

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
      <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
        <label className="hand block text-honey" htmlFor="faq-search">sniff out a question</label>
        <div className="mt-2 flex items-center gap-2 rounded-full border-2 border-cocoa bg-milk px-4 py-2.5 text-cocoa focus-within:ring-4 focus-within:ring-honey/50">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
          <input id="faq-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="delivery, Korea, vaccinated…" className="w-full bg-transparent text-sm text-cocoa outline-none placeholder:text-cocoa-soft/60" />
        </div>
        <p className="hand mt-3 text-sm text-milk/80" aria-live="polite">{shown.length} {shown.length === 1 ? "note" : "notes"} on the board</p>
        <PupStop pose="sit" act="tilt" className="mt-6 hidden w-44 lg:block" />
        <a href={wa("Hi TeddyPups! I have a question.")} target="_blank" rel="noopener" onMouseEnter={() => cuePup({ say: "woof woof!", hop: 0.6 })} className="btn btn-leaf mt-4">
          Ask your own question
        </a>
      </aside>

      <div className="rounded-3xl border-[6px] border-[#6b4226] p-4 shadow-[0_8px_0_rgb(0_0_0_/_.25)] md:p-6" style={{ background: "radial-gradient(rgb(0 0 0 / .13) 1px, transparent 1.4px) 0 0 / 7px 7px, #b98655" }}>
        {shown.length ? (
          <ul className="space-y-6">
            {shown.map(({ it: [question, answer], i }, n) => {
              const isOpen = open === i;
              return (
                <li key={question} className="relative" style={{ marginLeft: n % 2 ? "1.5rem" : 0, marginRight: n % 2 ? 0 : "1.5rem", transform: `rotate(${[-0.6, 0.5, -0.3, 0.7][n % 4]}deg)` }}>
                  <span className="absolute -top-2.5 left-1/2 z-10 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-cocoa shadow-[0_3px_0_rgb(0_0_0_/_.3)]" style={{ background: PINS[i % PINS.length] }} aria-hidden />
                  <div className="relative rounded-md border-2 border-cocoa bg-milk text-cocoa shadow-[3px_5px_0_rgb(0_0_0_/_.28)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-1.1rem),calc(100%-1.1rem)_100%,0_100%)]">
                    <button className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-lg font-extrabold md:text-xl" aria-expanded={isOpen} aria-controls={`note-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                      {question}
                      <svg viewBox="0 0 24 24" className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    <div id={`note-${i}`} className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <p className={`overflow-hidden px-5 text-cocoa-soft ${isOpen ? "pb-5" : ""}`}>{answer}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="hand py-12 text-center text-lg text-cocoa">No notes match “{q}”. Try another word, or ask us on WhatsApp!</p>
        )}
      </div>
    </div>
  );
}
