"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, PHONE, WHATSAPP } from "@/lib/site";
import { Paw } from "./Icons";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const [lastPath, setLastPath] = useState(path);
  if (lastPath !== path) {
    setLastPath(path);
    setOpen(false);
  }
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header id="site-header" className="sticky top-0 z-50 bg-milk" style={{ height: "var(--header-h)" }}>
      <div className="scallop-down" aria-hidden />
      <div className="wrap flex h-full items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-extrabold">
          <Image src="/brand/logo.png" alt="" width={40} height={40} priority className="rounded-full" />
          TeddyPups
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}
              className={`relative flex flex-col items-center text-sm font-semibold transition-colors hover:text-toffee ${active(n.href) ? "text-toffee-deep" : ""}`}>
              {n.label}
              {active(n.href) && <Paw className="absolute -bottom-3 h-2.5 w-2.5 text-toffee" />}
            </Link>
          ))}
        </nav>

        <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-leaf hidden md:inline-flex !py-2 !px-5 !text-sm">
          WhatsApp us
        </a>

        <button className="md:hidden btn btn-ghost !py-1.5 !px-4 !text-sm" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu">
          Menu
        </button>
      </div>

      {open && (
        <div id="menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] flex flex-col bg-honey-soft p-6 md:hidden">
          <div className="flex items-center justify-between">
            <span className="hand text-toffee-ink">where to, friend?</span>
            <button className="btn btn-ghost !py-1.5 !px-4 !text-sm" onClick={() => setOpen(false)}>Close</button>
          </div>
          <nav className="mt-8 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={`display text-4xl py-2 ${active(n.href) ? "text-toffee-deep" : ""}`}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-leaf">WhatsApp us</a>
            <p className="text-center font-semibold">{PHONE}</p>
          </div>
        </div>
      )}
    </header>
  );
}
