import { createFileRoute } from "@tanstack/react-router";
import { media } from "@/lib/site-data";
import { PageHero, CtaBand } from "@/components/site/bits";
import { ProjectsExplorer } from "@/components/site/projects-explorer";
import { useSearch } from "@tanstack/react-router";

const title = "Projects — Commercial Interiors Delivered in Pune | Payal Decor";
const description =
  "Corporate headquarters, campuses, workspaces and modular commissions delivered across Pune. Filter by category, location, year and project type.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});

function Projects() {
  const search = useSearch({ from: "/projects" }) as { project?: string };

  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        crumbs="Projects"
        title="Projects delivered across Pune"
        lead="Designed, manufactured and installed by our teams. Search, filter and open any project for the full detail panel."
        image={media.about1}
      />
      <section className="shell py-6 lg:py-8">
        <ProjectsExplorer initialProjectSlug={search.project} />
      </section>
      <CtaBand title="Your project could be next on this list." />
    </>
  );
}