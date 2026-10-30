"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import PupSprite, { type PupPose } from "./PupSprite";

/* Sprite geometry (see PupSprite): 300×240 box, feet on y=228, head centre at (212, 92) facing right. */
const SW = 300, SH = 240, FX = 150, FY = 228, HEAD_X = 212, HEAD_Y = 92;
const PAW_D = "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

type Mode = "hold" | "travel" | "lane";
interface Stop {
  el: HTMLElement;
  pose: PupPose;
  act: string;
  face: 1 | -1;
  behind: boolean;
  scene: Element | null;
}
type Cue = { say?: string; look?: Element | null; secs?: number; hop?: number };

/** Ask the roaming dog to say something or look at an element (used by page sections). */
export function cuePup(detail: Cue) {
  window.dispatchEvent(new CustomEvent("pup:cue", { detail }));
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * t * (t * (6 * t - 15) + 10);
const pick = <T,>(a: readonly T[], not?: T) => {
  const b = a.filter((x) => x !== not);
  return b[Math.floor(Math.random() * b.length)];
};
const bez = (p0: number, c1: number, c2: number, p1: number, t: number) => {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * c1 + 3 * u * t * t * c2 + t * t * t * p1;
};

export default function PupJourney() {
  const pathname = usePathname();
  const layerRef = useRef<HTMLDivElement>(null);
  const actorRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bubbleAtRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const printsRef = useRef<HTMLDivElement>(null);
  const rescan = useRef<(() => void) | null>(null);

  // stops live in the page, so look for them again after every route change
  useEffect(() => {
    const a = setTimeout(() => rescan.current?.(), 80);
    const b = setTimeout(() => rescan.current?.(), 600);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [pathname]);

  useEffect(() => {
    const layer = layerRef.current!, actor = actorRef.current!, body = bodyRef.current!;
    const bubbleAt = bubbleAtRef.current!, bubble = bubbleRef.current!, prints = printsRef.current!;
    const svg = body.querySelector("svg") as SVGSVGElement;
    const html = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    /* ------------------------------------------------------------ stops */
    let stops: Stop[] = [];
    let mobile = false;
    let scanTimer: ReturnType<typeof setTimeout> | undefined;

    const scan = () => {
      mobile = matchMedia("(max-width: 767px)").matches;
      let list = [...document.querySelectorAll<HTMLElement>("[data-pup-stop]")].filter((e) => e.getClientRects().length);
      if (mobile) list = list.filter((e) => e.dataset.lane === "true");
      stops = list.map((el) => ({
        el,
        pose: (el.dataset.pose as PupPose) || "sit",
        act: el.dataset.act ?? "",
        face: el.dataset.facing === "left" ? -1 : 1,
        behind: el.dataset.behind === "true",
        scene: el.closest("[data-pup-scene]"),
      }));
      lastKey = "";
      layer.hidden = !stops.length;
      if (stops.length) html.dataset.pup = "live";
      else delete html.dataset.pup;
    };
    const scanSoon = () => {
      clearTimeout(scanTimer);
      scanTimer = setTimeout(scan, 120);
    };
    rescan.current = scanSoon;

    /* ------------------------------------------------------------ state */
    let raf = 0;
    let last = performance.now() / 1000;
    let X = 0, Y = 0, S = 1, hasPos = false;
    let prevX = 0, prevY = 0, prevWalked = 0;
    let Zx = 0, Zy = 0, Zs = 0;
    let lastKey = "";
    let face: 1 | -1 = 1;
    let pose: PupPose = "sit";
    const wagBase: "slow" | "fast" | "off" = "slow";
    let queue: [number, (t: number) => void][] = [];
    let lastSy = scrollY, scrollDir = 1, lastScrollT = 0;
    let lastActive = last, arrivedAt = last, nextIdle = last + 8;
    let clicks = 0, lastClick = 0, lastAct = "";
    let mouthUntil = 0, eyesUntil = 0, sayUntil = 0, petting = false, petAt = 0, petLoved = false;
    let hopT0 = -9, hopA = 0;
    let dash = 0, dashTarget = 0;
    let walkAcc = 0, printI = 0, printSide = 1;
    let pointer: { x: number; y: number; t: number } | null = null;
    let lookEl: { el: Element; until: number } | null = null;
    let curStop: Stop | null = null;
    let nextChatter = last + 7;
    let introDone = false;
    let ox = 0, oy = 0;

    const set = (k: string, v: string | null) => {
      if (v === null) {
        if (svg.hasAttribute(`data-${k}`)) svg.removeAttribute(`data-${k}`);
      } else if (svg.getAttribute(`data-${k}`) !== v) svg.setAttribute(`data-${k}`, v);
    };
    const setPose = (p: PupPose) => {
      if (p === pose) return;
      pose = p;
      set("pose", p);
    };
    const setFace = (f: 1 | -1) => {
      if (f === face) return;
      face = f;
      svg.setAttribute("data-face", String(f));
    };
    const setWag = (w: "slow" | "fast" | "off") => set("wag", w);
    const cock = (deg: number) => svg.style.setProperty("--tilt", `${deg}deg`);
    const open = (t: number, secs = 0.25) => (mouthUntil = Math.max(mouthUntil, t + secs));
    const hop = (t: number, a = 1) => {
      hopT0 = t;
      hopA = a;
    };
    const say = (text: string, secs = 1.5) => {
      bubble.textContent = text;
      bubble.dataset.show = "true";
      sayUntil = performance.now() / 1000 + secs;
    };
    const heart = (x: number, y: number, i: number) => {
      const h = document.createElement("span");
      h.className = "pup-heart";
      h.textContent = "♥";
      h.style.left = `${x}px`;
      h.style.top = `${y}px`;
      layer.appendChild(h);
      const dx = (i - 1) * 22 + (Math.random() * 10 - 5);
      h.animate(
        [
          { transform: "translate(-50%,0) scale(.5)", opacity: 0 },
          { opacity: 1, offset: 0.2 },
          { transform: `translate(calc(-50% + ${dx}px),-46px) scale(1.1)`, opacity: 0 },
        ],
        { duration: 1150 + i * 110, delay: i * 80, easing: "cubic-bezier(.2,.7,.3,1)", fill: "backwards" },
      ).finished.then(() => h.remove(), () => h.remove());
    };
    const hearts = () => {
      const hx = X - FX * S + (face > 0 ? HEAD_X : SW - HEAD_X) * S;
      const hy = Y - FY * S + 30 * S;
      for (let i = 0; i < 3; i++) heart(hx, hy, i);
    };
    const printAt = (x: number, y: number, angle: number) => {
      const el = prints.children[printI++ % prints.children.length] as SVGElement;
      const s = 14 * clamp(S * 1.6, 0.8, 1.5);
      el.style.width = el.style.height = `${s}px`;
      el.style.transform = `translate(${(x - s / 2).toFixed(1)}px, ${(y - s / 2).toFixed(1)}px) rotate(${angle}rad)`;
      el.getAnimations().forEach((a) => a.cancel());
      el.animate([{ opacity: 0 }, { opacity: 0.45, offset: 0.08 }, { opacity: 0.45, offset: 0.5 }, { opacity: 0 }], { duration: 2600, easing: "ease-out" });
    };

    /* ----------------------------------------------------------- actions */
    const ACTIONS: Record<string, (t: number) => [number, (t: number) => void][]> = {
      woof: (t) => [
        [t, (n) => (open(n, 0.22), say("woof!", 1.1), hop(n, 0.25))],
        [t + 0.38, (n) => open(n, 0.22)],
      ],
      jump: (t) => [
        [t, (n) => (hop(n, 1.4), say(pick(["wheee!", "boing!", "yip!"]), 1.2))],
        [t + 0.55, (n) => hop(n, 0.7)],
      ],
      hop: (t) => [[t, (n) => (hop(n, 1.2), open(n, 0.3))]],
      love: (t) => [
        [t, (n) => (setWag("fast"), hop(n, 0.5), hearts(), say("I like you!", 1.7), (eyesUntil = n + 1.5))],
        [t + 1.9, () => setWag(wagBase)],
      ],
      sneeze: (t) => [
        [t, () => cock(-8)],
        [t + 0.32, (n) => (cock(10), hop(n, 0.4), open(n, 0.3), say("achoo!", 1.2))],
        [t + 0.8, () => cock(0)],
      ],
      tilt: (t) => [
        [t, () => (cock(-14), say("hm?", 1.4))],
        [t + 0.8, () => cock(12)],
        [t + 1.6, () => cock(0)],
      ],
      peekaboo: (t) => [
        [t, () => set("duck", "")],
        [t + 0.55, (n) => (set("duck", null), say("peekaboo!", 1.5), hop(n, 0.5))],
      ],
      zoomies: (t) => [
        [t, () => (say("zoomies!", 2), (dashTarget = 70))],
        [t + 0.5, () => (dashTarget = -70)],
        [t + 0.98, () => (dashTarget = 50)],
        [t + 1.4, () => (dashTarget = -30)],
        [t + 1.8, () => (dashTarget = 0)],
      ],
    };
    const run = (name: string, t: number) => {
      lastAct = name;
      cock(0);
      set("duck", null);
      queue = ACTIONS[name](t);
    };
    const choose = (st: Stop | null) => {
      if (!st) return pick(["jump", "woof", "love", "sneeze"], lastAct);
      if (st.act === "basket") return pick(["tilt", "love", "sneeze", "woof"], lastAct);
      if (st.pose === "peek") return pick(["peekaboo", "woof", "tilt", "sneeze"], lastAct);
      if (st.act === "treadmill") return pick(["woof", "hop", "love"], lastAct);
      return pick(["jump", "woof", "love", "sneeze"], lastAct);
    };

    /* --------------------------------------------------------- the frame */
    const header = () => document.getElementById("site-header") ?? document.querySelector("header");

    const frame = (ms: number) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden || !stops.length) return;
      const t = ms / 1000;
      const dt = Math.min(0.05, t - last) || 0.016;
      last = t;

      const sy = scrollY;
      const dsy = sy - lastSy;
      lastSy = sy;
      if (Math.abs(dsy) > 0.5) {
        lastScrollT = t;
        lastActive = t;
        scrollDir = dsy > 0 ? 1 : -1;
      }

      const vw = html.clientWidth, vh = innerHeight;
      const headerH = (header() as HTMLElement | null)?.offsetHeight ?? 76;
      const bar = mobile ? document.querySelector<HTMLElement>("[data-whatsapp-bar]")?.offsetHeight ?? 0 : 0;
      const bandTop = Math.max(headerH + 40, vh * 0.34);
      const bandBottom = vh - bar - Math.max(24, vh * 0.06);

      const m = stops.map((st) => {
        const r = st.el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height * (FY / SH), s: r.width / SW };
      });

      /* ---- choose where the dog is: held at a stop, walking between two, or parked (phones) ---- */
      let tx = 0, ty = 0, ts = 1, k = -1, tt = 0, walked = 0;
      let mode: Mode = "hold";
      const safe = (x: number, y: number, s: number) => ({
        x: clamp(x, 70 * s, vw - 70 * s),
        y: clamp(y, headerH + 10 + 205 * s, vh - bar - 4),
      });
      const j = m.findIndex((p) => p.y >= bandTop);
      if (j === -1) {
        k = stops.length - 1;
        const p = safe(m[k].x, m[k].y, m[k].s);
        [tx, ty, ts] = [p.x, p.y, m[k].s];
      } else if (m[j].y <= bandBottom || j === 0) {
        k = j;
        const inBand = m[j].y >= bandTop && m[j].y <= bandBottom;
        const p = inBand ? { x: m[j].x, y: m[j].y } : safe(m[j].x, m[j].y, m[j].s);
        [tx, ty, ts] = [p.x, p.y, m[j].s];
      } else {
        mode = "travel";
        k = j;
        const a = m[j - 1], b = m[j];
        const p0 = { x: a.x, y: bandTop }, p1 = { x: b.x, y: bandBottom };
        const above = bandTop - a.y, below = b.y - bandBottom;
        tt = clamp(above / Math.max(1, above + below), 0, 1);
        const dx = p1.x - p0.x;
        const bulge = Math.abs(dx) < vw * 0.16 ? ((p0.x + p1.x) / 2 < vw / 2 ? 1 : -1) * vw * 0.12 : 0;
        const c1 = { x: p0.x + dx * 0.45 + bulge, y: lerp(p0.y, p1.y, 0.25) };
        const c2 = { x: p1.x - dx * 0.45 + bulge, y: lerp(p0.y, p1.y, 0.75) };
        const e = smooth(tt);
        tx = bez(p0.x, c1.x, c2.x, p1.x, e);
        ty = bez(p0.y, c1.y, c2.y, p1.y, e);
        ts = lerp(a.s, b.s, smooth(clamp(tt / 0.65, 0, 1)));
        let px = p0.x, py = p0.y;
        const n = Math.max(1, Math.ceil(28 * tt));
        for (let i = 1; i <= n; i++) {
          const u = smooth((i / n) * tt);
          const qx = bez(p0.x, c1.x, c2.x, p1.x, u), qy = bez(p0.y, c1.y, c2.y, p1.y, u);
          walked += Math.hypot(qx - px, qy - py);
          px = qx;
          py = qy;
        }
      }

      /* phones: only a couple of stops, otherwise the dog waits at the screen edge above the bar */
      if (mobile && !(mode === "hold" && m[k] && m[k].y >= bandTop && m[k].y <= bandBottom)) {
        mode = "lane";
        k = -1;
        ts = 0.5;
        tx = vw - 54;
        ty = vh - bar + 8;
      }

      /* ---- smooth over any jump (switching stops, resize) ---- */
      const key = `${mode}:${k}`;
      if (key !== lastKey) {
        if (hasPos && mode !== "travel") {
          Zx = X - tx;
          Zy = Y - ty;
          Zs = S - ts;
        }
        lastKey = key;
      }
      const decay = Math.exp(-dt / 0.26);
      Zx *= decay;
      Zy *= decay;
      Zs *= decay;
      if (Math.abs(Zx) < 0.05 && Math.abs(Zy) < 0.05) Zx = Zy = 0;

      dash += (dashTarget - dash) * (1 - Math.exp(-dt / 0.1));
      let hopY = 0;
      const u = (t - hopT0) / 0.5;
      if (u >= 0 && u <= 1) hopY = 4 * u * (1 - u) * hopA * 30;

      S = ts + Zs;
      X = tx + Zx + dash;
      Y = ty + Zy - hopY * S;
      if (!hasPos) {
        prevX = X;
        prevY = Y;
        hasPos = true;
      }

      /* ---- what is the dog doing right now? ---- */
      const st = mode === "hold" ? stops[k] : null;
      const settling = Math.hypot(Zx, Zy) > 3;
      const dWalk = Math.abs(walked - prevWalked);
      prevWalked = walked;
      const dx = X - prevX, dy = Y - prevY;
      prevX = X;
      prevY = Y;
      const behind = !!st?.behind && !settling;
      if (layer.dataset.front !== String(!behind)) layer.dataset.front = String(!behind);

      if (st !== curStop) {
        // arrived at (or left) a stop
        curStop = st;
        queue = [];
        dashTarget = 0;
        set("duck", null);
        cock(0);
        if (st) {
          arrivedAt = t;
          nextIdle = t + 8;
          setWag(wagBase);
          if (st.act === "basket" || st.pose === "peek") setFace(st.face);
        }
      }

      let walking = false;
      if (mode === "travel" || mode === "lane") {
        walking = mode === "travel" ? dWalk > 0.15 : Math.hypot(dx, dy) > 0.4;
        if (mode === "lane") {
          setPose(settling ? "walk" : "peek");
          walking = settling;
        } else setPose(walking ? "walk" : "stand");
        if (Math.abs(dx) > 0.5 && Math.abs(dx) > 0.35 * Math.abs(dy)) setFace(dx > 0 ? 1 : -1);
        if (walking) setWag("fast");
        else setWag("slow");
      } else if (st) {
        const scrolling = t - lastScrollT < 0.2;
        if (settling) {
          setPose("walk");
          walking = true;
          if (Math.abs(dx) > 0.5) setFace(dx > 0 ? 1 : -1);
        } else if (st.act === "treadmill") {
          walking = scrolling;
          setPose(scrolling ? "walk" : "stand");
          if (scrolling) setFace(scrollDir > 0 ? 1 : -1);
          setWag(scrolling ? "fast" : "slow");
          if (scrolling) walkAcc += Math.min(60, Math.abs(dsy)) * 0.5;
        } else {
          setPose(st.pose);
          if (!queue.length || face !== st.face) setFace(st.face);
        }
      }
      if (Math.abs(dash) > 3 || Math.abs(dashTarget) > 0) {
        walking = true;
        setPose("walk");
        setFace(dashTarget - dash >= 0 ? 1 : -1);
      }
      set("stride", walking ? "1" : null);
      if (hopY > 6) set("air", "");
      else set("air", null);

      /* ---- footprints ---- */
      if (walking && mode !== "lane" && st?.act !== "treadmill") walkAcc += dWalk || Math.hypot(dx, dy);
      if (walkAcc > 34 * clamp(S, 0.5, 1.5)) {
        walkAcc = 0;
        printSide = -printSide;
        const heading = mode === "travel" && Math.abs(dx) + Math.abs(dy) > 0.2 ? Math.atan2(dy + dsy, dx) + Math.PI / 2 : face * (Math.PI / 2);
        const fx = X + printSide * 8 * S * Math.cos(heading);
        printAt(fx, Y + sy + 2 * S, heading);
      }

      /* ---- scripted actions + idle behaviour ---- */
      while (queue.length && queue[0][0] <= t) queue.shift()![1](t);

      if (st && !settling && !queue.length) {
        if (!introDone && st.pose === "peek" && st.act === "peekaboo" && t - arrivedAt > 0.35) {
          introDone = true;
          const arches = [...(st.scene?.querySelectorAll("[data-pup-look]") ?? [])];
          queue = [
            [t, () => set("duck", "")],
            [t + 0.6, (n) => (set("duck", null), say("peekaboo!", 1.6), hop(n, 0.5), open(n, 0.5))],
            [t + 1.5, (n) => arches[0] && (lookEl = { el: arches[0], until: n + 0.8 })],
            [t + 2.3, (n) => arches.length && (lookEl = { el: arches[arches.length - 1], until: n + 0.8 })],
            [t + 3.1, () => (lookEl = null, setWag("fast"))],
            [t + 4.2, () => setWag("slow")],
          ];
        } else if (st.act === "peekaboo" && t > nextChatter && t - lastScrollT > 1.2 && !petting) {
          // the hero pup barks hello every so often
          nextChatter = t + 6.5 + Math.random() * 3;
          queue = [
            [t, (n) => (open(n, 0.22), say("woof woof!", 1.7), hop(n, 0.3))],
            [t + 0.4, (n) => open(n, 0.22)],
          ];
        } else if (st.act === "basket" && t > nextIdle) {
          nextIdle = t + 4.5 + Math.random() * 3;
          if (Math.random() < 0.7) hop(t, 0.5);
          else queue = [[t, (n) => (open(n, 0.7), (eyesUntil = n + 0.7))]];
        } else if (t - lastActive > 9 && t > nextIdle && st.act !== "treadmill") {
          nextIdle = t + 9;
          queue = Math.random() < 0.55 ? ACTIONS.tilt(t) : [[t, () => setWag("fast")], [t + 2.4, () => setWag(wagBase)]];
        }
      }

      /* ---- face expressions & where the eyes point ---- */
      set("mouth", t < mouthUntil ? "open" : "closed");
      set("eyes", petting || t < eyesUntil ? "shut" : "open");

      const hx = X - FX * S + (face > 0 ? HEAD_X : SW - HEAD_X) * S;
      const hy = Y - FY * S + HEAD_Y * S;
      let target: { x: number; y: number } | null = null;
      if (lookEl && lookEl.until > t) {
        const r = lookEl.el.getBoundingClientRect();
        target = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      } else if (pointer && t - pointer.t < 2.5) target = pointer;
      const wantX = target ? clamp((target.x - hx) / (180 * S), -1, 1) * 4.5 * face : 0;
      const wantY = target ? clamp((target.y - hy) / (180 * S), -1, 1) * 3.5 : 0;
      ox += (wantX - ox) * (1 - Math.exp(-dt / 0.1));
      oy += (wantY - oy) * (1 - Math.exp(-dt / 0.1));
      svg.style.setProperty("--ox", ox.toFixed(2));
      svg.style.setProperty("--oy", oy.toFixed(2));

      if (petting && !petLoved && t - petAt > 0.7) {
        petLoved = true;
        queue = ACTIONS.love(t);
      }

      /* ---- paint ---- */
      actor.style.transform = `translate3d(${(X - FX * S).toFixed(2)}px, ${(Y - FY * S).toFixed(2)}px, 0)`;
      body.style.transform = `scale(${S.toFixed(4)})`;
      bubbleAt.style.transform = `translate(${((face > 0 ? HEAD_X + 2 : SW - HEAD_X - 2) * S).toFixed(1)}px, ${(14 * S).toFixed(1)}px)`;
      if (bubble.dataset.show === "true" && performance.now() / 1000 > sayUntil) bubble.dataset.show = "false";
      if (st?.scene) scenes(st.scene);
    };

    const marked = new Set<Element>();
    const scenes = (here: Element) => {
      if (marked.has(here)) return;
      marked.forEach((e) => (e as HTMLElement).dataset.here = "false");
      marked.clear();
      (here as HTMLElement).dataset.here = "true";
      marked.add(here);
    };

    /* -------------------------------------------------------- interaction */
    const poke = () => {
      const t = performance.now() / 1000;
      clicks = t - lastClick < 0.7 ? clicks + 1 : 1;
      lastClick = t;
      lastActive = t;
      const stop = curStop;
      if (clicks >= 4 && !(stop && (stop.act === "basket" || stop.pose === "peek"))) {
        clicks = 0;
        run("zoomies", t);
        return;
      }
      run(choose(stop), t);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") pointer = { x: e.clientX, y: e.clientY, t: performance.now() / 1000 };
    };
    const onCue = (e: Event) => {
      const d = (e as CustomEvent<Cue>).detail;
      const t = performance.now() / 1000;
      if (d.look) lookEl = { el: d.look, until: t + (d.secs ?? 1.4) };
      if (d.say) say(d.say, 1.4);
      if (d.hop) hop(t, d.hop);
    };
    const onFocus = (e: FocusEvent) => {
      const el = e.target;
      if (el instanceof HTMLElement && el.matches("a, button, input, textarea, select, summary")) lookEl = { el, until: performance.now() / 1000 + 1.4 };
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      petting = true;
      petLoved = false;
      petAt = performance.now() / 1000;
      lastActive = petAt;
      setWag("fast");
    };
    const onLeave = () => {
      petting = false;
      setWag(wagBase);
    };

    scan();
    const ro = new ResizeObserver(scanSoon);
    ro.observe(document.body);
    addEventListener("resize", scanSoon);
    addEventListener("load", scanSoon);
    document.fonts?.ready.then(scanSoon);
    addEventListener("pointermove", onPointerMove, { passive: true });
    addEventListener("pup:cue", onCue);
    addEventListener("focusin", onFocus);
    actor.addEventListener("click", poke);
    actor.addEventListener("pointerenter", onEnter);
    actor.addEventListener("pointerleave", onLeave);
    const onReduce = () => reduce.matches && (cancelAnimationFrame(raf), (layer.hidden = true), delete html.dataset.pup);
    reduce.addEventListener("change", onReduce);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(scanTimer);
      ro.disconnect();
      removeEventListener("resize", scanSoon);
      removeEventListener("load", scanSoon);
      removeEventListener("pointermove", onPointerMove);
      removeEventListener("pup:cue", onCue);
      removeEventListener("focusin", onFocus);
      actor.removeEventListener("click", poke);
      actor.removeEventListener("pointerenter", onEnter);
      actor.removeEventListener("pointerleave", onLeave);
      reduce.removeEventListener("change", onReduce);
      delete html.dataset.pup;
      rescan.current = null;
    };
  }, []);

  return (
    <>
      <div ref={printsRef} aria-hidden className="pup-prints">
        {Array.from({ length: 24 }, (_, i) => (
          <svg key={i} viewBox="0 0 64 64"><path d={PAW_D} /></svg>
        ))}
      </div>
      <div ref={layerRef} aria-hidden hidden data-front="true" className="pup-layer">
        <div ref={actorRef} className="pup-actor">
          <div ref={bodyRef} className="pup-actor__body">
            <PupSprite live pose="sit" />
          </div>
          <span ref={bubbleAtRef} className="pup-bubble-at">
            <span ref={bubbleRef} className="pup-bubble" data-show="false" />
          </span>
        </div>
      </div>
    </>
  );
}
