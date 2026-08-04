import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";
import { catalogCategories, catalogProducts, catalogTitle } from "@/lib/catalog-data";
import { PageHero, SectionHead, CtaBand } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";
import { CatalogDownload } from "@/components/site/product-media";

const title = "Product Catalog 2026 — Download | Payal Decor";
const description =
  "Download the official Payal Decor Product Catalog 2026: modular office desking series, ESD and lab workstations, school benches, modular kitchens and wardrobes.";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/catalog" },
    ],
    links: [{ rel: "canonical", href: "/catalog" }],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  return (
    <>
      <PageHero
        eyebrow="Product Catalog"
        crumbs="Catalog"
        title={catalogTitle}
        lead="The complete official catalog — company profile, all product series, technical furniture, education furniture and contact details."
        image="/media/products/premia-5.jpg"
      />

      <section className="shell grid gap-5 py-7 lg:grid-cols-[1fr_1.2fr] lg:py-9">
        <Reveal className="card-premium flex flex-col justify-center p-6">
          <FileText className="size-6 text-primary" />
          <h2 className="mt-3 text-xl font-semibold">{catalogTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            ISO 9001:2015 certified manufacturing, eight office desking series, ESD and laboratory workstations, school
            benches and modular interiors — with materials, finishes and applications for each range.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <CatalogDownload label="Download Full Catalog (PDF)" />
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              Browse online <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={90} className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {["/media/products/impact-2.jpg", "/media/products/premia-3.jpg", "/media/products/esd-workstation-4.jpg", "/media/products/lab-workstation-6.jpg", "/media/products/school-bench-1.jpg", "/media/products/spark-2.jpg"].map((src) => (
            <div key={src} className="hover-zoom overflow-hidden rounded-xl border border-border">
              <img src={src} alt="Payal Decor catalog product" className="aspect-square w-full object-cover" loading="lazy" />
            </div>
          ))}
        </Reveal>
      </section>

      <section className="bg-sand py-8">
        <div className="shell">
          <SectionHead eyebrow="Inside the catalog" title="Sections & product families" />
          <div className="grid gap-3 sm:grid-cols-2">
            {catalogCategories.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 2) * 80} className="card-premium p-5">
                <h3 className="text-base font-semibold">{c.name}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {c.products.map((slug) => {
                    const p = catalogProducts.find((x) => x.slug === slug);
                    return p ? (
                      <li key={slug}>
                        <Link
                          to="/products/$slug"
                          params={{ slug }}
                          className="inline-block rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[0.68rem] font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          {p.name}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}