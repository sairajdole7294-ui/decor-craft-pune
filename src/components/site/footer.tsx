import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { company, media, industries } from "@/lib/site-data";

const columns = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/manufacturing", label: "Manufacturing" },
      { to: "/clients", label: "Clients" },
      { to: "/careers", label: "Careers" },
      { to: "/insights", label: "Insights" },
    ],
  },
  {
    title: "Work",
    links: [
      { to: "/services", label: "Services" },
      { to: "/projects", label: "Projects" },
      { to: "/gallery", label: "Gallery" },
      { to: "/contact", label: "Project Planner" },
      { to: "/contact", label: "Book Consultation" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms & Conditions" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="surface-ink">
      <div className="shell grid gap-6 py-6 lg:grid-cols-[1.5fr_2fr_1.4fr] lg:py-8">
        <div>
          <div className="flex items-center">
            <img
              src={media.logo}
              alt="Payal Decor"
              className="h-14 w-auto max-w-[11rem] object-contain sm:h-16 sm:max-w-[12rem]"
            />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-foreground/65">
            Turnkey commercial interiors, modular furniture and custom manufacturing — designed,
            produced in our own factory and installed by our own teams.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="text-[0.7rem] font-bold tracking-[0.18em] text-primary uppercase">{c.title}</h3>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-ink-foreground/65 transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-[0.7rem] font-bold tracking-[0.18em] text-primary uppercase">Studio & Factory</h3>
          <ul className="mt-3 space-y-3 text-sm text-ink-foreground/65">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{company.address}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={company.phoneHref} className="transition-colors hover:text-primary">{company.phone}</a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`mailto:${company.email}`} className="break-all transition-colors hover:text-primary">
                {company.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {company.hours.map((h) => (
                  <span key={h.d} className="block">
                    {h.d} · {h.t}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-wrap gap-x-3 gap-y-1 py-3 text-[0.68rem] text-ink-foreground/45">
          <span className="font-semibold text-ink-foreground/60">Industries served:</span>
          {industries.map((i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-2 py-4 text-xs text-ink-foreground/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Payal Decor. All rights reserved.</p>
          <p>Designed, manufactured and installed in Pune, Maharashtra.</p>
        </div>
      </div>
    </footer>
  );
}