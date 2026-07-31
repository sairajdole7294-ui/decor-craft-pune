import { createFileRoute } from "@tanstack/react-router";
import { company } from "@/lib/site-data";
import { LegalPage } from "@/components/site/bits";

const title = "Terms & Conditions | Payal Decor";
const description =
  "The terms that govern use of the Payal Decor website, our quotations, project scope, timelines, payments and warranty on manufactured units.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/terms" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage
      crumbs="Terms & Conditions"
      title="Terms & Conditions"
      lead="These terms apply to the use of this website and to enquiries made through it. Project-specific terms are set out in the signed quotation and work order."
      sections={[
        { h: "Website content", p: "Images, drawings, text and project descriptions on this site are the property of Payal Decor and are provided for information only. They may not be reproduced commercially without written permission." },
        { h: "Enquiries and quotations", p: "The project planner on this website collects your requirements only. It does not generate pricing. Every quotation is prepared manually by our team after a site survey and a written scope of work." },
        { h: "Scope and timelines", p: "Project scope, materials, milestones and timelines are governed by the signed quotation. Changes requested after work order release may affect cost and schedule and will be confirmed in writing." },
        { h: "Payments", p: "Payment stages are as recorded in the work order. Manufactured units are released for dispatch against the agreed stage payments." },
        { h: "Warranty", p: "Manufactured units carry the warranty stated in the work order against manufacturing defects under normal commercial use. Damage from misuse, unauthorised modification or water ingress is excluded." },
        { h: "Contact", p: `For any question about these terms, write to ${company.email} or call ${company.phone}.` },
      ]}
    />
  );
}