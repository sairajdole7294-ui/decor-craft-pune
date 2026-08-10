import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { media, clientNames, testimonials, certifications, industries } from "@/lib/site-data";
import { PageHero, SectionHead, CtaBand, LogoMarquee } from "@/components/site/bits";
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

      <section className="shell space-y-3 py-6 lg:py-8">
        <LogoMarquee />
        <LogoMarquee reverse />
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
          <SectionHead tone="ink" eyebrow="Client Voices" title="Reviews from delivered spaces" lead="Testimonials from the corporates, campuses and studios whose spaces we've delivered." />
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <figure className="h-full rounded-2xl border border-white/12 bg-white/5 p-5 backdrop-blur-md transition-colors hover:border-primary/50">
                  <Quote className="size-5 text-primary" />
                  <blockquote className="mt-3 text-sm leading-relaxed text-ink-foreground/80">{t.quote}</blockquote>
                  <figcaption className="mt-4 border-t border-white/10 pt-3">
                    <p className="text-sm font-semibold text-ink-foreground">{t.name}</p>
                    <p className="text-xs text-ink-foreground/50">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 grid gap-5 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[0.62rem] font-bold tracking-[0.14em] text-primary uppercase">CLIENT TESTIMONIAL</p>
              <h3 className="mt-1 text-lg font-semibold text-ink-foreground">Hear From Our Clients</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-foreground/70">
                Watch our clients share their experience working with Payal Decor — from commercial fit-outs to modular interiors and manufacturing partnerships.
              </p>
            </div>
            <div className="card-premium overflow-hidden rounded-2xl">
              <video
                className="aspect-video w-full object-cover"
                src="/videos/company-intro.mp4"
                poster={media.about3}
                controls
                preload="metadata"
                playsInline
              />
            </div>
          </Reveal>
          <Reveal className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {certifications.map((c) => (
              <div key={c.title} className="flex flex-col items-center gap-2 rounded-2xl border border-white/12 bg-white/5 p-3 text-center">
                <img src={c.image} alt={c.title} className="h-16 w-auto object-contain" loading="lazy" />
                <p className="text-[0.65rem] font-semibold text-ink-foreground/70">{c.title}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}