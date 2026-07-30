import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { media, services, products, materialLibrary, processSteps, industries } from "@/lib/site-data";
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

      <section className="shell space-y-5 py-10 lg:py-12">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={i * 60}>
            <article
              className={`card-premium grid gap-0 overflow-hidden lg:grid-cols-2 ${i % 2 ? "lg:[&>figure]:order-2" : ""}`}
            >
              <figure className="hover-zoom relative">
                <img src={s.image} alt={s.title} className="h-60 w-full object-cover lg:h-full" loading="lazy" />
                <figcaption className="absolute top-3 left-3 rounded-lg bg-ink/70 px-2.5 py-1 font-[family-name:var(--font-display)] text-xs font-bold text-white backdrop-blur">
                  {s.n}
                </figcaption>
              </figure>
              <div className="p-5 lg:p-7">
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

      <section className="bg-sand py-10 lg:py-12">
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

      <section className="shell py-10 lg:py-12">
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

      <section className="surface-ink py-10 lg:py-12">
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

      <section className="shell py-10 lg:py-12">
        <SectionHead eyebrow="Budget Planner" title="Estimate your project cost" lead="Six quick steps to an indicative range — then talk to a real estimator." />
        <CostCalculator />
      </section>

      <CtaBand />
    </>
  );
}