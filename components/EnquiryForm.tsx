"use client";
import { useState } from "react";
import { wa } from "@/lib/site";

type Errors = Record<string, string>;

function Field({ name, label: l, ph, type = "text", required, hint, error }: { name: string; label: string; ph?: string; type?: string; required?: boolean; hint?: string; error?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{l}{required && " *"}</span>
      <input name={name} type={type} required={required} placeholder={ph} className="field mt-1" aria-invalid={!!error} />
      {hint && <span className="text-xs text-cocoa-soft">{hint}</span>}
      {error && <span role="alert" className="block text-sm font-semibold text-toffee-deep">{error}</span>}
    </label>
  );
}

/** Standard enquiry form used on each puppy page. */
export function PuppyEnquiryForm({ id, label, defaultMessage }: { id: string; label: string; defaultMessage: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setState("sending");
    setErrors({});
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...fd, puppy: label }) });
      const json = await res.json();
      if (json.ok) setState("done");
      else {
        setErrors(json.errors ?? {});
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "done")
    return (
      <div className="paper p-8 text-center" role="status">
        <p className="display text-3xl">Woof — got it!</p>
        <p className="mt-2 text-cocoa-soft">Thanks for writing. Our team will get back to you promptly. For the quickest reply, message us on WhatsApp.</p>
        <a className="btn btn-leaf mt-5" href={wa(`Hi TeddyPups! I just sent an enquiry about ${label}.`)} target="_blank" rel="noopener">WhatsApp us</a>
      </div>
    );


  return (
    <form id={id} onSubmit={onSubmit} noValidate className="paper grid gap-5 p-6 md:p-8">
      <Field name="name" label="Your name" required error={errors.name} />
      <Field name="phone" label="Phone or WhatsApp" required type="tel" hint="With country code, e.g. +971 50 123 4567" error={errors.phone} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="email" label="Email (optional)" type="email" error={errors.email} />
        <Field name="area" label="Your area (optional)" ph="e.g. Dubai Marina" />
      </div>
      <label className="block">
        <span className="text-sm font-bold">Message (optional)</span>
        <textarea name="message" rows={3} defaultValue={defaultMessage} className="field mt-1 resize-y" />
      </label>
      <div className="hp" aria-hidden><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {state === "error" && !Object.keys(errors).length && <p role="alert" className="font-semibold text-toffee-deep">Something went wrong — please try again or message us on WhatsApp.</p>}
      <button className="btn btn-toffee justify-self-start" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send enquiry"}</button>
    </form>
  );
}

/** "Dear TeddyPups, my name is ___" letter-style form for the contact page. */
export function ContactLetter({ options }: { options: string[] }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setState("sending");
    setErrors({});
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(fd) });
      const json = await res.json();
      if (json.ok) setState("done");
      else {
        setErrors(json.errors ?? {});
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "done")
    return (
      <div className="paper p-10 text-center" role="status">
        <p className="display text-4xl">Letter posted!</p>
        <p className="mt-3 text-cocoa-soft">Thank you — our team will write back promptly.</p>
      </div>
    );

  const err = (k: string) => errors[k] && <span role="alert" className="block text-sm font-semibold text-toffee-deep">{errors[k]}</span>;
  return (
    <form onSubmit={onSubmit} noValidate className="paper relative p-6 pt-14 md:p-10 text-lg leading-[2.6] md:leading-[2.8]">
      <span aria-hidden className="absolute right-4 top-4 grid h-16 w-16 rotate-6 place-items-center bg-honey-soft text-toffee md:right-6 md:top-5 md:h-20 md:w-20" style={{ clipPath: "polygon(0 4%,4% 0,10% 4%,16% 0,22% 4%,28% 0,34% 4%,40% 0,46% 4%,52% 0,58% 4%,64% 0,70% 4%,76% 0,82% 4%,88% 0,94% 4%,100% 0,96% 6%,100% 12%,96% 18%,100% 24%,96% 30%,100% 36%,96% 42%,100% 48%,96% 54%,100% 60%,96% 66%,100% 72%,96% 78%,100% 84%,96% 90%,100% 96%,94% 100%,88% 96%,82% 100%,76% 96%,70% 100%,64% 96%,58% 100%,52% 96%,46% 100%,40% 96%,34% 100%,28% 96%,22% 100%,16% 96%,10% 100%,4% 96%,0 100%,4% 94%,0 88%,4% 82%,0 76%,4% 70%,0 64%,4% 58%,0 52%,4% 46%,0 40%,4% 34%,0 28%,4% 22%,0 16%,4% 10%)", outline: "2px dashed #2a170e" }}><svg viewBox="0 0 24 24" className="h-9 w-9 md:h-11 md:w-11" fill="currentColor"><ellipse cx="6" cy="10" rx="2.3" ry="3"/><ellipse cx="10.5" cy="5.8" rx="2.3" ry="3"/><ellipse cx="16.5" cy="5.8" rx="2.3" ry="3"/><ellipse cx="21" cy="10" rx="2.3" ry="3"/><path d="M12.8 11c-3 0-6 3.6-6 6.2 0 2 1.6 2.8 3.4 2.8 1 0 1.7-.4 2.6-.4s1.6.4 2.6.4c1.8 0 3.4-.8 3.4-2.8 0-2.6-3-6.2-6-6.2z"/></svg></span>
      <p className="hand text-2xl leading-normal">Dear TeddyPups,</p>
      <p>
        my name is{" "}
        <input name="name" required aria-label="Your name" className="field !inline-block !w-56 max-w-full" aria-invalid={!!errors.name} />
        , and you can reach me on{" "}
        <input name="phone" required type="tel" aria-label="Phone" placeholder="+971 50 123 4567" className="field !inline-block !w-56 max-w-full" aria-invalid={!!errors.phone} />
        {" "}or by email at{" "}
        <input name="email" type="email" aria-label="Email" className="field !inline-block !w-64 max-w-full" />
        . I live in{" "}
        <input name="area" aria-label="Area" placeholder="e.g. Dubai Marina" className="field !inline-block !w-48 max-w-full" />
        , and I&apos;m curious about{" "}
        <select name="puppy" aria-label="Puppy you're interested in (optional)" className="field !inline-block !w-auto max-w-full">
          <option value="">any puppy (not sure yet)</option>
          {options.map((o, i) => <option key={i} value={o}>{o}</option>)}
        </select>
        .
      </p>
      {err("name")}{err("phone")}{err("email")}
      <label className="mt-2 block text-base leading-normal">
        <span className="font-bold">Your message (optional)</span>
        <textarea name="message" rows={3} placeholder="Anything else you'd like to tell us…" className="field mt-1 resize-y" />
      </label>
      <div className="hp" aria-hidden><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 leading-normal">
        <span className="hand text-toffee-ink">with love, a future puppy parent</span>
        <button className="btn btn-toffee" disabled={state === "sending"}>{state === "sending" ? "Posting…" : "Post my letter"}</button>
      </div>
      {state === "error" && !Object.keys(errors).length && <p role="alert" className="mt-3 font-semibold text-toffee-deep">Something went wrong — please try again or message us on WhatsApp.</p>}
    </form>
  );
}
