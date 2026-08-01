import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./motion";
import { company, clientLogos, media } from "@/lib/site-data";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="h-px w-6 bg-brand-gradient" />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "ink";
  action?: ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "mb-5 flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          className={cn(
            "mt-2 text-2xl leading-[1.12] font-semibold sm:text-3xl lg:text-[2.6rem]",
            tone === "ink" ? "text-ink-foreground" : "text-foreground",
          )}
        >
          {title}
        </h2>
        {lead ? (
          <p
            className={cn(
              "mt-3 text-sm leading-relaxed sm:text-[0.95rem]",
              tone === "ink" ? "text-ink-foreground/70" : "text-muted-foreground",
            )}
          >
            {lead}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}

export function BrandButton({
  to,
  href,
  children,
  variant = "solid",
  className,
  onClick,
  type,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost-light";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
  const styles = {
    solid: "bg-brand-gradient text-primary-foreground shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5",
    outline: "border border-border bg-card text-foreground hover:border-primary hover:text-primary",
    "ghost-light": "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
  }[variant];
  const cls = cn(base, styles, className);
  const inner = (
    <>
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  image: string;
  crumbs: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden surface-ink">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover opacity-25"
        loading="eager"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(1000px_420px_at_15%_0%,color-mix(in_oklab,var(--primary)_38%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40"
      />
      <div className="shell relative py-9 sm:py-11 lg:py-14">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-ink-foreground/60">
          <Link to="/" className="transition-colors hover:text-primary">Home</Link>
          <ChevronRight className="size-3" />
          <span className="text-ink-foreground/85">{crumbs}</span>
        </nav>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-2 max-w-3xl text-3xl leading-[1.08] font-semibold text-ink-foreground sm:text-4xl lg:text-[3.4rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-foreground/70 sm:text-base">{lead}</p>
        </Reveal>
        {children ? <Reveal delay={120} className="mt-6">{children}</Reveal> : null}
      </div>
    </header>
  );
}

export function LogoMarquee({ reverse = false }: { reverse?: boolean }) {
  const row = [...clientLogos, ...clientLogos];
  return (
    <div className="group relative overflow-hidden">
      <div
        className="flex w-max gap-3 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${reverse ? "58s" : "46s"} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-card p-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-card)]"
          >
            <img
              src={src}
              alt="Payal Decor client logo"
              loading="lazy"
              className="max-h-12 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

export function CtaBand({
  title = "Let's measure your next space, together.",
  lead = "For more info or enquiry about our products, projects and pricing, get in touch — corporate, retail, hospitality or institutional. Our team responds within one business day.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="shell py-7 lg:py-9">
      <Reveal className="relative isolate overflow-hidden rounded-3xl surface-ink px-6 py-10 sm:px-10 lg:px-14">
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-16 size-72 rounded-full bg-brand-gradient opacity-25 blur-3xl"
        />
        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Eyebrow>Start a Project</Eyebrow>
            <h2 className="mt-2 max-w-2xl text-2xl leading-tight font-semibold text-ink-foreground sm:text-3xl lg:text-[2.4rem]">
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-foreground/70">{lead}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <BrandButton to="/contact">Book Free Consultation</BrandButton>
            <BrandButton href={company.phoneHref} variant="ghost-light">
              {company.phone}
            </BrandButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
export function LegalPage({
  crumbs,
  title,
  lead,
  sections,
}: {
  crumbs: string;
  title: string;
  lead: string;
  sections: { h: string; p: string }[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" crumbs={crumbs} title={title} lead={lead} image={media.about1} />
      <section className="shell py-7 lg:py-9">
        <div className="mx-auto grid max-w-3xl gap-4">
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 70} className="card-premium p-5 transition-all duration-300 hover:-translate-y-0.5">
              <h2 className="text-base font-semibold text-foreground">{s.h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
            </Reveal>
          ))}
          <p className="mt-2 text-xs text-muted-foreground">
            Questions? Write to{" "}
            <a href={`mailto:${company.email}`} className="font-semibold text-primary hover:underline">
              {company.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
