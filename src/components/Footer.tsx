import { CONTACT, WORLD_SERVICES } from "@/lib/site-data";
import { ThemeSwitcher } from "./ThemeSwitcher";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border pb-8 pt-14">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <img
              src="/brand/sora-logo.png"
              alt="SoRa Innovative Solution logo"
              width={160}
              height={48}
              loading="lazy"
              className="h-12 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A digital studio crafting premium websites, brands and growth systems for ambitious
              businesses.
            </p>
            <div className="mt-7">
              <ThemeSwitcher variant="inline" />
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Navigate
            </h2>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    data-cursor="link"
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {WORLD_SERVICES.map((s) => (
                <li key={s.title} className="text-sm text-muted-foreground">
                  {s.title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Connect
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  data-cursor="link"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  data-cursor="link"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  data-cursor="link"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${CONTACT.instagram}`}
                  data-cursor="link"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={`https://github.com/${CONTACT.github}`}
                  data-cursor="link"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} SoRa Innovative Solution
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {CONTACT.website}
          </p>
        </div>
      </div>
    </footer>
  );
}
