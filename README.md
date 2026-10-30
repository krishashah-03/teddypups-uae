# TeddyPups U.A.E. — website clone

A Next.js clone of https://puppy.instabizweb.com/ (assignment build).

## Stack
- Next.js 16 (App Router, Cache Components, React Compiler), React 19, TypeScript
- Tailwind CSS v4 (design tokens in `app/globals.css`)
- `next/font`: Fraunces (display), Figtree (body), Shantell Sans (handwriting)

## Routes
`/`, `/puppies` (breed / origin filters via query string), `/puppies/[slug]` (42 profiles, statically generated), `/gone-home`, `/happy-families`, `/how-it-works`, `/faq`, `/contact`, plus `POST /api/enquiry`.

## Structure
```
app/                 routes + global styles
components/          Header, Footer, MobileBar, Gallery, PuppyCards, EnquiryForm, FaqList, Reveal
lib/puppies.ts       puppy catalogue (generated from the reference, edit freely)
lib/families.ts      happy-family photo lists
lib/site.ts          contact details, nav, FAQ copy
public/media, brand  images and videos copied from the reference
```

## Run
```
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Environment (optional)
- `NEXT_PUBLIC_SITE_URL` — canonical URL for metadata
- `ENQUIRY_WEBHOOK_URL` — if set, enquiries are POSTed here as JSON (Slack, Zapier, Make, Apps Script…). Otherwise they are logged on the server.

## Notes
- Forms validate on the server and include a honeypot field.
- Scroll reveals and door animations respect `prefers-reduced-motion`.
- Content and imagery belong to the reference business; this is a learning clone.
