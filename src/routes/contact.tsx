import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { media, company } from "@/lib/site-data";
import { PageHero, SectionHead } from "@/components/site/bits";
import { Reveal } from "@/components/site/motion";
import { ContactForm } from "@/components/site/calculator";

const title = "Contact Payal Decor — Interiors & Manufacturing, Pune";
const description =
  "Talk to the Payal Decor team in Katraj, Pune. Share your drawings, book a factory visit or request a customised quotation for your commercial interior project.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: Phone, label: "Phone", value: company.phone, href: `tel:${company.phone}` },
    { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: "Studio & Factory", value: company.address },
    { icon: Clock, label: "Working hours", value: "Mon – Sat, 9:30 am – 7:00 pm" },
  ];
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        crumbs="Contact Us"
        title="Let's plan your space"
        lead="Share a floor plate, a brief or just a deadline. We'll come back with a realistic scope, a clear scope and a schedule."
        image={media.about1}
      />

      <section className="shell grid gap-8 py-10 lg:grid-cols-[1fr_1.1fr] lg:py-12">
        <div>
          <SectionHead eyebrow="Reach Us" title="Direct lines to the team" />
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((it, i) => (
              <Reveal key={it.label} delay={i * 70} className="card-premium p-4">
                <it.icon className="size-4 text-primary" />
                <p className="mt-2 text-[0.65rem] font-bold tracking-[0.14em] text-muted-foreground uppercase">{it.label}</p>
                {it.href ? (
                  <a href={it.href} className="mt-1 block text-sm font-semibold hover:text-primary">
                    {it.value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm leading-relaxed font-medium">{it.value}</p>
                )}
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="card-premium mt-4 overflow-hidden">
            <iframe
              title="Payal Decor location map"
              src="https://www.google.com/maps?q=Katraj%20Pune&output=embed"
              className="h-72 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}