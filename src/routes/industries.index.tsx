import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { allSolutions, solutionsData } from "@/data/industrySolutionsData";
import ProductRangeCard from "@/components/site/product-range-card";
import { PageHero, SectionHead } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";

const title = "Industry Solutions — Hospitality, Corporate, Residential, Retail | Payal Decor";
const description =
  "Furniture and interior solutions tuned to your sector: hospitality, corporate offices, residential projects and retail spaces.";

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
  const solutions = allSolutions.map((s) => ({
    key: s.key,
    title: s.title,
    collectionName: s.collectionName,
    image: s.products[0]?.image ?? "",
    overview: s.collectionName,
  }));

  return (
    <>
      <PageHero
        eyebrow="Industry Solutions"
        crumbs="Industry Solutions"
        title="Industry Solutions"
        lead="Tailored furniture solutions for every industry. We understand unique requirements and deliver excellence."
        image="/media/industries/corporate-reception.jpg"
      />

      <section className="shell py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {solutions.map((sol, i) => (
            <Reveal key={sol.key} delay={i * 80}>
              <Link
                to={`/industries/${sol.key}` as any}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={sol.image}
                    alt={sol.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                    {sol.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{sol.collectionName}</p>
                  <div className="mt-3 flex items-center text-primary font-medium text-sm">
                    View Solutions <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
