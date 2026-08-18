import { createFileRoute } from "@tanstack/react-router";
import ShopWithAI from "@/components/site/shop-with-ai";

const title = "Shop with AI — Payal Decor";
const description =
  "Describe the furniture or interior solution you need and our AI will match it with Payal Decor products.";

export const Route = createFileRoute("/shop-with-ai")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/shop-with-ai" },
    ],
    links: [{ rel: "canonical", href: "/shop-with-ai" }],
  }),
  component: ShopWithAIPage,
});

function ShopWithAIPage() {
  return (
    <div className="shell py-10 sm:py-14 lg:py-16">
      <ShopWithAI />
    </div>
  );
}
