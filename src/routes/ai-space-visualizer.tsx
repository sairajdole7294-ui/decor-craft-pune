import { createFileRoute } from "@tanstack/react-router";
import AiVisualizer from "@/components/site/ai-visualizer";

const title = "AI Space Visualizer — Payal Decor";
const description =
  "Upload a photo of your space and describe your requirements to generate an AI-powered furniture visualization.";

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
