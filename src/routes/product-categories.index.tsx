import { createFileRoute } from "@tanstack/react-router";
import { categoryBrowserItems, seriesFilterOptions, typeFilterOptions } from "@/lib/catalog-data";
import { CatalogBrowser } from "@/components/site/catalog-browser";
import { PageHero, CtaBand } from "@/components/site/bits";

const title = "Product Categories — Commercial Furniture | Payal Decor";
const description =
  "Filter Payal Decor product categories by series and type: office workstations and desking, technical and laboratory furniture, education furniture, and modular kitchens and wardrobes.";

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

      <CatalogBrowser
        items={categoryBrowserItems}
        base="/product-categories/$slug"
        seriesOptions={seriesFilterOptions}
        typeOptions={typeFilterOptions}
        searchPlaceholder="Search categories…"
        noun="categorie"
      />

      <CtaBand />
    </>
  );
}
