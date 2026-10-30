import Image from "next/image";
import Link from "next/link";
import { available, bySlug } from "@/lib/puppies";
import { homeFamilies } from "@/lib/families";
import { FAQS, WHATSAPP } from "@/lib/site";
import Reveal from "@/components/Reveal";
import FaqList from "@/components/FaqList";
import DoorsSection from "@/components/DoorsSection";
import PupStop from "@/components/pup/PupStop";
import Floaters, { Moon } from "@/components/Floaters";
import { Booth, FlightPath, HouseScene, Phone, Skyline } from "@/components/Scenes";

const HERO_SLUGS = ["maltipoo-max-male", "korean-teacup-maltipoo-female", "korean-teacup-poodle-female", "maltipoo-cavapoo-male", "toy-poodle-male-female", "maltipoo-female-2"];
const SHOWROOM = "/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg";
const STEPS = [
  ["Choose your breed", "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle."],
  ["Get photos & details", "Our team will share real photos, health details, and all necessary information directly on WhatsApp."],
  ["Secure & safe delivery", "Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free."],
];
const TRUST = [
  ["Vet-checked & healthy", "Every puppy comes vaccinated, dewormed, and with a verified health certificate."],
  ["Korea to Dubai, safely", "Trusted breeders, safe travel, and premium care from start to finish."],
  ["Support 24/7", "Always here to help, from choosing your puppy to post-delivery support."],
  ["Trusted by families worldwide", "Puppies delivered to loving homes all around the world."],
];

export default function Home() {
  const heroes = HERO_SLUGS.map((s) => bySlug(s)!);
  const mid = Math.floor(heroes.length / 2);
  const arches = [...heroes.slice(0, mid), null, ...heroes.slice(mid)];
  const heights = ["h-24 md:h-36", "h-32 md:h-48", "h-24 md:h-36", "", "h-28 md:h-40", "h-32 md:h-52", "h-20 md:h-32"];

  return (
    <div className="bg-gradient-to-b from-milk via-honey-soft via-[10%] to-honey/70 to-[40%]">
      {/* HERO */}
      <section data-pup-scene className="relative overflow-hidden pt-10 md:pt-14">
        <div className="absolute left-1/2 top-[55%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-honey/40 blur-3xl" aria-hidden />
        <Floaters kind="paws" count={10} />
        <div className="wrap relative text-center">
          <p className="hand text-lg text-toffee-ink md:text-xl">every puppy is family</p>
          <h1 className="display mx-auto mt-2 max-w-4xl text-5xl text-balance sm:text-6xl md:text-8xl">Premium teacup puppies in Dubai</h1>
          <p className="mx-auto mt-5 max-w-lg text-cocoa-soft text-balance md:text-lg">
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/puppies" className="btn btn-toffee">View available puppies</Link>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-ghost">Enquire on WhatsApp</a>
          </div>
        </div>

        <div className="relative mt-10 md:mt-14">
          <div className="wrap flex items-end justify-center gap-2 md:gap-5">
            {arches.map((p, i) =>
              p ? (
                <Link key={p.slug} href={`/puppies/${p.slug}`} aria-label={p.alt} data-pup-look
                  className={`relative block w-[16%] max-w-40 overflow-hidden rounded-t-full border-[3px] border-b-0 border-cocoa bg-milk transition-transform duration-300 hover:-translate-y-2 ${heights[i]} ${i > 4 ? "hidden sm:block" : ""}`}>
                  <Image src={p.card} alt={p.alt} fill sizes="10rem" className="object-cover" priority={i < 3} />
                </Link>
              ) : (
                <PupStop key="pup" pose="peek" act="peekaboo" behind lane className="-mb-9 w-[30%] max-w-64 shrink-0" />
              ),
            )}
          </div>
          <div className="scallop pup-front" aria-hidden />
          <div className="lattice pup-front h-24 bg-honey-soft md:h-32" aria-hidden />
        </div>
      </section>

      {/* MEET THE PUPS — pinned, scroll-driven */}
      <DoorsSection puppies={available} />

      {/* TWO WAYS */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <Floaters kind="paws" count={8} />
        <div className="wrap relative">
          <Reveal className="text-center"><h2 className="display mx-auto max-w-2xl text-5xl text-balance md:text-7xl">Two ways to meet your puppy</h2></Reveal>

          <div className="relative mx-auto mt-10 grid max-w-5xl grid-cols-[1fr_auto_1fr] items-end gap-3 md:gap-8">
            <div className="relative flex flex-col items-center justify-end pb-6">
              <Skyline className="absolute inset-x-0 bottom-6 h-36 w-full" />
              <div className="relative"><Booth src={SHOWROOM} alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom" /></div>
            </div>
            <div className="relative flex flex-col items-center" aria-hidden>
              <div className="relative z-10 flex w-[min(30rem,60vw)] whitespace-nowrap -translate-y-2 items-stretch">
                <div className="flex-1 -rotate-1 border-2 border-cocoa bg-gradient-to-b from-honey to-[#d69a4e] px-3 py-2 text-right font-display text-base font-extrabold md:text-xl [clip-path:polygon(8%_0,100%_0,100%_100%,8%_100%,0_50%)]">Puppies in Dubai</div>
                <div className="flex-1 rotate-1 border-2 border-cocoa bg-gradient-to-b from-honey to-[#d69a4e] px-3 py-2 font-display text-base font-extrabold md:text-xl [clip-path:polygon(0_0,92%_0,100%_50%,92%_100%,0_100%)]">Imported for you</div>
              </div>
              <div className="-mt-5 h-40 w-4 rounded-b-md border-x-[3px] border-b-[3px] border-cocoa bg-gradient-to-r from-[#d69a4e] to-[#b5742f] md:h-52" />
            </div>
            <div className="relative pb-6">
              <FlightPath className="w-full max-w-md" />
              <PupStop pose="sit" className="absolute -bottom-3 -left-28 w-36 md:-left-44 md:w-44" />
            </div>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <Reveal>
              <h3 className="display text-3xl">In our showroom</h3>
              <p className="mt-2 text-cocoa-soft">See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
              <Link href="/puppies?origin=local" className="btn btn-toffee mt-4">Meet local puppies</Link>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="display text-3xl">Imported for you</h3>
              <p className="mt-2 text-cocoa-soft">Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import.</p>
              <Link href="/puppies?origin=imported" className="btn btn-toffee mt-4">See imported puppies</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="relative bg-gradient-to-b from-transparent to-honey py-16 md:py-24">
        <div className="wrap grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
          <div className="relative">
            <Reveal>
              <h2 className="display text-5xl md:text-7xl">Your puppy journey</h2>
              <p className="mt-4 max-w-md text-lg text-cocoa-soft">A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.</p>
            </Reveal>
            <ol className="mt-10 space-y-8">
              {STEPS.map(([t, b], i) => (
                <Reveal as="li" key={t} delay={i * 100} className="flex gap-4">
                  <span className="display grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-cocoa bg-toffee-deep text-xl text-milk">{i + 1}</span>
                  <div><h3 className="display text-2xl">{t}</h3><p className="mt-1 max-w-sm text-cocoa-soft">{b}</p></div>
                </Reveal>
              ))}
            </ol>
            <div className="mt-10 flex items-end gap-4">
              <Link href="/how-it-works" className="btn btn-ghost">How it works</Link>
              <PupStop pose="sit" className="w-36 md:w-44" />
            </div>
          </div>
          <Phone />
        </div>
      </section>

      {/* PASSPORT */}
      <section className="bg-gradient-to-b from-honey via-[#d69a4e] to-[#b5683a] pb-28 pt-8">
        <div className="wrap">
          <Reveal>
            <div className="relative mx-auto max-w-5xl">
            <PupStop pose="stand" className="absolute -top-[5.4rem] left-[6%] z-10 w-32 md:w-40" />
            <div className="relative grid -rotate-1 overflow-hidden rounded-3xl border-[3px] border-cocoa bg-toffee-deep p-2.5 shadow-[10px_10px_0_rgb(0_0_0_/_.18)] md:grid-cols-2">
              <div className="paw-wallpaper rounded-t-2xl p-7 md:rounded-l-2xl md:rounded-tr-none md:p-10">
                <p className="hand text-toffee-ink">puppy passport</p>
                <h2 className="display mt-2 text-5xl md:text-6xl">Why families trust TeddyPups</h2>
              </div>
              <ul className="paw-wallpaper grid gap-6 rounded-b-2xl p-7 sm:grid-cols-2 md:rounded-r-2xl md:rounded-bl-none md:border-l-2 md:border-cocoa md:p-10">
                {TRUST.map(([t, b], i) => (
                  <li key={t} className={i % 2 ? "sm:mt-10" : ""}><h3 className="font-display text-lg font-extrabold">{t}</h3><p className="mt-1 text-sm text-cocoa-soft">{b}</p></li>
                ))}
              </ul>
            </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HAPPY FAMILIES — dusk */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#b5683a] via-[#8e4a26] to-[#3a1f12] pb-20 pt-4 text-milk">
        <div className="relative h-24 md:h-32">
          <Skyline className="absolute inset-x-0 bottom-0 h-full w-full" fill="#9a5230" stroke="#9a5230" opacity={0.9} />
          <div className="absolute bottom-3 right-[18%] h-16 w-16 rounded-full bg-honey shadow-[0_0_50px_14px_rgb(242_190_107_/_.55)] md:h-24 md:w-24" />
        </div>
        <div className="wrap relative">
          <div className="grid items-end gap-8 md:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <h2 className="display text-5xl md:text-7xl">Happy families &amp; puppies</h2>
              <p className="mt-4 max-w-xl text-milk/85">We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.</p>
            </Reveal>
            <Reveal delay={120}>
              <blockquote className="paper relative rotate-1 p-6 text-cocoa after:absolute after:-bottom-2 after:left-8 after:h-4 after:w-4 after:rotate-45 after:border-b-2 after:border-r-2 after:border-cocoa after:bg-milk">
                <p>“TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”</p>
                <footer className="mt-3 font-bold">Sarah M. <span className="font-normal text-cocoa-soft">, Dubai, UAE</span></footer>
              </blockquote>
            </Reveal>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            {homeFamilies.map((f, i) => (
              <Reveal as="li" key={f.src} delay={(i % 4) * 80}>
                <figure className={`polaroid text-cocoa ${["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"][i % 4]}`}>
                  <div className="relative aspect-square overflow-hidden"><Image src={f.src} alt="A happy TeddyPups family with their new puppy" fill sizes="(min-width:768px) 20vw, 45vw" className="object-cover" /></div>
                  <figcaption className="hand mt-2 text-center text-xs">{f.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 text-center"><Link href="/happy-families" className="btn btn-toffee">See every happy family</Link></div>
          <PupStop pose="sit" facing="left" className="mx-auto mt-6 w-36" />
        </div>
      </section>

      {/* FAQ — night */}
      <section className="night-sky relative overflow-hidden py-20 text-milk">
        <Floaters kind="dust" count={22} />
        <div className="wrap relative grid gap-10 md:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 className="display text-5xl md:text-7xl">Questions, answered</h2>
            <Link href="/faq" className="btn btn-ghost mt-6 !border-milk !text-milk hover:!bg-milk/10">Read all questions</Link>
            <PupStop pose="sit" act="tilt" className="mt-8 w-40" />
          </div>
          <FaqList items={FAQS.slice(0, 3)} tone="dark" />
        </div>
      </section>

      {/* CTA */}
      <section className="night-sky relative overflow-hidden pb-16 pt-6 text-center text-milk">
        <Moon className="absolute bottom-24 right-[8%] h-14 w-14" />
        <div className="wrap relative">
          <Reveal>
            <h2 className="display mx-auto max-w-2xl text-5xl text-balance md:text-7xl">Ready to meet your new best friend?</h2>
            <p className="mx-auto mt-5 max-w-xl text-milk/80">Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.</p>
          </Reveal>
          <HouseScene src={bySlug("maltipoo-max-male")!.card} alt="Max, waiting inside" />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-leaf">Enquire on WhatsApp</a>
            <Link href="/contact" className="btn btn-ghost !border-milk !text-milk hover:!bg-milk/10">Visit &amp; contact</Link>
          </div>
          <PupStop pose="stand" act="tilt" className="mx-auto mt-4 w-40" />
        </div>
      </section>
    </div>
  );
}
