import { Link } from "@tanstack/react-router";
import {
  Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck, Factory, Award,
  Star, Truck, Check, ArrowRight,
} from "lucide-react";
import { company, certifications, industries, galleryItems } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";
import { CatalogDownload } from "@/components/site/product-media";

const trust = [
  { icon: Award, k: "30+ Years", v: "Since 1992" },
  { icon: Factory, k: "In-house", v: "Own CNC lines" },
  { icon: ShieldCheck, k: "ISO 9001:2015", v: "Certified QMS" },
  { icon: Truck, k: "500+ Projects", v: "Delivered" },
];

function ContactActions() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <a
        href={company.phoneHref}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5"
      >
        <Phone className="size-3.5" /> Call {company.phone}
      </a>
      <a
        href={company.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
      >
        <MessageCircle className="size-3.5" /> WhatsApp us
      </a>
    </div>
  );
}

function TrustGrid() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {trust.map((t) => (
        <div key={t.k} className="rounded-xl border border-border bg-secondary/40 p-3">
          <t.icon className="size-4 text-primary" />
          <p className="mt-1.5 text-xs font-bold">{t.k}</p>
          <p className="text-[0.68rem] text-muted-foreground">{t.v}</p>
        </div>
      ))}
    </div>
  );
}

/** Side panel used beside the homepage FAQ list. */
export function SupportPanel() {
  return (
    <div className="grid gap-3">
      <Reveal className="card-premium p-5">
        <p className="text-[0.65rem] font-bold tracking-[0.14em] text-primary uppercase">Free Consultation</p>
        <h3 className="mt-2 text-lg font-semibold">Talk to the team running your project</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          Site visit, measurement and budget guidance at no cost across Pune. Typical response time under 2 working hours.
        </p>
        <div className="mt-3">
          <ContactActions />
        </div>
      </Reveal>

      <Reveal delay={70} className="card-premium p-5">
        <TrustGrid />
      </Reveal>

      <Reveal delay={120} className="card-premium grid gap-3 p-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="flex items-center gap-1 text-primary">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Rated by corporates, campuses and manufacturers across Maharashtra — Kirloskar, EKA Mobility, Prakash Masale and more.
        </p>
        <div className="sm:col-span-2">
          <CatalogDownload label="Download Company Profile (PDF)" />
        </div>
      </Reveal>
    </div>
  );
}

/** Compact steps card shown under a quote form so the column never ends short. */
export function EnquiryProcess() {
  const steps = [
    { t: "You send the brief", d: "Product, quantity, finish and site details reach our team on WhatsApp instantly." },
    { t: "We review & call back", d: "A project engineer confirms sizes, materials and timelines — usually within 2 working hours." },
    { t: "Customised quotation", d: "Itemised pricing with drawings, finish options and delivery schedule. No online pricing guesswork." },
    { t: "Production & installation", d: "Manufactured in our Katraj facility and installed by our own supervisors." },
  ];
  return (
    <Reveal delay={60} className="card-premium p-5">
      <h3 className="text-sm font-bold text-primary">What happens after you enquire</h3>
      <ol className="mt-3 grid gap-3">
        {steps.map((s, i) => (
          <li key={s.t} className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-gradient text-[0.65rem] font-bold text-primary-foreground">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold">{s.t}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

/** Factory / studio visit card with map — balances the quote column. */
export function VisitCard() {
  return (
    <Reveal delay={100} className="card-premium overflow-hidden">
      <div className="p-5">
        <h3 className="text-sm font-bold text-primary">Visit the factory & studio</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          See material samples, hardware options and live production before you award — walk-ins welcome Mon–Sat, 9:30 am – 7:00 pm.
        </p>
      </div>
      <iframe
        title="Payal Decor factory location"
        src="https://www.google.com/maps?q=Katraj%20Pune&output=embed"
        className="h-44 w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Reveal>
  );
}

/** Rich supporting column shown beside every Request Quote form. */
export function QuotePanel({ industriesServed = industries.slice(0, 8) }: { industriesServed?: string[] }) {
  const shots = galleryItems.slice(0, 4);
  return (
    <div className="grid gap-3">
      <Reveal className="card-premium p-5">
        <h3 className="text-sm font-bold text-primary">Why choose Payal Decor</h3>
        <ul className="mt-3 grid gap-2">
          {[
            "In-house manufacturing — no third-party job work",
            "ISO 9001:2015 documented quality checks",
            "Drawings, finishes and samples before production",
            "Site installation by our own supervisors",
          ].map((p) => (
            <li key={p} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
              <Check className="mt-0.5 size-3.5 shrink-0 text-primary" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <TrustGrid />
        </div>
      </Reveal>

      <Reveal delay={70} className="card-premium p-5">
        <h3 className="text-sm font-bold text-primary">Contact</h3>
        <div className="mt-3 grid gap-2.5">
          <a href={company.phoneHref} className="flex items-start gap-2 text-xs font-medium hover:text-primary">
            <Phone className="mt-0.5 size-3.5 shrink-0 text-primary" /> {company.phone}
          </a>
          <a href={`mailto:${company.email}`} className="flex items-start gap-2 text-xs font-medium hover:text-primary">
            <Mail className="mt-0.5 size-3.5 shrink-0 text-primary" /> {company.email}
          </a>
          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" /> {company.address}
          </p>
          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <Clock className="mt-0.5 size-3.5 shrink-0 text-primary" /> Mon – Sat, 9:30 am – 7:00 pm
          </p>
        </div>
        <div className="mt-3">
          <ContactActions />
        </div>
      </Reveal>

      <Reveal delay={110} className="card-premium p-5">
        <h3 className="text-sm font-bold text-primary">Industries served</h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {industriesServed.map((i) => (
            <span key={i} className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[0.68rem] font-medium text-muted-foreground">
              {i}
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {shots.map((g) => (
            <div key={g.src} className="hover-zoom overflow-hidden rounded-lg border border-border">
              <img src={g.src} alt={g.title} className="aspect-square w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
        <Link to="/projects" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
          View delivered projects <ArrowRight className="size-3.5" />
        </Link>
      </Reveal>

      <Reveal delay={150} className="card-premium p-5">
        <h3 className="text-sm font-bold text-primary">Certifications</h3>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {certifications.map((c) => (
            <img key={c.title} src={c.image} alt={c.title} className="h-10 w-full object-contain" loading="lazy" />
          ))}
        </div>
        <div className="mt-4">
          <CatalogDownload label="Download Brochure (PDF)" />
        </div>
      </Reveal>
    </div>
  );
}
