import type { CSSProperties } from "react";

export type PupPose = "stand" | "walk" | "sit" | "peek" | "basket";

const FUR = "#f2be6b";
const FUR_D = "#dfa04a";
const FUR_L = "#fbe3b4";
const INK = "#2a170e";
const CHEEK = "#f9cdbf";
const COLLAR = "#a24a1a";

/** Hip pivots (x) for the four legs, used by the walk cycle. */
const LEGS = [
  { id: "bf", x: 124, far: true, grp: "b" },
  { id: "ff", x: 194, far: true, grp: "a" },
  { id: "bn", x: 96, far: false, grp: "a" },
  { id: "fn", x: 168, far: false, grp: "b" },
] as const;

/**
 * Teddy, the mascot. 300×240 viewBox, facing right, feet on y≈228.
 * Everything is driven by data-* attributes + CSS (see globals.css), so the same markup is used for
 * the live roaming dog and for the static fallbacks inside each <PupStop>.
 */
export default function PupSprite({ pose = "sit", live = false, className = "", style }: { pose?: PupPose; live?: boolean; className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 300 240"
      className={`pup-svg ${className}`}
      data-pose={pose}
      data-wag="slow"
      data-eyes="open"
      data-mouth="closed"
      data-live={live ? "" : undefined}
      style={style}
      aria-hidden
    >
      <g className="pup-world" stroke={INK} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
        <ellipse className="pup-shadow" cx="150" cy="230" rx="84" ry="7" fill="rgb(42 23 14 / .14)" stroke="none" />

        {/* ---------- standing / walking / hopping ---------- */}
        <g className="p-stand">
          <g className="pup-tail" style={{ transformOrigin: "84px 140px" }}>
            <path d="M86 142 C68 134 58 120 54 104" fill="none" strokeWidth="16" />
            <path d="M86 142 C68 134 58 120 54 104" fill="none" stroke={FUR} strokeWidth="7" />
            <circle cx="50" cy="90" r="20" fill={FUR} />
            <path d="M40 84q4-8 12-6M50 100q8 0 11-8" fill="none" strokeWidth="3" opacity=".45" />
          </g>
          {LEGS.filter((l) => l.far).map((l) => (
            <g key={l.id} className={`pup-leg leg-${l.grp}`} style={{ transformOrigin: `${l.x + 13}px 176px` }}>
              <rect x={l.x} y="168" width="26" height="60" rx="13" fill={FUR_D} />
              <path d={`M${l.x + 9} 228v-7M${l.x + 17} 228v-7`} strokeWidth="2.5" />
            </g>
          ))}
          <path d="M72 152 C66 118 100 102 142 104 C190 104 216 122 212 154 C210 184 186 194 142 194 C100 194 74 184 72 152Z" fill={FUR} />
          <path d="M96 128q8 8 16 0M128 122q8 8 16 0M160 128q8 8 16 0" fill="none" strokeWidth="3" opacity=".4" />
          {LEGS.filter((l) => !l.far).map((l) => (
            <g key={l.id} className={`pup-leg leg-${l.grp}`} style={{ transformOrigin: `${l.x + 13}px 176px` }}>
              <rect x={l.x} y="170" width="26" height="58" rx="13" fill={FUR} />
              <path d={`M${l.x + 9} 228v-7M${l.x + 17} 228v-7`} strokeWidth="2.5" />
            </g>
          ))}
        </g>

        {/* ---------- sitting ---------- */}
        <g className="p-sit">
          <g className="pup-tail" style={{ transformOrigin: "98px 214px" }}>
            <path d="M100 216 C84 222 72 222 62 214" fill="none" strokeWidth="16" />
            <path d="M100 216 C84 222 72 222 62 214" fill="none" stroke={FUR} strokeWidth="7" />
            <circle cx="52" cy="208" r="18" fill={FUR} />
          </g>
          <rect x="196" y="164" width="24" height="64" rx="12" fill={FUR_D} />
          <path d="M96 196 C84 150 112 106 156 108 C196 110 214 150 206 190 C202 216 170 228 138 228 C112 228 100 214 96 196Z" fill={FUR} />
          <ellipse cx="122" cy="196" rx="44" ry="34" fill={FUR} />
          <path d="M92 218q30 14 62 4" fill="none" strokeWidth="3" opacity=".4" />
          <ellipse cx="132" cy="224" rx="30" ry="10" fill={FUR} />
          <rect x="168" y="168" width="26" height="60" rx="13" fill={FUR} />
          <path d="M177 228v-7M185 228v-7" strokeWidth="2.5" />
        </g>

        {/* ---------- head (shared) ---------- */}
        <g className="pup-head">
          <g className="pup-headtilt" style={{ transformOrigin: "212px 120px" }}>
            <circle cx="214" cy="34" r="17" fill={FUR} />
            <ellipse cx="166" cy="92" rx="17" ry="31" fill={FUR} transform="rotate(10 166 92)" />
            <ellipse cx="260" cy="92" rx="17" ry="31" fill={FUR} transform="rotate(-10 260 92)" />
            <path d="M158 80q-6 10 0 22M268 80q6 10 0 22" fill="none" strokeWidth="3" opacity=".45" />
            <circle cx="212" cy="92" r="51" fill={FUR} />
            <path d="M188 52q8-7 16-2M222 48q8-4 16 2" fill="none" strokeWidth="3" opacity=".4" />
            <ellipse cx="212" cy="114" rx="25" ry="19" fill={FUR_L} strokeWidth="4" />
            <ellipse cx="183" cy="108" rx="9" ry="6.5" fill={CHEEK} stroke="none" />
            <ellipse cx="241" cy="108" rx="9" ry="6.5" fill={CHEEK} stroke="none" />
            <g className="pup-eyes">
              <g className="eyes-open">
                <g className="pupils">
                  <circle cx="194" cy="88" r="6.5" fill={INK} stroke="none" />
                  <circle cx="230" cy="88" r="6.5" fill={INK} stroke="none" />
                  <circle cx="196" cy="85.5" r="2" fill="#fff" stroke="none" />
                  <circle cx="232" cy="85.5" r="2" fill="#fff" stroke="none" />
                </g>
              </g>
              <g className="eyes-shut" fill="none" strokeWidth="4">
                <path d="M186 90q8-10 16 0" />
                <path d="M222 90q8-10 16 0" />
              </g>
            </g>
            <path d="M203 106q9-7 18 0q-4 9-9 9t-9-9z" fill={INK} strokeWidth="2.5" />
            <g className="mouth-closed" fill="none" strokeWidth="3.5">
              <path d="M212 115v5" />
              <path d="M200 122q12 9 24 0" />
            </g>
            <g className="mouth-open">
              <path d="M198 120q14 24 28 0z" fill="#8e3f15" strokeWidth="3.5" />
              <path d="M205 130q7 8 14 0" fill="#f28b82" stroke="none" />
            </g>
          </g>
        </g>

        {/* collar sits on the neck in every body pose */}
        <g className="pup-collar">
          <path d="M178 138 Q212 162 246 138" fill="none" stroke={COLLAR} strokeWidth="10" />
          <path d="M178 138 Q212 162 246 138" fill="none" stroke={INK} strokeWidth="1.5" strokeDasharray="3 5" />
          <path d="M212 156c-5-5-10-1-7 4l7 7 7-7c3-5-2-9-7-4z" fill="#fff" strokeWidth="3" />
        </g>

        {/* ---------- peeking over a ledge: just paws ---------- */}
        <g className="p-peek">
          <ellipse cx="170" cy="222" rx="24" ry="14" fill={FUR} />
          <ellipse cx="254" cy="222" rx="24" ry="14" fill={FUR} />
          <path d="M160 226v-8M170 227v-9M180 226v-8M244 226v-8M254 227v-9M264 226v-8" strokeWidth="2.5" />
        </g>

        {/* ---------- snug in the basket ---------- */}
        <g className="p-basket">
          <ellipse cx="212" cy="196" rx="86" ry="12" fill="#a8702f" />
          <path d="M120 196 H304 L292 226 Q290 232 282 232 H142 Q134 232 132 226Z" fill="#e9b066" />
          <path d="M124 208H300M128 220H296" strokeWidth="2.5" opacity=".4" />
          <path d="M146 198 138 230M176 198 172 232M208 198 208 232M240 198 244 232M270 198 280 230" strokeWidth="2.5" opacity=".35" />
          <rect x="116" y="188" width="192" height="16" rx="8" fill="#d4853a" />
          <ellipse cx="172" cy="190" rx="22" ry="12" fill={FUR} />
          <ellipse cx="254" cy="190" rx="22" ry="12" fill={FUR} />
        </g>
      </g>
    </svg>
  );
}
