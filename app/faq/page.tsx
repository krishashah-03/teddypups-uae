import type { Metadata } from "next";
import FaqBoard from "@/components/FaqBoard";
import Floaters from "@/components/Floaters";
import { FAQS } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about vaccinations, imports, delivery and life after your puppy comes home.",
};

export default function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#a05a30] via-[#6b3a1e] to-night pb-28 pt-12 text-milk md:pt-16">
      <Floaters kind="dust" count={26} />
      <div className="wrap relative">
        <h1 className="display text-5xl md:text-7xl">Questions &amp; answers</h1>
        <p className="mt-4 max-w-xl text-lg text-milk/85">Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our team is available 24/7.</p>
        <div className="mt-10"><FaqBoard items={FAQS} /></div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
