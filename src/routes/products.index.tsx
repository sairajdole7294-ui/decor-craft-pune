import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { catalogCategories } from "@/lib/catalog-data";
import { ProductCatalogBrowser } from "@/components/site/product-catalog-browser";
import { PageHero, SectionHead, CtaBand } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";
import { CatalogDownload } from "@/components/site/product-media";

const title = "Product Range — Office, Lab & Education Furniture | Payal Decor";
const description =
  "Explore the full Payal Decor product range: ECO, SPARK, CURVE, IMPRESS, IMPACT, ELEMENT, MAGNA and PREMIA desking, ESD and lab workstations, school benches and modular interiors.";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Product Range"
        crumbs="Products"
        title="Everything we manufacture, in one range"
        lead="Thirteen commercial product families from the official Payal Decor catalog — each engineered to your floor plate and produced on our own CNC, edgebanding and press lines."
        image="/media/products/impact-7.jpg"
      />

      <ProductCatalogBrowser />

      <section className="bg-sand py-8">
        <div className="shell">
          <SectionHead eyebrow="Categories" title="Or browse by category" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {catalogCategories.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 4) * 70}>
                <Link
                  to="/product-categories/$slug"
                  params={{ slug: c.slug }}
                  className="card-premium group flex h-full flex-col overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:border-primary/50"
                >
                  <div className="hover-zoom">
                    <img src={c.banner} alt={c.name} className="aspect-[16/10] w-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold">{c.name}</h3>
                    <p className="mt-1 text-[0.68rem] font-bold tracking-[0.12em] text-primary uppercase">
                      {c.products.length} products
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}