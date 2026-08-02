import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { productBySlug, categoryBySlug, catalogProducts } from "@/lib/catalog-data";
import { SectionHead, CtaBand } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";
import { ProductGallery, CatalogDownload } from "@/components/site/product-media";
import { RequestQuoteForm } from "@/components/site/quote-form";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
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
  const { product } = Route.useLoaderData();
  const category = categoryBySlug(product.category);
  const related = catalogProducts.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <>
      {/* Banner */}
      <section className="relative isolate overflow-hidden">
        <img src={product.images[0]} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/75" />
        <div className="shell relative py-10 lg:py-14">
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
          <h1 className="mt-3 max-w-3xl text-3xl font-bold text-white lg:text-5xl">{product.name}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/75">{product.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
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

      {/* Gallery + overview */}
      <section className="shell grid gap-6 py-7 lg:grid-cols-[1.1fr_1fr] lg:py-9">
        <Reveal>
          <ProductGallery images={product.images} name={product.name} />
        </Reveal>
        <div>
          <Reveal>
            <h2 className="text-xl font-semibold lg:text-2xl">Overview</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.desc}</p>
          </Reveal>

          <Reveal delay={80} className="mt-5">
            <h3 className="text-[0.62rem] font-bold tracking-[0.14em] text-primary uppercase">Product variants</h3>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {product.variants.map((v) => (
                <div key={v.name} className="rounded-2xl border border-border bg-secondary/40 p-3">
                  <p className="text-sm font-semibold">{v.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{v.note}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140} className="mt-5">
            <h3 className="text-[0.62rem] font-bold tracking-[0.14em] text-primary uppercase">Features</h3>
            <ul className="mt-2 grid gap-1.5">
              {product.features.map((f) => (
                <li key={f} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="mt-5">
            <h3 className="text-[0.62rem] font-bold tracking-[0.14em] text-primary uppercase">Applications</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {product.applications.map((a) => (
                <li key={a} className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[0.68rem] font-medium text-muted-foreground">
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Specs / materials / dimensions */}
      <section className="bg-sand py-7 lg:py-9">
        <div className="shell grid gap-4 lg:grid-cols-3">
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

      {/* Quote */}
      <section id="request-quote" className="shell grid gap-5 py-7 lg:grid-cols-[1fr_1.1fr] lg:py-9">
        <div>
          <SectionHead
            eyebrow="Request Quote"
            title={`Enquire about ${product.name}`}
            lead="Share your requirement and our team returns a customised quotation — no pricing is calculated online."
          />
          <CatalogDownload />
        </div>
        <Reveal delay={80}>
          <RequestQuoteForm productName={product.name} variants={product.variants} materials={product.materials} />
        </Reveal>
      </section>

      {/* Related */}
      {related.length ? (
        <section className="bg-sand py-7 lg:py-9">
          <div className="shell">
            <SectionHead eyebrow="Related Products" title="You may also need" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={(i % 4) * 70}>
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
          </div>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}