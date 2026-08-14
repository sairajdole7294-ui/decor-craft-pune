import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import * as Icons from "lucide-react";
import { Sparkles } from "lucide-react";

const processIcons = [
  Icons.MessagesSquare,
  Icons.Ruler,
  Icons.PenTool,
  Icons.Factory,
  Icons.Truck,
  Icons.BadgeCheck,
];
import {
  media, company, stats, services, products, usps, projects, capabilities,
  processSteps, testimonials, faqs, certifications, industries,
} from "@/lib/site-data";
import { Reveal, Counter } from "@/components/site/motion";
import { SectionHead, BrandButton, LogoMarquee, CtaBand, Eyebrow } from "@/components/site/bits";
import { CostCalculator } from "@/components/site/calculator";
import { SupportPanel } from "@/components/site/panels";
import { BeforeAfter } from "@/components/site/gallery-explorer";

const title = "Payal Decor — Commercial Interiors & Manufacturing in Pune";
const description =
  "Turnkey commercial interiors, modular furniture and in-house manufacturing in Pune since 1992. ISO 9001:2015 certified, 500+ projects delivered.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const chips = [
  { label: "Modular Kitchens", to: "/services" },
  { label: "Office Furniture", to: "/services" },
  { label: "Commercial Interiors", to: "/services" },
  { label: "Manufacturing", to: "/manufacturing" },
  { label: "Project Planner", to: "/contact" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Book Visit", to: "/contact" },
];

function Index() {
  return (
    <>
      <section className="relative isolate -mt-[4.25rem] min-h-[72dvh] overflow-hidden lg:-mt-[5rem] lg:min-h-[80dvh]">
        <video
          className="absolute inset-0 size-full object-cover object-[center_40%]"
          src={media.heroVideo}
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-ink/45 via-ink/25 to-transparent" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(900px_400px_at_10%_10%,color-mix(in_oklab,var(--primary)_32%,transparent),transparent_65%)]"
        />

        <div className="shell relative flex min-h-[72dvh] flex-col justify-center pt-24 pb-10 lg:min-h-[80dvh] lg:pt-28 lg:pb-12">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              Since 1992 · Pune · ISO 9001:2015
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 max-w-4xl text-4xl leading-[1.03] font-bold text-white sm:text-6xl lg:text-[4.6rem]">
              Interiors that <span className="text-gradient-brand">mean business.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              Turnkey commercial interiors, modular furniture and custom manufacturing — designed, produced in our own
              factory and installed by our own teams.
            </p>
          </Reveal>
          <Reveal delay={280} className="mt-6 flex flex-wrap gap-3">
            <BrandButton to="/contact">Book Free Consultation</BrandButton>
            <BrandButton to="/gallery" variant="ghost-light">Watch Our Work</BrandButton>
            <BrandButton to="/ai-space-visualizer" variant="outline">
              <Sparkles className="size-4" />
              AI Visualize Your Space
            </BrandButton>
          </Reveal>

          <Reveal delay={360} className="mt-7 flex flex-wrap gap-2">
            {chips.map((c) => (
              <Link
                key={c.label}
                to={c.to}
                className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-white/15 hover:text-white"
              >
                {c.label}
              </Link>
            ))}
          </Reveal>

          <Reveal delay={440} className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md transition-colors hover:border-primary/60"
              >
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white lg:text-3xl">
                  {s.raw ? s.raw : <Counter to={s.value} suffix={s.suffix} />}
                </p>
                <p className="mt-1 text-xs font-semibold text-white/70">{s.label}</p>
                <p className="text-[0.65rem] text-white/45">{s.note}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="shell grid gap-6 py-6 lg:grid-cols-2 lg:items-center lg:py-8">
        <Reveal className="hover-zoom relative overflow-hidden rounded-3xl border border-border">
          <img src={media.about1} alt="Payal Decor commercial interior project in Pune" className="h-[22rem] w-full object-cover lg:h-[28rem]" loading="lazy" />
          <div className="absolute bottom-4 left-4 rounded-2xl bg-card/95 px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur">
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-gradient-brand">
              <Counter to={30} suffix="+" />
            </p>
            <p className="text-[0.68rem] font-semibold text-muted-foreground">Years of measured craft</p>
          </div>
        </Reveal>
        <div>
          <SectionHead
            eyebrow="Our Story"
            title="Three decades of measured craft"
            lead="Since 1992, Payal Decor has been transforming homes and commercial spaces with modern interiors and modular furniture solutions. With over 30 years of expertise, we specialize in modular kitchens, office interiors and custom furniture designed to blend elegance with functionality."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Vision", d: "To become a leading force in commercial decor manufacturing and turnkey interiors, setting the benchmark for excellence and design integrity." },
              { t: "Mission", d: "To deliver high-quality, functional and innovative interior solutions tailored specifically for commercial spaces." },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 100} className="card-premium p-4">
                <h3 className="text-sm font-bold text-primary">{v.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={180} className="group relative mt-5 overflow-hidden rounded-3xl border border-border bg-secondary/40 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-lift)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-10 size-44 rounded-full bg-brand-gradient opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-25"
            />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative shrink-0">
                <span
                  aria-hidden="true"
                  className="absolute -inset-1 rounded-full bg-brand-gradient opacity-60 blur-[2px] transition-opacity duration-500 group-hover:opacity-100"
                />
                <img
                  src={media.founder}
                  alt="Swaroop Suthar, Founder & CEO of Payal Decor"
                  className="relative size-28 rounded-full border-2 border-card object-cover shadow-[var(--shadow-card)] transition-transform duration-700 group-hover:scale-[1.04] sm:size-32"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="text-[0.62rem] font-bold tracking-[0.16em] text-primary uppercase">Leadership</span>
                <p className="mt-2 text-base leading-relaxed font-medium italic sm:text-lg">
                  &ldquo;Every material tells a story. Our role is to shape it with intent.&rdquo;
                </p>
                <p className="mt-2 text-sm font-bold">Swaroop Suthar</p>
                <p className="text-xs font-semibold text-muted-foreground">Founder &amp; CEO · Payal Decor</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="bg-sand py-6 lg:py-8">
        <div className="shell">
          <SectionHead
            eyebrow="What We Do"
            title="Services engineered for commercial life"
            lead="Four disciplines, one delivery team — so nothing falls between design, factory and site."
            action={<BrandButton to="/services" variant="outline">Explore all services</BrandButton>}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 90}>
                <article className="card-premium group h-full overflow-hidden">
                  <div className="hover-zoom relative">
                    <img src={s.image} alt={s.title} className="h-40 w-full object-cover" loading="lazy" />
                    <span className="absolute top-3 left-3 rounded-lg bg-ink/70 px-2 py-1 font-[family-name:var(--font-display)] text-xs font-bold text-white backdrop-blur">
                      {s.n}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base leading-snug font-semibold">{s.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.summary}</p>
                    <ul className="mt-3 max-h-0 space-y-1 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-1.5 text-[0.72rem] text-muted-foreground">
                          <Icons.Check className="mt-0.5 size-3 shrink-0 text-primary" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="shell py-6 lg:py-8">
        <SectionHead
          eyebrow="Why Payal Decor"
          title={<>Eight reasons clients keep <span className="text-gradient-brand">coming back</span></>}
          lead="One accountable partner from first measurement to final handover — with the factory, the teams and the certifications to back it up."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((u, i) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[u.icon] ?? Icons.Sparkles;
            return (
              <Reveal key={u.title} delay={(i % 4) * 80}>
                <article className="card-premium group relative h-full overflow-hidden p-4">
                  <span className="absolute -top-8 -right-8 size-24 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25" />
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold text-gradient-brand">{u.stat}</p>
                  <h3 className="mt-0.5 text-sm font-semibold">{u.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{u.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Products */}
      <section className="surface-ink py-6 lg:py-8">
        <div className="shell">
          <SectionHead
            tone="ink"
            eyebrow="Product Range"
            title="Everything we make in-house"
            lead="Modular systems and bespoke commissions, produced on our own CNC, edgebanding and press lines."
            action={<BrandButton to="/products" variant="ghost-light">See the full range</BrandButton>}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <article className="hover-zoom group relative h-64 overflow-hidden rounded-2xl border border-white/10">
                  <img src={p.image} alt={p.title} className="size-full object-cover" loading="lazy" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 max-h-0 overflow-hidden text-[0.72rem] leading-relaxed text-white/70 transition-all duration-500 group-hover:max-h-24">
                      {p.desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects preview */}
      <section className="shell py-6 lg:py-8">
        <SectionHead
          eyebrow="Selected Work"
          title="Projects delivered across Pune"
          lead="Corporate headquarters, campuses and workspaces — designed, manufactured and installed by our teams."
          action={<BrandButton to="/projects" variant="outline">View all projects</BrandButton>}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <a href={`/projects?project=${p.slug}`} className="card-premium group block h-full overflow-hidden">
                <div className="hover-zoom relative">
                  <img src={p.images[0]} alt={p.name} className="h-56 w-full object-cover" loading="lazy" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[0.65rem] font-semibold tracking-wide text-white/80 uppercase">
                    {p.type} · {p.year}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold transition-colors group-hover:text-primary">{p.name}</h3>
                  <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                  <p className="mt-3 text-[0.7rem] font-semibold text-primary">{p.client} — {p.location}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Factory capability */}
      <section className="bg-sand py-6 lg:py-8">
        <div className="shell grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHead
              eyebrow="Our Factory"
              title="Machines that make the difference"
              lead="Biesse, Homag, Altendorf, Felder and Technogem lines under one roof — precision, repeatability and control over every deadline."
            />
            <div className="space-y-3">
              {capabilities.map((c, i) => (
                <Reveal key={c.name} delay={i * 70}>
                  <div>
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="font-semibold">{c.name}</span>
                      <span className="font-bold text-primary">{c.pct}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
                      <div className="h-full rounded-full bg-brand-gradient transition-[width] duration-1000" style={{ width: `${c.pct}%` }} />
                    </div>
                    <p className="mt-1 text-[0.68rem] text-muted-foreground">{c.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-5">
              <BrandButton to="/manufacturing" variant="outline">Inside our manufacturing facility</BrandButton>
            </div>
          </div>
          <Reveal delay={120}>
            <BeforeAfter composite={media.transformation} labelBefore="Before" labelAfter="Installed & handed over" />
            <p className="mt-2 text-center text-[0.7rem] text-muted-foreground">Drag to compare factory output with the finished space.</p>
          </Reveal>
        </div>
      </section>

      <section className="surface-ink py-6 lg:py-8">
        <div className="shell">
          <SectionHead tone="ink" eyebrow="Design & Installation Process" title="Six stages, one point of contact" lead="You always know what is happening on your floor plate this week." />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s, i) => (
              <Reveal key={s.n} delay={(i % 3) * 80} className="rounded-2xl border border-white/12 bg-white/5 p-4 transition-colors hover:border-primary/50">
                <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-primary">{s.n}</span>
                <h3 className="mt-1 text-sm font-semibold text-ink-foreground">{s.t}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-foreground/60">{s.d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 flex flex-wrap gap-2">
            {industries.map((i) => (
              <span key={i} className="rounded-full border border-white/15 px-3 py-1.5 text-[0.7rem] font-semibold text-ink-foreground/70">
                {i}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-sand py-6 lg:py-8">
        <div className="shell">
          <SectionHead
            eyebrow="Budget Planner"
            title="Plan your project in a minute"
            lead="Six quick steps to a complete brief for your fit-out, kitchen or furniture package — sent straight to our team on WhatsApp."
          />
          <CostCalculator />
        </div>
      </section>

      {/* Clients */}
      <section className="shell py-6 lg:py-8">
        <SectionHead
          eyebrow="Trusted By"
          title="Companies that specify Payal Decor"
          lead="We're proud to partner with industry leaders and innovative startups alike."
          action={<BrandButton to="/clients" variant="outline">See all clients</BrandButton>}
        />
        <div className="space-y-3">
          <LogoMarquee />
          <LogoMarquee reverse />
        </div>
        <Reveal className="mt-6 flex flex-wrap justify-center gap-2">
          {industries.map((i) => (
            <span key={i} className="rounded-full border border-border bg-card px-3 py-1.5 text-[0.7rem] font-semibold text-muted-foreground">
              {i}
            </span>
          ))}
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="surface-ink py-6 lg:py-8">
        <div className="shell">
          <SectionHead tone="ink" eyebrow="Client Voices" title="What our clients say" lead="Testimonials from the corporates, campuses and studios whose spaces we've delivered." />
          <div className="relative">
            <div id="testimonial-scroll" className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 80} className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
                  <figure className="h-full rounded-2xl border border-white/12 bg-white/5 p-5 backdrop-blur-md transition-colors hover:border-primary/50">
                    <Icons.Quote className="size-5 text-primary" />
                    <blockquote className="mt-3 text-sm leading-relaxed text-ink-foreground/80">{t.quote}</blockquote>
                    <figcaption className="mt-4 border-t border-white/10 pt-3">
                      <p className="text-sm font-semibold text-ink-foreground">{t.name}</p>
                      <p className="text-xs text-ink-foreground/50">{t.role}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('testimonial-scroll');
                if (el) el.scrollBy({ left: -300, behavior: 'smooth' });
              }}
              aria-label="Previous testimonial"
              className="absolute left-2 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-ink-foreground shadow-md backdrop-blur transition-all hover:bg-card hover:text-primary md:flex"
            >
              <Icons.ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('testimonial-scroll');
                if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
              }}
              aria-label="Next testimonial"
              className="absolute right-2 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-ink-foreground shadow-md backdrop-blur transition-all hover:bg-card hover:text-primary md:flex"
            >
              <Icons.ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="shell py-6 lg:py-8">
        <div className="max-w-3xl">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Everything clients ask before award</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Still unsure? Call {company.phone} and speak to the team that will actually run your project.
          </p>
        </div>
        <div className="mt-5 grid items-start gap-4 lg:grid-cols-[1.35fr_1fr]">
          <div className="grid gap-3">
            <div className="divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((f, i) => (
            <details key={f.q} className="group p-4" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold">
                {f.q}
                <Icons.Plus className="size-4 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
            </div>
            <Reveal className="card-premium flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold">Didn't find your answer?</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Send us your drawing or requirement — we reply with scope, budget range and a schedule.
                </p>
              </div>
              <BrandButton to="/contact">Talk to our team</BrandButton>
            </Reveal>
          </div>
          <SupportPanel />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
