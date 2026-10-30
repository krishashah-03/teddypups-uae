import type { Metadata } from "next";
import Image from "next/image";
import { ContactLetter } from "@/components/EnquiryForm";
import { available } from "@/lib/puppies";
import Floaters from "@/components/Floaters";
import PupStop from "@/components/pup/PupStop";
import { EMAIL, MAPS, PHONE, PHONE_TEL, WHATSAPP } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit & contact",
  description: "Visit our Downtown Dubai showroom, call, WhatsApp or write to us.",
};

const optionLabel = (p: (typeof available)[number]) =>
  `${p.name ? `${p.name} (${p.breed}, ${p.gender.toLowerCase()})` : `${p.breed} (${p.gender.toLowerCase()})`}`;

export default function Contact() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-honey-soft to-milk pb-24 pt-12 md:pt-16">
      <Floaters kind="paws" count={12} />
      <div className="wrap relative">
        <h1 className="display text-5xl md:text-7xl">Get in touch with us</h1>
        <p className="mt-4 max-w-2xl text-lg text-cocoa-soft">Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we&apos;d love to hear from you!</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <ContactLetter options={available.map(optionLabel)} />
          <aside className="space-y-4">
            <a href={WHATSAPP} target="_blank" rel="noopener" className="paper block p-5 transition-transform hover:-translate-y-1"><p className="hand text-xs text-toffee-ink">WhatsApp</p><p className="text-lg font-bold">{PHONE}</p></a>
            <a href={PHONE_TEL} className="paper block p-5 transition-transform hover:-translate-y-1"><p className="hand text-xs text-toffee-ink">call us</p><p className="text-lg font-bold">{PHONE}</p></a>
            <a href={`mailto:${EMAIL}`} className="paper block p-5 transition-transform hover:-translate-y-1"><p className="hand text-xs text-toffee-ink">email</p><p className="break-all text-lg font-bold">{EMAIL}</p></a>
            <PupStop pose="sit" act="tilt" className="hidden w-40 lg:block" />
          </aside>
        </div>

        <section className="paper mt-16 grid overflow-hidden md:grid-cols-2">
          <div className="h-6 md:col-span-2" style={{ background: "repeating-linear-gradient(90deg,#a24a1a 0 22px,#fffdf8 22px 44px)", borderBottom: "3px solid #2a170e" }} aria-hidden />
          <div className="p-6 md:p-10">
            <h2 className="display text-4xl">Visit us in Downtown Dubai</h2>
            <p className="mt-3 text-cocoa-soft">Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.</p>
            <p className="mt-4 font-bold">Downtown Dubai, United Arab Emirates</p>
            <a href={MAPS} target="_blank" rel="noopener" className="btn btn-toffee mt-5">Open in Google Maps</a>
          </div>
          <div className="relative min-h-72">
            <Image src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg" alt="The apricot teddy bear puppy from our showroom, held up to say hello" fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
          </div>
        </section>
      </div>
    </div>
  );
}
