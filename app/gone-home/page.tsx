import type { Metadata } from "next";
import Link from "next/link";
import { gone } from "@/lib/puppies";
import { Ticket } from "@/components/PuppyCards";
import Reveal from "@/components/Reveal";
import PupStop from "@/components/pup/PupStop";

export const metadata: Metadata = {
  title: "Gone home",
  description: "Every puppy here has already joined a loving family.",
};

export default function GoneHome() {
  return (
    <div className="bg-gradient-to-b from-blush/60 to-milk pb-24 pt-12 md:pt-16">
      <div className="wrap relative">
        <PupStop pose="sit" facing="left" className="absolute right-6 top-2 hidden w-40 md:block" />
        <p className="hand text-toffee-ink">tickets home</p>
        <h1 className="display mt-1 text-5xl md:text-7xl">Gone home</h1>
        <p className="mt-4 max-w-xl text-lg text-cocoa-soft">Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we&apos;ll help you find your match.</p>
        <Link href="/puppies" className="btn btn-toffee mt-6">See available puppies</Link>
        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {gone.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 80}><Ticket p={p} /></Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
