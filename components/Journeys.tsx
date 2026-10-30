"use client";
import { useState } from "react";
import PupStop from "./pup/PupStop";

type J = { id: string; label: string; hint: string; heading: string; meta: string; body: string; steps: string[][] };

/** Segmented "In Dubai / Imported" switch with the step cards beneath. */
export default function Journeys({ journeys }: { journeys: J[] }) {
  const [id, setId] = useState(journeys[0].id);
  const j = journeys.find((x) => x.id === id)!;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div role="tablist" aria-label="Choose your way" className="relative inline-grid grid-cols-2 rounded-full border-[3px] border-cocoa bg-milk p-1.5 shadow-[0_5px_0_rgb(42_23_14_/_.85)]">
          <span aria-hidden className="absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-toffee-deep transition-transform duration-500 [transition-timing-function:var(--ease-pounce)]" style={{ transform: id === journeys[0].id ? "none" : "translateX(100%)" }} />
          {journeys.map((x) => (
            <button key={x.id} role="tab" aria-selected={x.id === id} aria-controls={`panel-${x.id}`} onClick={() => setId(x.id)}
              className={`relative z-10 rounded-full px-6 py-2.5 text-center transition-colors duration-300 md:px-9 ${x.id === id ? "text-milk" : "text-cocoa"}`}>
              <span className="display block text-lg leading-tight">{x.label}</span>
              <span className="block text-[11px] font-semibold opacity-80">{x.hint}</span>
            </button>
          ))}
        </div>
        <PupStop pose="sit" facing="left" className="w-28 md:w-36" />
      </div>

      <div key={j.id} id={`panel-${j.id}`} role="tabpanel" className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr] [animation:msg-in_.5s_var(--ease-silk)]">
        <div className="paper p-6 md:p-8">
          <h3 className="display text-3xl">{j.heading}</h3>
          <p className="mt-3 text-cocoa-soft">{j.body}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-honey-soft px-3 py-1 text-sm font-bold">📍 {j.meta}</p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2">
          {j.steps.map(([t, b], i) => (
            <li key={t} className="paper p-5" style={{ transform: `rotate(${[-0.8, 0.7, 0.5, -0.6][i % 4]}deg)` }}>
              <p className="hand text-xs text-toffee-ink">Step {i + 1}</p>
              <h4 className="display mt-1 text-xl">{t}</h4>
              <p className="mt-1 text-sm text-cocoa-soft">{b}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
