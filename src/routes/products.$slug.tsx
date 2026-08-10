import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { productBySlug, categoryBySlug, type CatalogProduct } from "@/lib/catalog-data";
import { productById, type ReferenceProduct } from "@/data/productRangeData";
import { company } from "@/lib/site-data";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogDownload } from "@/components/site/product-media";
import { RequestQuoteForm } from "@/components/site/quote-form";
import { Reveal } from "@/components/site/motion";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }): { product: CatalogProduct | ReferenceProduct } => {
    const bySlug = productBySlug(params.slug);
    if (bySlug) return { product: bySlug };
    const byId = productById(params.slug);
    if (byId) return { product: byId };
    throw notFound();
  },
  head: ({ loaderData }: { loaderData?: { product: CatalogProduct | ReferenceProduct } }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Payal Decor" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    const t = `${p.name} — Payal Decor`;
    const d = "desc" in p ? p.desc.slice(0, 155) : p.name;
    const slug = "slug" in p ? p.slug : p.id;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:url", content: `/products/${slug}` },
      ],
      links: [{ rel: "canonical", href: `/products/${slug}` }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: CatalogProduct | ReferenceProduct };
  const isReference = !("images" in product);
  const images = isReference ? [product.image] : product.images;
  const desc = "desc" in product ? product.desc : `${product.name} — ${product.series} — ${product.category}`;
  const categoryName = "slug" in product
    ? categoryBySlug(product.category)?.name ?? product.category
    : product.category;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      {/* Breadcrumb */}
      <div className="shell py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground transition-colors">Product Range</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="shell grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden border border-border">
            <img
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-colors bg-muted ${
                    currentImageIndex === index
                      ? "border-primary"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="lg:pt-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-4">
            {product.name}
          </h1>

          <p className="text-base mb-6">
            <span className="font-semibold text-foreground">Availability : </span>
            <span className="text-green-600 font-medium">in Stock</span>
          </p>

          <p className="text-muted-foreground leading-relaxed text-base mb-8">
            {desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#f26523] hover:bg-[#f26523] text-white px-8 rounded-full text-base"
            >
              <Link to="/contact">Request A Quote</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#f26523] text-[#f26523] hover:bg-[#f26523] hover:text-white px-8 rounded-full text-base"
            >
              <a href="/payal-decor-product-catalog-2026.pdf" target="_blank" rel="noreferrer" download>
                <Download className="w-4 h-4 mr-2" />
                Download Catalogs
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Request Quote Section */}
      <div className="bg-sand py-8">
        <div className="shell">
          <h2 className="text-xl font-semibold lg:text-2xl mb-6">
            Enquire about {product.name}
          </h2>
          <RequestQuoteForm productName={product.name} />
        </div>
      </div>
    </>
  );
}
