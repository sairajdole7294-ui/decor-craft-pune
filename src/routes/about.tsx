import { createFileRoute } from "@tanstack/react-router";
import { media, awards, usps, team, coverage, certifications } from "@/lib/site-data";
import { PageHero, SectionHead, CtaBand, BrandButton } from "@/components/site/bits";
import { Reveal, Counter } from "@/components/site/motion";

const title = "About Payal Decor — Interiors & Manufacturing Since 1992";
const description =
  "Three decades of measured craft in Pune: our story, vision, leadership, milestones and the certifications behind every Payal Decor handover.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        crumbs="About Us"
        title="Three decades of measured craft"
        lead="Since 1992, Payal Decor has been transforming homes and commercial spaces with modern interiors and modular furniture solutions — designed, manufactured and installed by one accountable team."
        image={media.banner}
      >
        <div className="grid max-w-2xl grid-cols-3 gap-3">
          {[
            { v: 30, s: "+", l: "Years" },
            { v: 500, s: "+", l: "Projects" },
            { v: 100, s: "%", l: "In-house" },
          ].map((x) => (
            <div key={x.l} className="rounded-2xl border border-white/15 bg-white/5 p-3 backdrop-blur-md">
              <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                <Counter to={x.v} suffix={x.s} />
              </p>
              <p className="text-[0.68rem] text-white/60">{x.l}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="shell grid gap-6 py-7 lg:grid-cols-[1.2fr_1fr] lg:py-9">
        <div>
          <SectionHead
            eyebrow="Vision & Mission"
            title="Built around commercial reality"
            lead="Unlike general contractors, we focus only on commercial projects — which gives us strong knowledge in business functionality, ergonomics and compliance."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Vision", d: "To become a leading force in commercial decor manufacturing and turnkey interiors, setting the benchmark for excellence and design integrity." },
              { t: "Mission", d: "To deliver high-quality, functional and innovative interior solutions tailored specifically for commercial spaces." },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 90} className="card-premium p-4">
                <h3 className="text-sm font-bold text-primary">{v.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {usps.slice(0, 4).map((u, i) => (
              <Reveal key={u.title} delay={i * 70} className="rounded-2xl border border-border bg-secondary/40 p-4">
                <p className="text-xs font-bold text-primary">{u.stat}</p>
                <h4 className="mt-0.5 text-sm font-semibold">{u.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{u.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={120} className="self-start">
          {team.map((t) => (
            <figure
              key={t.name}
              className="card-premium group relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-12 size-52 rounded-full bg-brand-gradient opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-25"
              />
              <div className="relative w-full overflow-hidden bg-secondary/40">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent"
                />
              </div>
              <figcaption className="relative p-4">
                <p className="text-lg font-semibold">{t.name}</p>
                <p className="text-xs font-semibold text-primary">{t.role}</p>
                <p className="mt-2 text-sm italic text-muted-foreground">
                  “Every material tells a story. Our role is to shape it with intent.”
                </p>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </section>

      <section className="bg-sand py-7 lg:py-9">
        <div className="shell">
          <SectionHead eyebrow="Milestones" title="How the company grew" lead="From a bespoke workshop to a certified manufacturing-led interiors business." />
          <ol className="relative space-y-4 border-l border-border pl-6">
            {awards.map((a, i) => (
              <Reveal key={a.year} delay={i * 80} as="li" className="relative">
                <span className="absolute top-1.5 -left-[1.72rem] size-3 rounded-full bg-brand-gradient ring-4 ring-[var(--sand)]" />
                <div className="card-premium p-4">
                  <p className="font-[family-name:var(--font-display)] text-sm font-bold text-primary">{a.year}</p>
                  <h3 className="mt-0.5 text-sm font-semibold">{a.t}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{a.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell py-7 lg:py-9">
        <SectionHead eyebrow="Standards" title="Certifications & quality" lead="Documented quality control at every stage, with checks before handover and warranty on manufactured units." />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 70} className="card-premium flex flex-col items-center gap-2 p-3 text-center">
              <img src={c.image} alt={c.title} className="h-20 w-auto object-contain" loading="lazy" />
              <p className="text-[0.68rem] font-semibold text-muted-foreground">{c.title}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <h3 className="text-sm font-bold text-primary">Location coverage</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {coverage.map((c) => (
              <span key={c} className="rounded-full border border-border bg-card px-3 py-1.5 text-[0.7rem] font-semibold text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
          <div className="mt-5">
            <BrandButton to="/manufacturing" variant="outline">See our factory</BrandButton>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}