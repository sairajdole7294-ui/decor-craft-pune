import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { industryPages } from "@/lib/catalog-data";
import { PageHero, SectionHead, CtaBand } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";
import { CatalogDownload } from "@/components/site/product-media";

const title = "Industry Solutions — Schools, Offices, Labs | Payal Decor";
const description =
  "Furniture and interior solutions tuned to your sector: schools, colleges, offices, hospitals, laboratories and corporate offices — from the Payal Decor product catalog.";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Industry Solutions"
        crumbs="Industries"
        title="Solutions tuned to your sector"
        lead="The same factory, different rulebooks — each sector gets the finishes, compliance and scheduling it actually needs."
        image="/media/products/school-bench-3.jpg"
      />

      <section className="shell py-8">
        <SectionHead eyebrow="Sectors" title="Choose your industry" action={<CatalogDownload variant="outline" />} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industryPages.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 70}>
              <Link
                to="/industries/$slug"
                params={{ slug: s.slug }}
                className="card-premium group flex h-full flex-col overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="hover-zoom">
                  <img src={s.gallery[0]} alt={s.name} className="aspect-[16/10] w-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h2 className="text-base font-semibold">{s.name}</h2>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">{s.overview.slice(0, 130)}…</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    View solution
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}