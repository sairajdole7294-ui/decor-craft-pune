import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  categoryBySlug,
  productsInCategory,
  catalogCategories,
  type CatalogCategory,
} from "@/lib/catalog-data";
import { SectionHead } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";
import { CatalogDownload } from "@/components/site/product-media";

export const Route = createFileRoute("/product-categories/$slug")({
  loader: ({ params }): { category: CatalogCategory } => {
    const category = categoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }: { loaderData?: { category: CatalogCategory } }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — Payal Decor" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.category.name} — Payal Decor`;
    const d = loaderData.category.desc.slice(0, 155);
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:url", content: `/product-categories/${loaderData.category.slug}` },
      ],
      links: [{ rel: "canonical", href: `/product-categories/${loaderData.category.slug}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData() as { category: CatalogCategory };
  const items = productsInCategory(category.slug);

  return (
    <>
      <section className="shell py-6 lg:py-8">
        <Link to="/product-categories" className="text-sm text-primary hover:underline mb-4 inline-block">
          ← Back to Product Categories
        </Link>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          {category.name}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-6">
          {category.desc}
        </p>
        <CatalogDownload />
      </section>

      <section className="bg-sand py-8">
        <div className="shell">
          <SectionHead eyebrow="Products" title={`${category.name} Collection`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.tagline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
