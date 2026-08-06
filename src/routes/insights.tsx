import { createFileRoute } from "@tanstack/react-router";
import { media, posts } from "@/lib/site-data";
import { PageHero, CtaBand, SectionHead } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";

const title = "Insights — Notes on Interiors & Manufacturing | Payal Decor";
const description =
  "Practical writing from the Payal Decor studio and factory floor: materials, manufacturing, execution and delivering commercial interiors on time.";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/insights" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: Insights,
});

function Insights() {
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHero
        eyebrow="Insights"
        crumbs="Insights"
        title="Notes from the studio and the factory floor"
        lead="What we've learned building commercial interiors in Pune for three decades — written for the people who have to sign the drawings."
        image={media.workshop}
      />

      <section className="shell py-6 lg:py-8">
        <Reveal>
          <article className="card-premium grid gap-0 overflow-hidden lg:grid-cols-2">
            <div className="hover-zoom">
              <img src={lead.image} alt={lead.title} className="h-60 w-full object-cover lg:h-full" loading="lazy" />
            </div>
            <div className="p-5 lg:p-8">
              <p className="text-[0.65rem] font-bold tracking-[0.14em] text-primary uppercase">
                Featured · {lead.tag}
              </p>
              <h2 className="mt-2 text-xl font-semibold lg:text-2xl">{lead.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lead.excerpt}</p>
              <p className="mt-4 text-xs text-muted-foreground">{lead.date}</p>
            </div>
          </article>
        </Reveal>

        <SectionHead eyebrow="Latest" title="More from Payal Decor" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80}>
              <article className="card-premium h-full overflow-hidden">
                <div className="hover-zoom">
                  <img src={p.image} alt={p.title} className="h-44 w-full object-cover" loading="lazy" />
                </div>
                <div className="p-4">
                  <p className="text-[0.62rem] font-bold tracking-[0.14em] text-primary uppercase">{p.tag}</p>
                  <h3 className="mt-1.5 text-sm leading-snug font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-3 text-[0.68rem] text-muted-foreground">{p.date}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Have a question this didn't answer?" />
    </>
  );
}