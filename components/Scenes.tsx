import Image from "next/image";
import { Chat } from "./Icons";
import { InView } from "./Reveal";
import { WHATSAPP } from "@/lib/site";

/** Plane that flies the dashed Korea → Dubai route on a loop. */
export function FlightPath({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} aria-hidden>
      <path id="route" d="M40 170 Q200 -50 360 140" fill="none" stroke="#8e3f15" strokeWidth="2.5" strokeDasharray="6 7" strokeLinecap="round" />
      <circle cx="40" cy="170" r="6" fill="#a24a1a" />
      <circle cx="360" cy="140" r="6" fill="#a24a1a" />
      <text x="40" y="192" fontSize="13" fontWeight="700" textAnchor="middle" fill="#2a170e">Korea</text>
      <text x="362" y="162" fontSize="13" fontWeight="700" textAnchor="middle" fill="#2a170e">Dubai</text>
      <g>
        <g transform="scale(1.1)" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round">
          <path d="M-8 -3 L-24 -20 L-14 -20 L2 -4Z" fill="#a24a1a" />
          <path d="M-8 3 L-24 20 L-14 20 L2 4Z" fill="#a24a1a" />
          <path d="M-26 -2 L-34 -12 L-28 -12 L-20 -2Z" fill="#a24a1a" />
          <ellipse cx="0" cy="0" rx="30" ry="10" fill="#fffdf8" />
          <circle cx="8" cy="-1" r="4.2" fill="#bfddf5" />
        </g>
        <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".45 0 .55 1">
          <mpath href="#route" />
        </animateMotion>
      </g>
    </svg>
  );
}

export function Skyline({ className = "", stroke = "#2a170e", fill = "none", opacity = 0.6 }: { className?: string; stroke?: string; fill?: string; opacity?: number }) {
  // Dubai-ish skyline, with one tall needle
  const b = [[0, 40], [18, 62], [34, 34], [52, 78], [68, 50], [84, 120], [92, 150], [100, 120], [116, 70], [134, 90], [150, 46], [168, 66], [184, 38], [200, 58]];
  const d = b.map(([x, h], i) => `${i ? "L" : "M"}${x} ${200 - h} L${x + 14} ${200 - h}`).join(" ") + " L214 200 L0 200Z";
  return (
    <svg viewBox="0 0 214 200" preserveAspectRatio="none" className={className} aria-hidden style={{ opacity }}>
      <path d={d} fill={fill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Showroom booth with a striped awning, used on the home "two ways" scene. */
export function Booth({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-36 md:w-44">
      <div className="h-6 rounded-t-md border-[3px] border-cocoa" style={{ background: "repeating-linear-gradient(90deg,#a24a1a 0 16px,#fffdf8 16px 32px)" }} />
      <div className="border-x-[3px] border-b-[3px] border-cocoa bg-milk p-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm border-2 border-cocoa">
          <Image src={src} alt={alt} fill sizes="12rem" className="object-cover" />
        </div>
      </div>
      <p className="hand mt-2 text-center text-sm font-semibold">In our showroom</p>
    </div>
  );
}

/** The WhatsApp-style phone; bubbles pop in one after another when scrolled into view. */
export function Phone() {
  return (
    <InView className="mx-auto w-full max-w-[19rem]">
      <div className="rounded-[2.4rem] border-[3px] border-cocoa bg-milk p-2.5 shadow-[0_10px_0_rgb(0_0_0_/_.2)]" style={{ transform: "rotate(2deg)" }}>
        <div className="overflow-hidden rounded-[1.9rem] border-2 border-cocoa">
          <div className="flex items-center gap-2 bg-milk px-3 py-2.5">
            <Image src="/brand/logo.png" alt="" width={30} height={30} className="rounded-full" />
            <div className="leading-tight"><p className="text-sm font-bold">TeddyPups U.A.E.</p><p className="text-[11px] text-leaf">online</p></div>
          </div>
          <div className="paw-wallpaper space-y-2.5 px-3 py-4 text-[13px]">
            <p className="msg ml-auto w-fit max-w-[88%] rounded-xl rounded-tr-sm border border-cocoa/20 bg-honey-soft px-3 py-2" style={{ ["--md" as string]: "200ms" }}>Hi TeddyPups! I&apos;d love to know more about your puppies.</p>
            <p className="msg w-fit max-w-[88%] rounded-xl rounded-tl-sm border border-cocoa/20 bg-white px-3 py-2" style={{ ["--md" as string]: "1100ms" }}>Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll guide you based on availability and your lifestyle.</p>
            <p className="msg w-fit max-w-[88%] rounded-xl rounded-tl-sm border border-cocoa/20 bg-white px-3 py-2" style={{ ["--md" as string]: "2000ms" }}>Our team will share real photos, health details, and all necessary information directly on WhatsApp.</p>
            <div className="msg w-fit max-w-[92%] rounded-xl rounded-tl-sm border border-cocoa/20 bg-white px-3 py-2" style={{ ["--md" as string]: "2900ms" }}>
              <p>Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.</p>
              <svg viewBox="0 0 160 40" className="mt-1 h-9 w-full" aria-hidden>
                <path d="M10 32 Q60 -4 120 24" fill="none" stroke="#8e3f15" strokeWidth="2" strokeDasharray="4 5" />
                <circle cx="10" cy="32" r="3.5" fill="#a24a1a" />
                <path d="M120 24l12-10 12 10v12h-24z" fill="#f2be6b" stroke="#2a170e" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <a href={WHATSAPP} target="_blank" rel="noopener" className="flex items-center justify-between gap-2 bg-milk px-3 py-2.5 text-sm">
            <span className="text-cocoa-soft">Say hello on WhatsApp</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-leaf text-milk"><Chat className="h-4 w-4" /></span>
          </a>
        </div>
      </div>
    </InView>
  );
}

/** Brick wall with a half-open door, lamps and shrubs for the closing "welcome home" scene. */
export function HouseScene({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto mt-10 w-full max-w-xl">
      <div className="relative mx-auto h-[19rem] overflow-hidden rounded-t-[2rem] border-[3px] border-cocoa" style={{ background: "repeating-linear-gradient(0deg,#3b2114 0 22px,#2a170e 22px 24px)" }}>
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-[#5a3a28] to-[#3b2114]" />
        {[["left-[10%]"], ["right-[10%]"]].map(([pos]) => (
          <div key={pos} className={`absolute top-14 ${pos} h-10 w-5 rounded-md border-2 border-cocoa bg-honey shadow-[0_0_28px_8px_rgb(242_190_107_/_.45)]`} />
        ))}
        <div className="absolute bottom-8 left-1/2 w-44 -translate-x-1/2">
          <div className="door-frame !border-honey-soft">
            <Image src={src} alt={alt} fill sizes="12rem" className="object-cover" />
            <div className="door-leaf" style={{ background: "#a24a1a", transform: "perspective(900px) rotateY(-62deg)" }}>
              <div className="absolute inset-3 rounded-t-full border border-milk/30" />
              <span className="absolute right-3 top-1/2 h-2.5 w-2.5 rounded-full bg-honey" />
            </div>
          </div>
          <p className="hand absolute inset-x-6 bottom-0 z-10 rounded-sm border-2 border-cocoa bg-honey-soft py-0.5 text-center text-xs font-semibold text-cocoa">welcome home</p>
        </div>
        {["left-[4%]", "right-[4%]"].map((pos) => (
          <div key={pos} className={`absolute bottom-8 ${pos} w-16`}>
            <div className="h-20 rounded-[999px] border-[3px] border-cocoa bg-gradient-to-b from-[#4f9a66] to-[#2f6f46]" />
            <div className="mx-auto -mt-1 h-7 w-12 rounded-b-lg border-[3px] border-cocoa bg-toffee-deep" />
          </div>
        ))}
      </div>
    </div>
  );
}
