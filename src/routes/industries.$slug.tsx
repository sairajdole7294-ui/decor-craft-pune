import { createFileRoute, Link, notFound, Outlet, useMatch } from "@tanstack/react-router";
import { solutionsData, type SolutionData } from "@/data/industrySolutionsData";
import { SectionHead } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";
import IndustrySolutionCard from "@/components/site/industry-solution-card";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }): { slug: string; solution: SolutionData } => {
    const solution = solutionsData[params.slug as keyof typeof solutionsData];
    if (!solution) throw notFound();
    return { slug: params.slug, solution };
  },
  head: ({ loaderData }: { loaderData?: { slug: string; solution: SolutionData } }) => {
    if (!loaderData) {
      return { meta: [{ title: "Industry not found — Payal Decor" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.solution.title} — Payal Decor`;
    const d = loaderData.solution.collectionName;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:url", content: `/industries/${loaderData.slug}` },
      ],
      links: [{ rel: "canonical", href: `/industries/${loaderData.slug}` }],
    };
  },
  component: IndustryDetail,
});

function IndustryDetail() {
  const { solution, slug } = Route.useLoaderData() as { slug: string; solution: SolutionData };
  const isProductDetail = useMatch({ from: '/industries/$slug/$product', shouldThrow: false });

  if (isProductDetail) {
    return <Outlet />;
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="shell py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to="/industries"
            className="hover:text-foreground transition-colors"
          >
            Industry Solutions
          </Link>
          <span>/</span>
          <span className="text-foreground">{solution.title}</span>
        </nav>
      </div>

      {/* Industry Hero */}
      <section className="shell py-6 lg:py-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          {solution.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {solution.collectionName}
        </p>
      </section>

      {/* Products for this industry */}
      <section className="bg-sand py-8">
        <div className="shell">
          <SectionHead eyebrow="Products" title={`${solution.title} Collection`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.products.map((product, i) => (
              <Reveal key={i} delay={i * 70}>
                <IndustrySolutionCard
                  name={product.name}
                  slug={product.slug}
                  industrySlug={slug}
                  image={product.image}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Outlet />
    </>
  );
}
