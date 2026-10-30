import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Journeys from "@/components/Journeys";
import Floaters from "@/components/Floaters";
import PupStop from "@/components/pup/PupStop";
import { FlightPath, Skyline } from "@/components/Scenes";
import { WHATSAPP } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description: "Visit us in Dubai or order a premium breed from overseas — here is how TeddyPups makes it simple.",
};

const JOURNEYS = [
  {
    id: "local", label: "In Dubai", hint: "meet in person", heading: "Meet your puppy in person", meta: "Downtown Dubai",
    body: "Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they're raised with care, proper nutrition, and veterinary checks.",
    steps: [
      ["Explore our puppies", "Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information."],
      ["Choose your puppy", "Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions."],
      ["Meet before you choose", "Spend time bonding before making your decision."],
      ["Pick-up or delivery", "Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably."],
    ],
  },
  {
    id: "imported", label: "Imported", hint: "order upon request", heading: "Order upon request", meta: "Europe · Korea  →  Dubai",
    body: "Looking for a truly exceptional companion? Our Order Upon Request service gives you access to some of the world's most sought-after teacup breeds — ethically sourced from the most reputable, certified breeders across Europe, Korea, and beyond. From Korean teacup poodles to rare Maltese, Pom, and Yorkie lines, we bring the world's finest puppies to Dubai, just for you.",
    steps: [
      ["Reserve your puppy", "Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences."],
      ["Personalized consultation", "Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy's journey."],
      ["Import and arrival", "We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation. Your puppy will be carefully transported and will arrive ready to join your family."],
      ["Welcome home", "Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home."],
    ],
  },
];
const PROMISE = [
  ["Hand-selected breeders", "We work only with breeders who uphold the highest ethical and health standards."],
  ["Full transparency", "Photos, videos, and health certificates are shared before your puppy travels."],
  ["Safe, stress-free delivery", "We handle every detail of the import process, so your puppy arrives happy, healthy, and ready to love you."],
];
const DELIVERY = [
  ["Take your puppy home the same day", "Local puppies are available immediately — visit, fall in love, and go home together."],
  ["Delivery within Dubai", "Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably."],
  ["Safe international cargo", "We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free."],
];
const WHY = [
  ["International cargo", "We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance."],
  ["Support 24/7", "Our team is available 24/7 to answer your questions and assist you through every step of the adoption process. From choosing your puppy to post-delivery support — we're just a message away."],
  ["Health guarantee", "All our puppies come with a verified health certificate from licensed vets. We ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining your family."],
  ["Unique and high quality puppies", "When you choose TeddyPups, you can trust that you're getting a puppy of the highest quality. We also provide guidance and support to new pet owners, offering advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend."],
];

export default function HowItWorks() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-honey-soft via-milk to-honey-soft pt-12 md:pt-16">
      <Floaters kind="paws" count={10} />
      <div className="wrap relative pb-24">
        <h1 className="display text-5xl md:text-7xl">How it works</h1>
        <p className="mt-4 max-w-2xl text-lg text-cocoa-soft">Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.</p>

        <nav aria-label="On this page" className="sticky z-30 mt-8 flex gap-2 overflow-x-auto py-2 [scrollbar-width:none]" style={{ top: "var(--header-h)" }}>
          {[["#two-ways", "Two ways home"], ["#promise", "Our premium puppy promise"], ["#delivery", "Delivery & collection"], ["#why", "Why choose us"]].map(([h, l], i) => (
            <a key={h} href={h} className="flex shrink-0 items-center gap-2 rounded-full border-2 border-cocoa bg-milk px-4 py-1.5 text-sm font-bold hover:bg-honey-soft">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-toffee-deep text-xs text-milk">{i + 1}</span>{l}
            </a>
          ))}
        </nav>

        <section id="two-ways" className="mt-16">
          <p className="hand text-toffee-ink">choose your way</p>
          <h2 className="display mt-1 text-4xl md:text-5xl">Two ways home</h2>
          <div className="mt-8"><Journeys journeys={JOURNEYS} /></div>
        </section>

        <section id="promise" className="mt-20">
          <p className="hand text-toffee-ink">puppy passport</p>
          <h2 className="display mt-1 text-4xl md:text-5xl">Our premium puppy promise</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {PROMISE.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 90} className="paper p-6"><h3 className="display text-2xl">{t}</h3><p className="mt-2 text-cocoa-soft">{b}</p></Reveal>
            ))}
          </ul>
        </section>

        <section id="delivery" className="mt-20">
          <h2 className="display text-4xl md:text-5xl">Delivery &amp; collection</h2>
          <p className="mt-3 max-w-2xl text-lg text-cocoa-soft">From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.</p>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {DELIVERY.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 90} className="paper p-6"><h3 className="display text-2xl">{t}</h3><p className="mt-2 text-cocoa-soft">{b}</p></Reveal>
            ))}
          </ul>
          <div className="relative mt-8 overflow-hidden rounded-3xl bg-night p-6 text-milk md:p-8">
            <Skyline className="absolute bottom-0 right-0 h-3/4 w-1/2 opacity-30" stroke="#fbe3b4" />
            <FlightPath className="absolute right-4 top-2 hidden w-80 md:block [&_text]:fill-[#fbe3b4]" />
            <h3 className="display text-3xl">Worldwide delivery</h3>
            <p className="mt-2 max-w-2xl text-milk/80">We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.</p>
            <p className="hand relative mt-4 text-honey">Korea ✈ Dubai</p>
          </div>
        </section>

        <section id="why" className="mt-20">
          <h2 className="display text-4xl md:text-5xl">Why choose us</h2>
          <p className="mt-3 max-w-2xl text-lg text-cocoa-soft">We&apos;re here to help you find a new family member. From the moment you visit our site to the joyful day your puppy arrives at your door, we&apos;re with you every step of the way. Our mission is to make the entire adoption process smooth, transparent, and full of love.</p>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {WHY.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={(i % 2) * 90} className="paper p-6"><h3 className="display text-2xl">{t}</h3><p className="mt-2 text-cocoa-soft">{b}</p></Reveal>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-leaf">Ask us on WhatsApp</a>
            <Link href="/puppies" className="btn btn-toffee">See available puppies</Link>
            <PupStop pose="stand" facing="left" className="ml-auto w-36" />
          </div>
        </section>
      </div>
      <div className="night-sky relative h-28 [clip-path:ellipse(75%_100%_at_50%_100%)]" />
    </div>
  );
}
