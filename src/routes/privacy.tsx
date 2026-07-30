import { createFileRoute } from "@tanstack/react-router";
import { company } from "@/lib/site-data";
import { LegalPage } from "@/components/site/bits";

const title = "Privacy Policy | Payal Decor";
const description =
  "How Payal Decor collects, uses and protects the information you share through our website, enquiry forms and project conversations.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/privacy" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage
      crumbs="Privacy Policy"
      title="Privacy Policy"
      lead="This page is maintained by Payal Decor to explain what we do with the information you share with us."
      sections={[
        { h: "Information we collect", p: "When you submit an enquiry, cost estimate or career application, we collect the name, phone number, email address and project details you choose to provide. We do not ask for financial or identity documents through this website." },
        { h: "How we use it", p: "We use your details only to respond to your enquiry, prepare estimates, schedule site visits and maintain project records. We do not sell or rent your information to third parties." },
        { h: "Sharing", p: "Details may be shared internally with our design, estimation and production teams, and where necessary with vendors engaged on your specific project. Any sharing is limited to what the work requires." },
        { h: "Retention", p: "Enquiry and project records are retained for as long as needed to service the relationship and to meet statutory record-keeping obligations. You can ask us to delete records that we are not required to retain." },
        { h: "Cookies and analytics", p: "This website may use basic cookies and analytics to understand page performance. These do not identify you personally and can be blocked in your browser without affecting the site." },
        { h: "Your requests", p: `To access, correct or delete the information we hold about you, write to ${company.email} or call ${company.phoneDisplay}. We aim to respond within seven working days.` },
      ]}
    />
  );
}