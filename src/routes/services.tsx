import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import {
  media,
  services,
  products,
  materialLibrary,
  processSteps,
  industries,
} from "@/lib/site-data";
import { PageHero, SectionHead, CtaBand } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";
import { CostCalculator } from "@/components/site/calculator";
import { CatalogDownload } from "@/components/site/product-media";

const hubs = [
  { to: "/products" as const, name: "Product Range", desc: "Thirteen commercial product families with full specifications, variants and dimensions.", image: "/media/products/impact-7.jpg" },
  { to: "/product-categories" as const, name: "Product Categories", desc: "Office desking, technical and lab furniture, education furniture and modular interiors.", image: "/media/products/lab-workstation-2.jpg" },
  { to: "/industries" as const, name: "Industry Solutions", desc: "Schools, colleges, offices, hospitals, laboratories and corporate offices.", image: "/media/products/school-bench-3.jpg" },
  { to: "/catalog" as const, name: "Product Catalog", desc: "Download the official Payal Decor Product Catalog 2026 as a PDF.", image: "/media/products/premia-5.jpg" },
];

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

      {/* Explore hub */}
      <section id="explore" className="shell py-7 lg:py-9">
        <SectionHead
          eyebrow="Explore"
          title="Products, categories, industries & catalog"
          lead="Each area opens its own detailed pages with images, variants, specifications and a request-quote form."
          action={<CatalogDownload variant="outline" />}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {hubs.map((h, i) => (
            <Reveal key={h.name} delay={(i % 4) * 70}>
              <Link
                to={h.to}
                className="card-premium group flex h-full flex-col overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="hover-zoom">
                  <img src={h.image} alt={h.name} className="aspect-[16/10] w-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-semibold">{h.name}</h3>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">{h.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    Explore
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
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