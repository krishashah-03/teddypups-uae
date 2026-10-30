import { Paw } from "./Icons";

// deterministic pseudo-random so server and client markup match
const rnd = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Decorative drifting bits that fill a relatively-positioned section.
 * kind="paws" — little paw prints, "dust" — warm motes, "stars" — twinkling stars.
 */
export default function Floaters({ kind = "paws", count = 14, className = "" }: { kind?: "paws" | "dust" | "stars"; count?: number; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const left = `${(rnd(i, 1) * 100).toFixed(1)}%`;
        const top = `${(rnd(i, 2) * 100).toFixed(1)}%`;
        const delay = `${(rnd(i, 3) * -12).toFixed(1)}s`;
        const dur = `${(9 + rnd(i, 4) * 9).toFixed(1)}s`;
        const size = kind === "paws" ? 12 + rnd(i, 5) * 14 : 2 + rnd(i, 5) * 3;
        const rot = `${Math.round(rnd(i, 6) * 80 - 40)}deg`;
        const style = { left, top, animationDelay: delay, animationDuration: dur, width: size, height: size, ["--rot" as string]: rot };
        if (kind === "paws")
          return <Paw key={i} className="floater absolute text-toffee/25" style={style} />;
        return <span key={i} className={`floater absolute rounded-full ${kind === "stars" ? "twinkle bg-honey-soft" : "bg-honey/50"}`} style={style} />;
      })}
    </div>
  );
}

export function Moon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" aria-hidden className={className}>
      <path d="M40 6a26 26 0 1 0 14 40A22 22 0 0 1 40 6z" fill="#fbe3b4" />
    </svg>
  );
}
