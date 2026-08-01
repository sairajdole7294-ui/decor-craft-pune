import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Download, ArrowRight, FileText } from "lucide-react";
import {
  media,
  services,
  products,
  materialLibrary,
  processSteps,
  industries,
  productRange,
  industrySolutions,
  catalogueSheets,
  company,
} from "@/lib/site-data";
import { PageHero, SectionHead, CtaBand } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";
import { CostCalculator } from "@/components/site/calculator";

const title = "Services — Turnkey Interiors, Fit-outs & Manufacturing | Payal Decor";
const description =
  "Turnkey interiors, custom manufacturing, office fit-outs and commercial interior design in Pune — four disciplines delivered by one accountable team.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        crumbs="Services"
        title="Services engineered for commercial life"
        lead="Four disciplines, one delivery team — so nothing falls between design, factory and site."
        image={media.about3}
      />

      <section className="shell space-y-5 py-7 lg:py-9">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={i * 60}>
            <article
              className={`card-premium grid gap-0 overflow-hidden lg:grid-cols-2 ${i % 2 ? "lg:[&>figure]:order-2" : ""}`}
            >
              <figure className="hover-zoom relative">
                <img src={s.image} alt={s.title} className="h-60 w-full object-cover lg:h-[20rem]" loading="lazy" />
                <figcaption className="absolute top-3 left-3 rounded-lg bg-ink/70 px-2.5 py-1 font-[family-name:var(--font-display)] text-xs font-bold text-white backdrop-blur">
                  {s.n}
                </figcaption>
              </figure>
              <div className="flex flex-col justify-center p-5 lg:p-7">
                <h2 className="text-xl font-semibold lg:text-2xl">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2 text-xs text-muted-foreground">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section id="product-range" className="bg-sand py-7 lg:py-9">
        <div className="shell">
          <SectionHead eyebrow="Product Range" title="Everything we make in-house" lead="Modular systems and bespoke commissions, produced on our own CNC, edgebanding and press lines." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <article className="card-premium h-full overflow-hidden">
                  <div className="hover-zoom">
                    <img src={p.image} alt={p.title} className="h-44 w-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold">{p.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Product categories & catalogue */}
      <section id="product-categories" className="shell py-7 lg:py-9">
        <SectionHead
          eyebrow="Product Categories"
          title="Our commercial product catalogue"
          lead="Every category below is engineered to your floor plate and manufactured on our own lines — request a quote or download the catalogue for sizes and finishes."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {productRange.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 90}>
              <article className="card-premium group flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <div className="hover-zoom relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="aspect-[16/10] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[0.62rem] font-bold tracking-[0.14em] text-primary uppercase">Features</p>
                      <ul className="mt-2 space-y-1.5">
                        {p.features.map((f) => (
                          <li key={f} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                            <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[0.62rem] font-bold tracking-[0.14em] text-primary uppercase">Applications</p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {p.applications.map((a) => (
                          <li
                            key={a}
                            className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[0.68rem] font-medium text-muted-foreground"
                          >
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 pt-1">
                    <a
                      href={`${company.whatsapp}?text=${encodeURIComponent(`Hello Payal Decor, I would like a quote for: ${p.name}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
                    >
                      Request a Quote
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </a>
                    {p.catalogue ? (
                      <a
                        href={`${company.whatsapp}?text=${encodeURIComponent(`Hello Payal Decor, please send me the catalogue for: ${p.name}.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors duration-300 hover:border-primary hover:text-primary"
                      >
                        <Download className="size-3.5" />
                        Download Catalogue
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Industry solutions */}
      <section id="industry-solutions" className="bg-sand py-7 lg:py-9">
        <div className="shell">
          <SectionHead
            eyebrow="Industry Solutions"
            title="Solutions tuned to your sector"
            lead="The same factory, different rulebooks — each sector gets the finishes, compliance and scheduling it actually needs."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industrySolutions.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 80}>
                <article className="card-premium h-full p-5 transition-all duration-400 hover:-translate-y-1 hover:border-primary/50">
                  <h3 className="text-base font-semibold">{s.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                  <ul className="mt-3 space-y-1.5">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex gap-2 text-xs text-muted-foreground">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section id="product-catalogue" className="shell py-7 lg:py-9">
        <SectionHead
          eyebrow="Product Catalogue"
          title="Request our catalogues"
          lead="Sizes, finishes, hardware and capability details — sent straight to you on WhatsApp or email."
          action={
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              Talk to our team
              <ArrowRight className="size-3.5" />
            </Link>
          }
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {catalogueSheets.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <article className="card-premium flex h-full flex-col p-5 transition-all duration-400 hover:-translate-y-1 hover:border-primary/50">
                <FileText className="size-5 text-primary" />
                <h3 className="mt-3 text-sm font-semibold">{c.title}</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
                <p className="mt-3 text-[0.62rem] font-bold tracking-[0.14em] text-primary uppercase">{c.items}</p>
                <a
                  href={`${company.whatsapp}?text=${encodeURIComponent(`Hello Payal Decor, please share the "${c.title}".`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-xs font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Download className="size-3.5" />
                  Download Catalogue
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell py-7 lg:py-9">
        <SectionHead eyebrow="Material Library" title="What we specify, and why" lead="Every board, laminate and fitting is chosen for commercial wear — not residential catalogue looks." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {materialLibrary.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 70} className="card-premium p-4">
              <h3 className="text-sm font-semibold">{m.name}</h3>
              <p className="mt-1 text-[0.68rem] font-bold tracking-wide text-primary uppercase">{m.use}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{m.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="surface-ink py-7 lg:py-9">
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

      <section className="shell py-7 lg:py-9">
        <SectionHead eyebrow="Project Planner" title="Share your project brief" lead="Six quick steps — send the details on WhatsApp and our team returns a customised quotation." />
        <CostCalculator />
      </section>

      <CtaBand />
    </>
  );
}