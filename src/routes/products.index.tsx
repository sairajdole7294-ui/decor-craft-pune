import { createFileRoute } from "@tanstack/react-router";
import { productBrowserItems, seriesFilterOptions, typeFilterOptions } from "@/lib/catalog-data";
import { CatalogBrowser } from "@/components/site/catalog-browser";
import { PageHero, CtaBand } from "@/components/site/bits";

const title = "Product Range — Office, Lab & Education Furniture | Payal Decor";
const description =
  "Browse the full Payal Decor product range by series and product type: ECO, SPARK, CURVE, IMPRESS, IMPACT, ELEMENT, MAGNA and PREMIA desking, ESD and lab workstations, school benches and modular interiors.";

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
        crumbs="Product Range"
        title="Everything we manufacture, in one range"
        lead="Filter by product series and product type — every family is engineered to your floor plate and produced on our own CNC, edgebanding and press lines."
        image="/media/products/impact-7.jpg"
      />

      <CatalogBrowser
        items={productBrowserItems}
        base="/products/$slug"
        seriesOptions={seriesFilterOptions}
        typeOptions={typeFilterOptions}
        searchPlaceholder="Search the product range…"
        noun="product"
      />

      <CtaBand />
    </>
  );
}
