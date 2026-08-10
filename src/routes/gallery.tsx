import { createFileRoute } from "@tanstack/react-router";
import { media } from "@/lib/site-data";
import { PageHero, SectionHead, CtaBand } from "@/components/site/bits";
import { GalleryExplorer, BeforeAfter, VideoShowcase } from "@/components/site/gallery-explorer";
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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="space-y-4">
              <p className="text-xs font-bold tracking-[0.14em] text-primary uppercase">Film</p>
              <h3 className="text-3xl font-semibold lg:text-4xl">Our work in motion</h3>
              <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                Get a closer look at our work in motion — from finished interiors and furniture details to the spaces, materials and craftsmanship that bring each project together. This visual showcase gives a more authentic view of the work beyond static project photographs.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground">Project craftsmanship</span>
                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground">Interior detailing</span>
                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground">Finished spaces</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <VideoShowcase src={media.workVideo} poster="/media/gallery-thumbnails/work-video-thumb.jpg" />
          </Reveal>
        </div>
      </section>

      {/* Row 2 — Before & After */}
      <section className="shell py-6 lg:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="space-y-4">
              <p className="text-xs font-bold tracking-[0.14em] text-primary uppercase">Compare</p>
              <h3 className="text-3xl font-semibold lg:text-4xl">Before &amp; after</h3>
              <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                See the transformation from the original space to the completed result. The interactive comparison makes it easy to understand how design, interiors and finishing can completely change the character of a space.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground">Original condition</span>
                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground">Design transformation</span>
                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground">Finished result</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80} className="max-w-2xl">
            <BeforeAfter
              composite={media.transformation}
              labelBefore="Before"
              labelAfter="After handover"
            />
          </Reveal>
        </div>
      </section>

      {/* Row 3 — Production Floor */}
      <section className="shell py-6 lg:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="space-y-4">
              <p className="text-xs font-bold tracking-[0.14em] text-primary uppercase">Factory</p>
              <h3 className="text-3xl font-semibold lg:text-4xl">Inside the production floor</h3>
              <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                Take a closer look at the production environment behind our furniture and interior work. The video offers a visual glimpse into the factory floor, machinery, fabrication and quality-focused execution behind the finished products.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground">Manufacturing</span>
                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground">Production</span>
                <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground">Quality focus</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <VideoShowcase src={media.factoryVideo} poster="/media/gallery-thumbnails/factory-video-thumb.jpg" />
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
