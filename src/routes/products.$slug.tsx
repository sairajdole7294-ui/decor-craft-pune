import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { productBySlug, categoryBySlug, catalogProducts, collectionName, productCollection, type CatalogProduct } from "@/lib/catalog-data";
import { SectionHead, CtaBand } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";
import { ProductGallery, CatalogDownload } from "@/components/site/product-media";
import { RequestQuoteForm } from "@/components/site/quote-form";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }): { product: CatalogProduct } => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }: { loaderData?: { product: CatalogProduct } }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Payal Decor" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.product.name} — Payal Decor`;
    const d = loaderData.product.desc.slice(0, 155);
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:url", content: `/products/${loaderData.product.slug}` },
      ],
      links: [{ rel: "canonical", href: `/products/${loaderData.product.slug}` }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: CatalogProduct };
  const category = categoryBySlug(product.category);
  const related = catalogProducts.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const rich = product.images.length >= 3;

  return (
    <>
      {/* Hero banner */}
      <section className="relative isolate overflow-hidden">
        <img src={product.images[0]} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/75" />
        <div className="shell relative py-6 lg:py-8">
          <p className="text-[0.62rem] font-bold tracking-[0.16em] text-white/60 uppercase">
            <Link to="/products" className="hover:text-primary">Products</Link>
            {category ? (
              <>
                {" / "}
                <Link to="/product-categories/$slug" params={{ slug: category.slug }} className="hover:text-primary">
                  {category.name}
                </Link>
              </>
            ) : null}
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold text-white lg:text-5xl">{product.name}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/75">{product.tagline}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.62rem] font-bold tracking-[0.12em] text-white/70 uppercase">
            <span className="rounded-full border border-white/25 px-2.5 py-1">{collectionName(productCollection(product.slug))}</span>
            <span className="rounded-full border border-white/25 px-2.5 py-1">{product.variants.length} variants</span>
            <span className="rounded-full border border-white/25 px-2.5 py-1">{product.images.length} catalog views</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="#request-quote"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
            >
              Request Quote <ArrowRight className="size-3.5" />
            </a>
            <CatalogDownload variant="outline" />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="shell grid gap-5 py-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <Reveal>
          <h2 className="text-xl font-semibold lg:text-2xl">Overview</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.desc}</p>
        </Reveal>
        <Reveal delay={80} className="card-premium grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-1">
          {product.specifications.slice(0, 3).map((s) => (
            <div key={s.label} className="rounded-xl bg-secondary/40 p-3">
              <p className="text-[0.6rem] font-bold tracking-[0.12em] text-primary uppercase">{s.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.value}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Large gallery */}
      <section className="bg-sand py-8">
        <div className="shell">
          <SectionHead eyebrow="Gallery" title={`${product.name} in detail`} />
          {rich ? (
            <Reveal>
              <ProductGallery images={product.images} name={product.name} />
            </Reveal>
          ) : (
            <Reveal className="hover-zoom overflow-hidden rounded-3xl border border-border">
              <img src={product.images[0]} alt={product.name} className="aspect-[16/9] w-full object-cover" loading="lazy" />
            </Reveal>
          )}
        </div>
      </section>

      {/* Variants */}
      <section className="shell py-8">
        <SectionHead eyebrow="Product Variants" title="Configurations available" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {product.variants.map((v, i) => (
            <Reveal key={v.name} delay={(i % 4) * 60} className="card-premium p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50">
              <p className="text-sm font-semibold">{v.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{v.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-sand py-8">
        <div className="shell grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHead eyebrow="Features" title="Engineered details" />
            <ul className="grid gap-2">
              {product.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="grid grid-cols-2 gap-2">
            {product.images.slice(1, 5).map((src) => (
              <div key={src} className="hover-zoom overflow-hidden rounded-2xl border border-border">
                <img src={src} alt={product.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Specifications + materials + dimensions */}
      <section className="shell py-8">
        <SectionHead eyebrow="Specifications" title="Technical schedule" />
        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal className="card-premium p-5">
            <h3 className="text-sm font-bold text-primary">Specifications</h3>
            <dl className="mt-3 divide-y divide-border">
              {product.specifications.map((s) => (
                <div key={s.label} className="grid grid-cols-[9rem_1fr] gap-2 py-2">
                  <dt className="text-xs font-semibold">{s.label}</dt>
                  <dd className="text-xs text-muted-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={80} className="card-premium p-5">
            <h3 className="text-sm font-bold text-primary">Materials</h3>
            <ul className="mt-3 space-y-2">
              {product.materials.map((m) => (
                <li key={m} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={140} className="card-premium p-5">
            <h3 className="text-sm font-bold text-primary">Dimensions</h3>
            <dl className="mt-3 divide-y divide-border">
              {product.dimensions.map((d) => (
                <div key={d.label} className="grid grid-cols-[8rem_1fr] gap-2 py-2">
                  <dt className="text-xs font-semibold">{d.label}</dt>
                  <dd className="text-xs text-muted-foreground">{d.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Applications */}
      <section className="bg-sand py-8">
        <div className="shell">
          <SectionHead eyebrow="Applications" title="Where this range is specified" />
          <div className="flex flex-wrap gap-2">
            {product.applications.map((a, i) => (
              <Reveal key={a} delay={(i % 4) * 50}>
                <span className="inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground">
                  {a}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length ? (
        <section className="shell py-8">
          <SectionHead eyebrow="Related Products" title="You may also need" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={(i % 4) * 60}>
                <Link
                  to="/products/$slug"
                  params={{ slug: r.slug }}
                  className="card-premium group flex h-full flex-col overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:border-primary/50"
                >
                  <div className="hover-zoom">
                    <img src={r.images[0]} alt={r.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold">{r.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{r.tagline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* Request quote */}
      <section id="request-quote" className="bg-sand py-8">
        <div className="shell">
          <SectionHead
            eyebrow="Request Quote"
            title={`Enquire about ${product.name}`}
            lead="Share your requirement and our team returns a customised quotation — no pricing is calculated online."
          />
          <div className="grid items-start gap-4 lg:grid-cols-[1.15fr_1fr]">
            <Reveal>
              <RequestQuoteForm productName={product.name} variants={product.variants} materials={product.materials} />
            </Reveal>
            <QuotePanel />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
