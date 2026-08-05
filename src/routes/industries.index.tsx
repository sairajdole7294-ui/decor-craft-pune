import { createFileRoute } from "@tanstack/react-router";
import { industryBrowserItems, seriesFilterOptions, typeFilterOptions } from "@/lib/catalog-data";
import { CatalogBrowser } from "@/components/site/catalog-browser";
import { PageHero, CtaBand } from "@/components/site/bits";

const title = "Industry Solutions — Schools, Offices, Labs | Payal Decor";
const description =
  "Furniture and interior solutions tuned to your sector: schools, colleges, offices, hospitals, laboratories and corporate offices — filter by product series and type.";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Industry Solutions"
        crumbs="Industry Solutions"
        title="Solutions tuned to your sector"
        lead="The same factory, different rulebooks — filter by product series and type to see the sectors we furnish."
        image="/media/products/school-bench-3.jpg"
      />

      <CatalogBrowser
        items={industryBrowserItems}
        base="/industries/$slug"
        seriesOptions={seriesFilterOptions}
        typeOptions={typeFilterOptions}
        searchPlaceholder="Search industries…"
        noun="industry solution"
      />

      <CtaBand />
    </>
  );
}
