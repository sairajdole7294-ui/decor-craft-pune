import { createFileRoute } from "@tanstack/react-router";
import { media } from "@/lib/site-data";
import { PageHero, SectionHead, CtaBand } from "@/components/site/bits";
import { GalleryExplorer, VideoShowcase } from "@/components/site/gallery-explorer";
import { Reveal } from "@/components/site/motion";

const title = "Gallery — Interiors, Furniture & Factory | Payal Decor";
const description =
  "A filterable gallery of Payal Decor interiors, modular furniture, factory machinery and finished handovers across Pune.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Visual Archive"
        crumbs="Gallery"
        title="See the work, not the render"
        lead="Photographs from delivered projects, our production floor and finished handovers — filter by category and open any image full screen."
        image={media.vb}
      />

      {/* Row 1 — Our Work */}
      <section className="shell py-6 lg:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <div className="space-y-4">
              <SectionHead
                eyebrow="Film"
                title="Our work in motion"
                lead="See Payal Decor's completed interiors and modular furniture in motion — from design execution and craftsmanship to finished spaces ready for handover."
              />
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground">Project craftsmanship</span>
                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground">Interior detailing</span>
                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground">Finished spaces</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <VideoShowcase src={media.workVideo} />
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-6 lg:py-8">
        <div className="shell">
          <SectionHead eyebrow="Photography" title="Browse the full archive" lead="Lazy-loaded, categorised and keyboard navigable." />
          <GalleryExplorer />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
