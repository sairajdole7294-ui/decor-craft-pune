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

      <section className="shell grid gap-6 py-7 lg:grid-cols-2 lg:py-9">
        <Reveal>
          <SectionHead eyebrow="Film" title="Our work in motion" lead="A short cut from the studio, the factory and the site." />
          <VideoShowcase />
        </Reveal>
        <Reveal delay={120}>
          <SectionHead eyebrow="Compare" title="Before & after" lead="Drag the handle to see how a bare space is transformed." />
          <BeforeAfter before={media.workshop} after={media.about1} />
        </Reveal>
      </section>

      <section className="bg-sand py-7 lg:py-9">
        <div className="shell">
          <SectionHead eyebrow="Photography" title="Browse the full archive" lead="Lazy-loaded, categorised and keyboard navigable." />
          <GalleryExplorer />
        </div>
      </section>

      <CtaBand />
    </>
  );
}