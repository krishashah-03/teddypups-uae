import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { available, bySlug, gone, puppies } from "@/lib/puppies";
import { wa } from "@/lib/site";
import Gallery from "@/components/Gallery";
import { PuppyEnquiryForm } from "@/components/EnquiryForm";
import { Check } from "@/components/Icons";
import PupStop from "@/components/pup/PupStop";

export function generateStaticParams() {
  return puppies.map((p) => ({ slug: p.slug }));
}

const title = (p: NonNullable<ReturnType<typeof bySlug>>) =>
  `${p.name ? `${p.name}, ` : ""}${p.breed} puppy${p.name ? "" : ` (${p.gender.toLowerCase()})`}`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug);
  if (!p) return {};
  return { title: title(p), description: `${p.name ?? p.breed} — ${p.breed}, ${p.gender.toLowerCase()}, ${p.age}.`, openGraph: { images: [p.card] } };
}

const IMPORT_STEPS = [
  ["Reserve your puppy", "Tell us which puppy has captured your heart."],
  ["Personalized consultation", "We finalize details with you and share updates on your puppy's journey."],
  ["Import and arrival", "We manage health checks, travel arrangements, and documentation."],
  ["Welcome home", "We help your new puppy settle in and ensure a smooth transition into your home."],
];
const LOCAL_STEPS = [
  ["Explore our puppies", "Browse photos, breed details, age and health information."],
  ["Meet before you choose", "Visit our Downtown Dubai showroom and spend time bonding."],
  ["Pick-up or delivery", "Take your puppy home the same day, or have them delivered within Dubai."],
];

export default async function PuppyPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug((await params).slug);
  if (!p) notFound();

  const isGone = p.status === "gone";
  const list = isGone ? gone : available;
  const idx = list.findIndex((x) => x.slug === p.slug);
  const prev = list[(idx - 1 + list.length) % list.length];
  const next = list[(idx + 1) % list.length];
  const who = p.name ?? `this ${p.breed}`;
  const imported = p.origin === "imported";
  const steps = imported ? IMPORT_STEPS : LOCAL_STEPS;
  const waText = p.name
    ? `Hi TeddyPups! I'm interested in ${p.name}, the ${p.breed}: https://puppy.instabizweb.com/puppies/${p.slug}`
    : `Hi TeddyPups! I'm interested in the ${p.breed} puppy: https://puppy.instabizweb.com/puppies/${p.slug}`;

  const facts: [string, string][] = [
    ["Breed", p.breed],
    ["Boy or girl", p.gender],
    ["Age", p.age],
    ...(p.colour ? ([["Colour", p.colour]] as [string, string][]) : []),
    ["Where", imported ? "Imported for you" : "In Dubai"],
  ];

  return (
    <div className="bg-gradient-to-b from-honey-soft via-milk to-milk pb-24 pt-8">
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="text-sm font-semibold text-cocoa-soft">
          <Link href={isGone ? "/gone-home" : "/puppies"} className="underline-offset-4 hover:underline">{isGone ? "Gone home" : "Available puppies"}</Link>
          <span aria-hidden> / </span>{p.name ?? p.breed}
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="hand mb-3 text-toffee-ink">{isGone ? "the day they went home" : "hello, it's me"}</p>
            <Gallery items={p.gallery} alt={p.alt} />
          </div>

          <div>
            <span className="inline-block rounded-full border-2 border-cocoa bg-milk px-3 py-1 text-sm font-bold">{isGone ? "Gone home ♥" : "Available"}</span>
            <h1 className="display mt-3 text-5xl md:text-6xl">{p.name ? `${p.name} ` : ""}<span className={p.name ? "block text-3xl text-cocoa-soft md:text-4xl" : ""}>{p.breed}</span></h1>
            <div className="relative mt-16">
            <PupStop pose="peek" act="tilt" className="absolute -top-[6.2rem] right-6 w-40" />
            <dl className="paper grid grid-cols-2 gap-x-6 gap-y-4 p-6">
              {facts.map(([k, v]) => (
                <div key={k}><dt className="hand text-xs text-toffee-ink">{k}</dt><dd className="text-lg font-bold">{v}</dd></div>
              ))}
            </dl>
            </div>
            {p.note && <p className="mt-3 text-sm font-semibold text-cocoa-soft">{p.note}</p>}
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={wa(waText)} target="_blank" rel="noopener" className="btn btn-leaf">{isGone ? "Ask about a puppy like this" : `Ask about ${p.name ?? "this puppy"} on WhatsApp`}</a>
              <a href={`#enquire-${p.slug}`} className="btn btn-ghost">Send an enquiry</a>
            </div>

            <section className="mt-10">
              <p className="hand text-toffee-ink">2 · what comes with {p.name ?? `this ${p.breed}`}</p>
              <p className="display mt-1 text-2xl">Every Teddy Pup comes</p>
              <ul className="mt-3 space-y-2 font-semibold">
                {["Vaccinated", "Dewormed", "Verified health certificate from licensed vets", "Thoroughly checked before joining your family"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-leaf text-milk"><Check className="h-3.5 w-3.5" /></span>{t}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <section className="mt-16">
          <p className="hand text-toffee-ink">3 · the way home</p>
          <h2 className="display mt-1 text-4xl">{imported ? "Coming home from abroad" : "Meet and take home"}</h2>
          <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([t, b], i) => (
              <li key={t} className="paper p-5">
                <span className="display grid h-9 w-9 place-items-center rounded-full bg-toffee-deep text-milk">{i + 1}</span>
                <h3 className="display mt-3 text-xl">{t}</h3>
                <p className="mt-1 text-sm text-cocoa-soft">{b}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="hand text-toffee-ink">4 · dear TeddyPups…</p>
            <h2 className="display mt-1 text-4xl">{isGone ? "Looking for a puppy like this?" : `Ask about ${who}`}</h2>
            <p className="mt-3 text-cocoa-soft">Leave your details and our team will get back to you promptly — or message us on WhatsApp for the quickest reply.</p>
          </div>
          <PuppyEnquiryForm id={`enquire-${p.slug}`} label={p.name ? `${p.name} (${p.breed})` : `${p.breed} (${p.gender.toLowerCase()})`}
            defaultMessage={isGone ? "Hi! I'm looking for a puppy like this one." : `Hi! I'd love to know more about ${p.name ?? "this"} (${p.breed}).`} />
        </section>

        <nav aria-label="More puppies" className="mt-16 grid gap-4 sm:grid-cols-2">
          {[["Previous pup", prev], ["Next pup", next]].map(([l, q]) => {
            const x = q as typeof prev;
            return (
              <Link key={l as string} href={`/puppies/${x.slug}`} className="paper flex items-center gap-4 p-3 transition-transform hover:-translate-y-1">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl"><Image src={x.card} alt={x.alt} fill sizes="5rem" className="object-cover" /></div>
                <div><p className="hand text-xs text-toffee-ink">{l as string}</p><p className="display text-xl">{x.name ?? x.breed}</p></div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
