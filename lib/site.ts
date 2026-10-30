export const PHONE = "+971 54 167 6733";
export const PHONE_TEL = "tel:+971541676733";
export const EMAIL = "teddypupsadmin@gmail.com";
export const wa = (text = "Hi TeddyPups! I'd love to know more about your puppies.") =>
  `https://wa.me/971541676733?text=${encodeURIComponent(text)}`;
export const WHATSAPP = wa();
export const SOCIAL = {
  Instagram: "https://www.instagram.com/teddypups.worldwide/",
  TikTok: "https://www.tiktok.com/@teddypupsuae",
  Facebook: "https://www.facebook.com/profile.php?id=61567496944539",
};
export const MAPS = "https://maps.app.goo.gl/ZdJvwHBSQWWZT54s7";
export const NAV = [
  { href: "/", label: "Home" },
  { href: "/puppies", label: "Puppies" },
  { href: "/happy-families", label: "Happy families" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Visit & contact" },
];
export const FAQS: readonly [string, string][] = [
  ["Are your puppies vaccinated and health-checked?", "Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family."],
  ["Can I meet a puppy before I decide?", "Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision."],
  ["Can I take my puppy home the same day?", "Local puppies are available immediately, so you can take your puppy home the same day."],
  ["Do you import puppies from abroad?", "Yes. Through our Order Upon Request service we source rare and premium teacup breeds from the most reputable, certified breeders across Europe, Korea, and beyond — and we handle the import for you."],
  ["How does an imported puppy travel to Dubai?", "We manage every part of the import process, including health checks, travel arrangements, and the necessary documentation, so your puppy arrives happy, healthy, and stress-free."],
  ["Will I see photos and health details first?", "Yes. Photos, videos, and health certificates are shared before your puppy travels, and our team sends real photos and health details directly on WhatsApp."],
  ["Do you deliver?", "Yes. We deliver within Dubai, and our trusted international cargo partners deliver puppies safely to loving homes all around the world."],
  ["Which breeds do you usually have?", "Breeds we regularly have include Maltipoo, Pomeranian, Poodle and Bichon, plus rare teacup lines such as Korean teacup poodles, Maltese, Pom and Yorkie."],
  ["Is there help after my puppy comes home?", "Yes. Our team is available 24/7 and offers advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend."],
];
