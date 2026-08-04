import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { industryBySlug, productBySlug, industrySections, type IndustryPage } from "@/lib/catalog-data";
import { projects } from "@/lib/site-data";
import { SectionHead, CtaBand } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";
import { CatalogDownload } from "@/components/site/product-media";
import { RequestQuoteForm } from "@/components/site/quote-form";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }): { industry: IndustryPage } => {
    const industry = industryBySlug(params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }: { loaderData?: { industry: IndustryPage } }) => {
    if (!loaderData) {
      return { meta: [{ title: "Industry not found — Payal Decor" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.industry.name} Furniture Solutions — Payal Decor`;
    const d = loaderData.industry.overview.slice(0, 155);
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:url", content: `/industries/${loaderData.industry.slug}` },
      ],
      links: [{ rel: "canonical", href: `/industries/${loaderData.industry.slug}` }],
    };
  },
  component: IndustryDetail,
});

function IndustryDetail() {
  const { industry } = Route.useLoaderData() as { industry: IndustryPage };
  const recommended = industry.products.map(productBySlug).filter(Boolean);
  const related = projects.filter((p) => industry.projects.includes(p.slug));
  const sections = industrySections[industry.slug] ?? [];

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={industry.gallery[0]} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/75" />
        <div className="shell relative py-9 lg:py-12">
          <p className="text-[0.62rem] font-bold tracking-[0.16em] text-white/60 uppercase">
            <Link to="/industries" className="hover:text-primary">Industry Solutions</Link>
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold text-white lg:text-5xl">{industry.name}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">{industry.overview}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <CatalogDownload />
          </div>
        </div>
      </section>

      <section className="shell grid gap-6 py-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <h2 className="text-xl font-semibold lg:text-2xl">Industry overview</h2>
          <ul className="mt-3 space-y-2">
            {industry.points.map((p) => (
              <li key={p} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={90} className="hover-zoom overflow-hidden rounded-3xl border border-border">
          <img src={industry.gallery[industry.gallery.length - 1] ?? industry.gallery[0]} alt={industry.name} className="aspect-[16/10] w-full object-cover lg:max-h-[20rem]" loading="lazy" />
        </Reveal>
      </section>

      {sections.map((sec, si) => (
        <section key={sec.title} className={si % 2 === 0 ? "bg-sand py-8" : "py-8"}>
          <div className={`shell grid gap-5 lg:items-center ${si % 2 === 0 ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]"}`}>
            <Reveal className={si % 2 === 0 ? "" : "lg:order-2"}>
              <h2 className="text-xl font-semibold lg:text-2xl">{sec.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sec.body}</p>
            </Reveal>
            <Reveal
              delay={80}
              className={`grid gap-2 ${sec.images.length > 1 ? "grid-cols-2" : "grid-cols-1"} ${si % 2 === 0 ? "" : "lg:order-1"}`}
            >
              {sec.images.map((src) => (
                <div key={src} className="hover-zoom overflow-hidden rounded-2xl border border-border">
                  <img
                    src={src}
                    alt={`${industry.name} — ${sec.title}`}
                    className={`w-full object-cover ${sec.images.length > 1 ? "aspect-[4/3]" : "aspect-[16/9] lg:max-h-[20rem]"}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      ))}

      <section className={sections.length % 2 === 0 ? "bg-sand py-8" : "py-8"}>
        <div className="shell">
          <SectionHead eyebrow="Recommended" title="Recommended products" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {recommended.map((p, i) =>
              p ? (
                <Reveal key={p.slug} delay={(i % 4) * 70}>
                  <Link
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="card-premium group flex h-full flex-col overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:border-primary/50"
                  >
                    <div className="hover-zoom">
                      <img src={p.images[0]} alt={p.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold">{p.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{p.tagline}</p>
                    </div>
                  </Link>
                </Reveal>
              ) : null,
            )}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="shell py-8">
          <SectionHead eyebrow="Related Projects" title="Delivered in this sector" />
          <div className="grid gap-3 sm:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 70} className="card-premium overflow-hidden">
                <div className="hover-zoom">
                  <img src={p.images[0]} alt={p.name} className="aspect-[16/10] w-full object-cover lg:max-h-[20rem]" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.type} · {p.area}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
              See all projects <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </section>
      ) : null}

      <section className="shell grid gap-5 py-7 lg:grid-cols-[1fr_1.1fr] lg:py-9">
        <div>
          <SectionHead
            eyebrow="Request Quote"
            title={`Planning a ${industry.name.toLowerCase()} project?`}
            lead="Share the scope and our team returns a customised quotation — no pricing is calculated online."
          />
          <CatalogDownload />
        </div>
        <Reveal delay={80}>
          <RequestQuoteForm
            productName={`${industry.name} — Industry Solution`}
            variants={recommended.filter(Boolean).map((p) => ({ name: p!.name, note: p!.tagline }))}
          />
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}