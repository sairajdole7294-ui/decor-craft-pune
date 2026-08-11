import { createFileRoute } from "@tanstack/react-router";
import { media, clientNames, industries } from "@/lib/site-data";
import { PageHero, SectionHead, CtaBand, ClientLogoGrid, Eyebrow } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";

const title = "Clients — Corporates & Campuses We Serve | Payal Decor";
const description =
  "KPIT, MAHLE, Kirloskar Pneumatic, EKA Mobility, Vishwakarma University and more — the organisations that specify Payal Decor in Pune.";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/clients" },
    ],
    links: [{ rel: "canonical", href: "/clients" }],
  }),
  component: Clients,
});

function Clients() {
  return (
    <>
      <PageHero
        eyebrow="Trusted By"
        crumbs="Clients"
        title="Companies that specify Payal Decor"
        lead="We're proud to partner with industry leaders and innovative startups alike — corporates, campuses, hospitals and studios across Pune."
        image={media.about3}
      />

      <section className="shell py-6 lg:py-8">
        <ClientLogoGrid />
      </section>

      <section className="bg-sand py-6 lg:py-8">
        <div className="shell">
          <SectionHead eyebrow="Client List" title="A few names on the roster" lead="Across automotive, engineering, education, healthcare and hospitality." />
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {clientNames.map((n, i) => (
              <Reveal key={n} delay={(i % 4) * 60} className="card-premium px-3 py-3 text-center text-xs font-semibold">
                {n}
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 flex flex-wrap justify-center gap-2">
            {industries.map((i) => (
              <span key={i} className="rounded-full border border-border bg-card px-3 py-1.5 text-[0.7rem] font-semibold text-muted-foreground">
                {i}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="surface-ink py-6 lg:py-8">
        <div className="shell">
          <Reveal className="grid gap-5 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>OUR CLIENT STORIES</Eyebrow>
              <h2 className="mt-2 text-2xl leading-[1.12] font-semibold sm:text-3xl lg:text-[2.6rem] text-ink-foreground">Client Testimonials</h2>
              <p className="mt-3 text-sm leading-relaxed sm:text-[0.95rem] text-ink-foreground/70">
                Hear directly from our clients about their experience with Payal Decor — from commercial interiors and modular solutions to furniture manufacturing and complete project execution. Their feedback reflects our focus on quality, precision, timely delivery and professional service.
              </p>
            </div>
            <div className="card-premium overflow-hidden rounded-2xl">
              <video
                className="aspect-video w-full object-cover"
                src="/videos/company-intro.mp4"
                controls
                preload="metadata"
                playsInline
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}