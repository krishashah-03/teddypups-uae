import type { Metadata } from "next";
import Image from "next/image";
import { familyPhotos } from "@/lib/families";
import Reveal from "@/components/Reveal";
import PupStop from "@/components/pup/PupStop";

export const metadata: Metadata = {
  title: "Happy families",
  description: "Beautiful moments shared by our clients after welcoming their Teddy Pup home.",
};

export default function HappyFamilies() {
  return (
    <div className="bg-gradient-to-b from-blush/60 via-milk to-honey-soft pb-24 pt-12 md:pt-16">
      <div className="wrap relative">
        <PupStop pose="sit" facing="left" className="absolute right-6 top-0 hidden w-40 md:block" />
        <p className="hand text-toffee-ink">our wall of happy endings</p>
        <h1 className="display mt-1 text-5xl md:text-7xl">Happy families</h1>
        <p className="mt-4 max-w-2xl text-lg text-cocoa-soft">Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.</p>
        <p className="mt-2 font-bold text-toffee-ink">{familyPhotos.length} moments and counting</p>

        <blockquote className="paper mt-8 max-w-2xl rotate-[-1deg] p-6">
          <p>“TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”</p>
          <footer className="mt-3 font-bold">Sarah M. <span className="font-normal text-cocoa-soft">, Dubai, UAE</span></footer>
        </blockquote>

        <ul className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 [&>li]:mb-4 [&>li]:break-inside-avoid">
          {familyPhotos.map((src, i) => (
            <Reveal as="li" key={src}>
              <div className={`polaroid ${i % 3 === 0 ? "-rotate-1" : i % 3 === 1 ? "rotate-1" : ""}`}>
                <Image src={src} alt="A happy TeddyPups family with their new puppy" width={600} height={600} sizes="(min-width:1024px) 22vw, (min-width:768px) 30vw, 45vw" className="h-auto w-full rounded-sm" loading={i < 6 ? "eager" : "lazy"} />
              </div>
            </Reveal>
          ))}
        </ul>
        <PupStop pose="sit" className="mx-auto mt-10 w-36" />
        <p className="hand mt-2 text-center text-xl text-toffee-ink">every one of them was a Teddy Pup once</p>
      </div>
    </div>
  );
}
