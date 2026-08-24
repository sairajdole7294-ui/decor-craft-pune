import { createFileRoute } from "@tanstack/react-router";
import { media, machines, capabilities, factorySteps } from "@/lib/site-data";
import { PageHero, SectionHead, CtaBand } from "@/components/site/bits";
import { Reveal, CapabilityBars } from "@/components/site/motion";
import { VideoShowcase } from "@/components/site/gallery-explorer";

const title = "Manufacturing — In-House Factory in Pune | Payal Decor";
const description =
  "Biesse, Homag, Altendorf, Felder and Technogem lines under one roof. See the machines, capabilities and seven-stage process behind every Payal Decor unit.";

export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/manufacturing" },
    ],
    links: [{ rel: "canonical", href: "/manufacturing" }],
  }),
  component: Manufacturing,
});

function Manufacturing() {
  return (
    <>
      <PageHero
        eyebrow="Our Factory"
        crumbs="Manufacturing"
        title="Machines that make the difference"
        lead="Precision, repeatability and control over every deadline — because the factory and the site team report to the same programme."
        image={media.workshop}
      />

      <section className="shell py-6 lg:py-8">
        <SectionHead eyebrow="Machinery" title="Interactive machine floor" lead="Hover any machine to see what it adds to your project." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {machines.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 80}>
              <article className="card-premium group h-full overflow-hidden">
                <div className="hover-zoom relative">
                  <img src={m.image} alt={m.name} className="h-40 w-full object-cover" loading="lazy" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-70 transition-opacity group-hover:opacity-95" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold">{m.name}</h3>
                  <p className="mt-1 text-[0.68rem] font-bold tracking-wide text-primary uppercase">{m.spec}</p>
                  <p className="mt-2 max-h-0 overflow-hidden text-xs leading-relaxed text-muted-foreground transition-all duration-500 group-hover:max-h-32">
                    {m.benefit}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand py-6 lg:py-8">
        <div className="shell grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHead eyebrow="Capability" title="What the floor can absorb" lead="Capacity utilisation across the disciplines we run in-house." />
            <CapabilityBars items={capabilities} />
          </div>
          <Reveal delay={120}>
            <VideoShowcase src={media.factoryVideo} />
            <p className="mt-2 text-center text-[0.7rem] text-muted-foreground">Inside the Payal Decor production facility.</p>
          </Reveal>
        </div>
      </section>

      <section className="surface-ink py-6 lg:py-8">
        <div className="shell">
          <SectionHead tone="ink" eyebrow="Manufacturing Process" title="Raw material to installation" lead="Seven documented stages, every one of them under our own roof and our own supervision." />
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {factorySteps.map((s, i) => (
              <Reveal key={s.t} delay={(i % 4) * 80} as="li">
                <div className="h-full rounded-2xl border border-white/12 bg-white/5 p-4 transition-all duration-400 hover:-translate-y-1 hover:border-primary/60">
                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand-gradient font-[family-name:var(--font-display)] text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <h3 className="mt-2.5 text-sm font-semibold text-ink-foreground">{s.t}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-foreground/60">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Bring us your drawings — we'll cost the factory work." />
    </>
  );
}