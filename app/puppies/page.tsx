import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { available } from "@/lib/puppies";
import PuppyFilter from "@/components/PuppyFilter";
import PupStop from "@/components/pup/PupStop";
import Floaters from "@/components/Floaters";

export const metadata: Metadata = {
  title: "Available puppies",
  description: "Real photos of the actual puppies looking for their families right now in Dubai.",
};

export default function PuppiesPage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-honey-soft via-milk to-milk pb-24 pt-12 md:pt-16">
      <Floaters kind="paws" count={8} />
      <div className="wrap relative">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="hand text-toffee-ink">from Teddy&apos;s sketchbook</p>
            <h1 className="display relative mt-1 inline-block text-5xl md:text-7xl">
              Available puppies
              <svg viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute -bottom-3 left-0 h-3 w-full text-toffee" aria-hidden>
                <path d="M2 9 C40 2 80 12 120 6 S200 2 240 8 S285 7 298 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cocoa-soft">
              Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
            </p>
          </div>
          <div className="hidden shrink-0 text-center sm:block">
            <div className="relative h-32 w-32 rounded-full border-[3px] border-cocoa bg-honey-soft">
              <PupStop pose="peek" act="tilt" className="absolute bottom-[-0.5rem] left-1/2 w-40 -translate-x-1/2" />
            </div>
            <p className="hand mt-1 text-sm">self-portrait</p>
          </div>
        </div>
        <div className="mt-10">
          <Suspense fallback={<div className="h-96" />}>
            <PuppyFilter puppies={available} />
          </Suspense>
        </div>
        <section className="paper relative mt-24 flex flex-wrap items-center justify-between gap-4 p-6 md:p-8">
          <PupStop pose="sit" facing="left" className="absolute -top-[5.2rem] right-8 hidden w-36 md:block" />
          <div>
            <h2 className="display text-3xl">Already gone home</h2>
            <p className="text-cocoa-soft">These puppies have found their families.</p>
          </div>
          <Link href="/gone-home" className="btn btn-toffee">See the puppies who found a home</Link>
        </section>
      </div>
    </div>
  );
}
