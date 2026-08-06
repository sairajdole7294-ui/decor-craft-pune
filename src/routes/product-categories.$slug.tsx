import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import {
  categoryBySlug,
  productsInCategory,
  catalogCategories,
  type CatalogCategory,
} from "@/lib/catalog-data";
import { SectionHead, CtaBand } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";
import { CatalogDownload } from "@/components/site/product-media";
import { RequestQuoteForm } from "@/components/site/quote-form";

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
  const gallery = items.flatMap((p) => p.images.slice(0, 2)).slice(0, 8);
  const others = catalogCategories.filter((c) => c.slug !== category.slug);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={category.banner} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/75" />
        <div className="shell relative py-6 lg:py-8">
          <p className="text-[0.62rem] font-bold tracking-[0.16em] text-white/60 uppercase">
            <Link to="/product-categories" className="hover:text-primary">Product Categories</Link>
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold text-white lg:text-5xl">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">{category.desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href="#category-quote"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
            >
              Request Quote <ArrowRight className="size-3.5" />
            </a>
            <CatalogDownload variant="outline" />
          </div>
        </div>
      </section>

      <section className="shell grid gap-6 py-6 lg:grid-cols-[1fr_1.3fr] lg:py-8">
        <Reveal>
          <h2 className="text-xl font-semibold lg:text-2xl">Category features</h2>
          <ul className="mt-3 space-y-2">
            {category.features.map((f) => (
              <li key={f} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={90}>
          <h2 className="text-xl font-semibold lg:text-2xl">Gallery</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {gallery.map((src) => (
              <div key={src} className="hover-zoom overflow-hidden rounded-xl border border-border">
                <img src={src} alt={category.name} className="aspect-square w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-sand py-8">
        <div className="shell">
          <SectionHead eyebrow="Product Variants" title="Products in this category" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p, i) => (
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
            ))}
          </div>
        </div>
      </section>

      <section id="category-quote" className="shell grid gap-5 py-6 lg:grid-cols-[1fr_1.1fr] lg:py-8">
        <div>
          <SectionHead
            eyebrow="Request Quote"
            title={`Enquire about ${category.name}`}
            lead="Tell us the scope and our team returns a customised quotation with drawings and finish options."
          />
          <CatalogDownload />
        </div>
        <Reveal delay={80}>
          <RequestQuoteForm
            productName={category.name}
            variants={items.map((p) => ({ name: p.name, note: p.tagline }))}
          />
        </Reveal>
      </section>

      <section className="bg-sand py-8">
        <div className="shell">
          <SectionHead eyebrow="Related" title="Other categories" />
          <div className="grid gap-3 sm:grid-cols-3">
            {others.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 70}>
                <Link
                  to="/product-categories/$slug"
                  params={{ slug: c.slug }}
                  className="card-premium group flex h-full items-center gap-3 p-4 transition-all duration-400 hover:-translate-y-1 hover:border-primary/50"
                >
                  <img src={c.banner} alt="" className="size-14 shrink-0 rounded-xl object-cover" loading="lazy" />
                  <span>
                    <span className="block text-sm font-semibold">{c.name}</span>
                    <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      View <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
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