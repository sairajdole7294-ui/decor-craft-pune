import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { media, openRoles, company } from "@/lib/site-data";
import { PageHero, SectionHead, CtaBand, BrandButton } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";

const title = "Careers — Join the Payal Decor Team in Pune";
const description =
  "Open roles across our Katraj studio and factory: CNC operators, interior designers, site supervisors, planners and client relations.";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: Careers,
});

const perks = [
  { t: "One roof, full craft", d: "Design, factory and site sit in the same organisation — you see a project end to end." },
  { t: "Serious machinery", d: "Work with Biesse, Homag, Altendorf, Felder and Technogem lines, not hand tools alone." },
  { t: "Named clients", d: "Corporates, campuses and hospitals across Pune — work that stays standing for decades." },
  { t: "Documented quality", d: "ISO 9001:2015 processes mean your work is measured, not guessed at." },
];

function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        crumbs="Careers"
        title="Build interiors that mean business"
        lead="Join a Pune team that designs, manufactures and installs under one roof — and has been doing it since 1992."
        image={media.workshop}
      >
        <BrandButton href={`mailto:${company.email}?subject=Career%20enquiry`}>Send your CV</BrandButton>
      </PageHero>

      <section className="shell py-7 lg:py-9">
        <SectionHead eyebrow="Why Join" title="What working here actually looks like" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <Reveal key={p.t} delay={(i % 4) * 70} className="card-premium p-4">
              <h3 className="text-sm font-semibold">{p.t}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand py-7 lg:py-9">
        <div className="shell">
          <SectionHead eyebrow="Open Roles" title="Positions we're hiring for" lead="Apply by email with your CV and a note about the work you're proudest of." />
          <div className="space-y-3">
            {openRoles.map((r, i) => (
              <Reveal key={r.title} delay={i * 60}>
                <article className="card-premium flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold">{r.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.desc}</p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.68rem] text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{r.place}</span>
                      <span className="inline-flex items-center gap-1"><Briefcase className="size-3" />{r.exp}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="size-3" />{r.type}</span>
                    </div>
                  </div>
                  <BrandButton href={`mailto:${company.email}?subject=Application: ${encodeURIComponent(r.title)}`} variant="outline" className="shrink-0">
                    Apply
                  </BrandButton>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Don't see your role? Write to us anyway." lead="We hire steadily across design, production and site teams. Send your CV and we'll keep it on file." />
    </>
  );
}