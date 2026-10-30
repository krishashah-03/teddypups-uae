import { PHONE_TEL, WHATSAPP } from "@/lib/site";

export default function MobileBar() {
  return (
    <div
      data-whatsapp-bar
      className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t-2 border-cocoa bg-milk px-4 pt-2.5 md:hidden"
      style={{ height: "var(--bar-h)", paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-leaf flex-1 !py-2">WhatsApp us</a>
      <a href={PHONE_TEL} className="btn btn-ghost !py-2 px-6">Call</a>
    </div>
  );
}
