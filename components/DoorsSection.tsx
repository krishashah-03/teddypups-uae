"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Puppy } from "@/lib/puppies";
import { DoorCard } from "./PuppyCards";
import PupStop from "./pup/PupStop";
import { cuePup } from "./pup/PupJourney";
import { Arrow } from "./Icons";

const LINES = ["boing!", "woof woof!", "who's in there?", "zoomies!", "sniff sniff…", "I like you!"];

/**
 * "Meet the pups": on desktop the section pins while vertical scrolling pans the row of doors
 * sideways. Teddy trots along the floor and the door he's standing at swings open.
 * On phones it's a plain swipeable row.
 */
export default function DoorsSection({ puppies }: { puppies: Puppy[] }) {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const o = outer.current!, t = track.current!;
    let raf = 0;
    let overflow = 0, current = 0;

    const headerH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) * 16 || 76;

    function layout() {
      if (!mq.matches) {
        o.style.height = "";
        t.style.transform = "";
        return;
      }
      const stickyH = window.innerHeight - headerH();
      overflow = Math.max(0, t.scrollWidth - window.innerWidth + 120);
      o.style.height = `${stickyH + overflow}px`;
      update();
    }

    function update() {
      raf = 0;
      if (!mq.matches) return;
      const p = Math.min(1, Math.max(0, (headerH() - o.getBoundingClientRect().top) / (overflow || 1)));
      t.style.transform = `translate3d(${-p * overflow}px,0,0)`;
      // door nearest to Teddy (he stays at ~24% of the viewport)
      const dogX = window.innerWidth * 0.24;
      let best = 0, bestD = Infinity;
      Array.from(t.children).forEach((el, i) => {
        if (i >= puppies.length) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - dogX);
        if (d < bestD) { bestD = d; best = i; }
      });
      if (best !== current) {
        current = best;
        setActive(best);
        cuePup({ look: t.children[best], say: LINES[Math.floor(Math.random() * LINES.length)], secs: 1, hop: 0.4 });
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    mq.addEventListener("change", layout);
    const imgs = o.querySelectorAll("img");
    imgs.forEach((im) => im.addEventListener("load", layout, { once: true }));
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      mq.removeEventListener("change", layout);
      cancelAnimationFrame(raf);
    };
  }, [puppies.length]);

  return (
    <section ref={outer} className="relative">
      <div className="flex flex-col overflow-hidden md:sticky md:top-[var(--header-h)] md:h-[calc(100svh-var(--header-h))]">
        <div className="wrap flex w-full flex-wrap items-end justify-between gap-6 pb-6 pt-12 md:pt-16">
          <div>
            <h2 className="display text-5xl md:text-7xl">Meet the pups</h2>
            <p className="mt-3 text-lg text-cocoa-soft">Real puppies, real photos, looking for their families right now.</p>
          </div>
          <Link href="/puppies" className="btn btn-toffee">See all available puppies</Link>
        </div>

        <div className="relative min-h-[26rem] flex-1">
          <div className="absolute inset-x-0 bottom-[clamp(4rem,11vh,7rem)] overflow-x-auto md:overflow-visible [scrollbar-width:none]">
            <ul ref={track} className="flex w-max items-end gap-8 px-[var(--gutter)] md:gap-14 md:pl-[34vw]">
              {puppies.map((p, i) => (
                <li key={p.slug} className="w-36 shrink-0 md:w-[clamp(8rem,17vh,11rem)]">
                  <DoorCard p={p} i={i} open={active === i} />
                </li>
              ))}
              <li className="w-36 shrink-0 self-end md:w-[clamp(8rem,17vh,11rem)]">
                <Link href="/puppies" className="group grid aspect-[3/4.4] place-items-center rounded-t-full border-[3px] border-dashed border-cocoa/70 p-4 text-center transition-colors hover:bg-milk/50">
                  <span className="display text-2xl leading-tight">Meet them all <Arrow className="inline h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="floor absolute inset-x-0 bottom-0 h-[clamp(4rem,11vh,7rem)]" aria-hidden />
          <PupStop pose="stand" act="treadmill" className="absolute bottom-[calc(clamp(4rem,11vh,7rem)-1.3rem)] left-[3%] w-36 md:left-[24%] md:w-[clamp(9rem,19vh,14rem)] md:-translate-x-1/2" />
        </div>
      </div>
    </section>
  );
}
