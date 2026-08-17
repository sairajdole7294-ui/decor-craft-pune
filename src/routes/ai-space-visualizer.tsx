import { createFileRoute } from "@tanstack/react-router";
import AiVisualizer from "@/components/site/ai-visualizer";

const title = "AI Furniture Suggestions — Payal Decor";
const description =
  "Upload a photo of your space and get AI-powered furniture suggestions matched with Payal Decor products.";

export const Route = createFileRoute("/ai-space-visualizer")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/ai-space-visualizer" },
    ],
    links: [{ rel: "canonical", href: "/ai-space-visualizer" }],
  }),
  component: AiVisualizerPage,
});

function AiVisualizerPage() {
  return (
    <>
      <section className="shell bg-background py-6 sm:py-8 lg:py-10">
        <AiVisualizer />
      </section>
    </>
  );
}
