"use client";
import { useState } from "react";

export default function FaqList({ items, tone = "light" }: { items: readonly [string, string][]; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);
  const dark = tone === "dark";
  return (
    <ul className={`divide-y-2 ${dark ? "divide-milk/20" : "divide-cocoa/15"}`}>
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <li key={q}>
            <button
              className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-bold"
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {q}
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-xl leading-none transition-transform duration-300 ${dark ? "border-milk" : "border-cocoa"} ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            <div id={`faq-${i}`} role="region" className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <p className={`overflow-hidden ${isOpen ? "pb-5" : ""} ${dark ? "text-milk/80" : "text-cocoa-soft"}`}>{a}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
