import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { catalogCategories } from "@/lib/catalog-data";
import { PageHero, SectionHead, CtaBand } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";
import { CatalogDownload } from "@/components/site/product-media";

const title = "Product Categories — Commercial Furniture | Payal Decor";
const description =
  "Four Payal Decor product categories: office workstations and desking, technical and laboratory furniture, education furniture, and modular kitchens and wardrobes.";

export const Route = createFileRoute("/product-categories/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/product-categories" },
    ],
    links: [{ rel: "canonical", href: "/product-categories" }],
  }),
  component: CategoriesIndex,
});

function CategoriesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Product Categories"
        crumbs="Product Categories"
        title="Categories built around how you work"
        lead="Each category groups the product families that share a construction standard, a compliance rulebook and a finish schedule."
        image="/media/products/lab-workstation-2.jpg"
      />

      <section className="shell py-7 lg:py-9">
        <SectionHead eyebrow="Browse" title="All categories" action={<CatalogDownload variant="outline" />} />
        <div className="grid gap-4 md:grid-cols-2">
          {catalogCategories.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 80}>
              <Link
                to="/product-categories/$slug"
                params={{ slug: c.slug }}
                className="card-premium group flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="hover-zoom">
                  <img src={c.banner} alt={c.name} className="aspect-[16/9] w-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-lg font-semibold">{c.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    View category · {c.products.length} products
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