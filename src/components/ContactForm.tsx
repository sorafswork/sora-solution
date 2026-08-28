import { motion } from "motion/react";
import { useState } from "react";
import { CONTACT, SERVICE_OPTIONS } from "@/lib/site-data";
import { Reveal, SectionLabel, SplitLines } from "./Reveal";

const field =
  "w-full rounded-xl border border-border bg-background/40 px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-1 focus:ring-accent";

export function ContactForm() {
  const [service, setService] = useState(SERVICE_OPTIONS[0]!);
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Service: ${service}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `New project enquiry — ${service}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-40">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-[1400px] gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionLabel>Contact</SectionLabel>
          <h2 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tighter sm:text-7xl">
            <SplitLines lines={["Let's build", "something rare."]} />
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">
            Tell us about the project. We reply within one business day with a clear scope,
            timeline and price.
          </p>

          <dl className="mt-12 space-y-6">
            {[
              { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
              {
                label: "Phone",
                value: CONTACT.phone,
                href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
              },
              {
                label: "WhatsApp",
                value: "Message us",
                href: `https://wa.me/${CONTACT.whatsapp}`,
              },
              {
                label: "Instagram",
                value: `@${CONTACT.instagram}`,
                href: `https://instagram.com/${CONTACT.instagram}`,
              },
            ].map((row) => (
              <Reveal key={row.label}>
                <div className="flex items-baseline justify-between gap-6 border-b border-border pb-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd>
                    <a
                      href={row.href}
                      data-cursor="link"
                      className="text-sm transition-colors hover:text-accent"
                    >
                      {row.value}
                    </a>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-3xl p-7 sm:p-10"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Name
              </span>
              <input name="name" required className={field} placeholder="Your name" />
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                className={field}
                placeholder="you@company.com"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Phone
            </span>
            <input name="phone" className={field} placeholder="+91 00000 00000" />
          </label>

          <fieldset className="mt-6">
            <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Service
            </legend>
            <div className="flex flex-wrap gap-2">
              {SERVICE_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setService(s)}
                  aria-pressed={service === s}
                  className={`rounded-full border px-3.5 py-2 text-xs transition-colors ${
                    service === s
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:border-accent/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="mt-6 block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Project details
            </span>
            <textarea
              name="message"
              rows={5}
              required
              className={`${field} resize-none`}
              placeholder="Goals, timeline, budget range…"
            />
          </label>

          <button
            type="submit"
            data-cursor="SEND"
            className="mt-8 w-full rounded-full bg-accent px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-accent-foreground transition-transform hover:scale-[1.01]"
          >
            {sent ? "Opening your mail app…" : "Send enquiry"}
          </button>
          <p aria-live="polite" className="mt-3 text-center text-xs text-muted-foreground">
            {sent
              ? "If nothing opened, email us directly at " + CONTACT.email
              : "We never share your details."}
          </p>
        </motion.form>
      </div>
    </section>
  );
}
