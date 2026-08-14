import { useMemo, useEffect, useState } from "react";
import { Grid2X2, List, MapPin, Ruler, CalendarDays, ArrowUpRight } from "lucide-react";
import { projects, projectCategories, type Project } from "@/lib/site-data";
import { Reveal } from "./motion";
import { Lightbox } from "./lightbox";
import { cn } from "@/lib/utils";

const locations = ["All locations", ...Array.from(new Set(projects.map((p) => p.location)))];
const years = ["All years", ...Array.from(new Set(projects.map((p) => String(p.year)))).sort().reverse()];
const types = ["All types", ...Array.from(new Set(projects.map((p) => p.type)))];

function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="text-[0.62rem] font-bold tracking-[0.14em] text-muted-foreground uppercase">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full truncate rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ProjectsExplorer({ initialProjectSlug }: { initialProjectSlug?: string }) {
  const [cat, setCat] = useState("All");
  const [loc, setLoc] = useState(locations[0]);
  const [year, setYear] = useState(years[0]);
  const [type, setType] = useState(types[0]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [active, setActive] = useState<Project | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!initialProjectSlug) return;
    const match = projects.find((p) => p.slug === initialProjectSlug);
    if (match) {
      setActive(match);
      setImgIndex(0);
    }
  }, [initialProjectSlug]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (loc !== locations[0] && p.location !== loc) return false;
      if (year !== years[0] && String(p.year) !== year) return false;
      if (type !== types[0] && p.type !== type) return false;
      return true;
    });
  }, [cat, loc, year, type]);

  const related = active ? projects.filter((p) => p.slug !== active.slug && p.category === active.category).slice(0, 3) : [];

  const open = (p: Project) => {
    setActive(p);
    setImgIndex(0);
  };

  return (
    <div>
      <Reveal className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:items-end">
          <Select label="Location" value={loc} onChange={setLoc} options={locations} />
          <Select label="Year" value={year} onChange={setYear} options={years} />
          <Select label="Project type" value={type} onChange={setType} options={types} />
        </div>
        <div className="mt-4 flex items-center justify-end">
          <div className="flex items-center gap-1 rounded-lg border border-border p-1">
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
              className={cn("rounded-md p-2 transition-colors", view === "grid" ? "bg-brand-gradient text-primary-foreground" : "text-muted-foreground")}
            >
              <Grid2X2 className="size-4" />
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
              className={cn("rounded-md p-2 transition-colors", view === "list" ? "bg-brand-gradient text-primary-foreground" : "text-muted-foreground")}
            >
              <List className="size-4" />
            </button>
          </div>
        </div>

        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
          {projectCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300",
                cat === c
                  ? "border-transparent bg-brand-gradient text-primary-foreground shadow-[var(--shadow-card)]"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </Reveal>

      <p className="mt-4 text-xs text-muted-foreground">
        Showing <strong className="text-foreground">{filtered.length}</strong> of {projects.length} projects
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-sm font-semibold">No projects match those filters.</p>
          <p className="mt-1 text-xs text-muted-foreground">Try picking another category.</p>
        </div>
      ) : view === "grid" ? (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 90}>
              <button
                type="button"
                onClick={() => open(p)}
                className="group card-premium block w-full overflow-hidden text-left"
              >
                <div className="hover-zoom relative">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    loading="lazy"
                    className="h-64 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                  <span className="absolute top-3 left-3 rounded-full bg-white/15 px-2.5 py-1 text-[0.62rem] font-bold tracking-wide text-white uppercase backdrop-blur-md">
                    {p.category}
                  </span>
                  <span className="absolute top-3 right-3 inline-flex size-8 translate-y-1 items-center justify-center rounded-full bg-brand-gradient text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[0.65rem] font-semibold tracking-wide text-white/70 uppercase">
                      {p.type} · {p.year}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-white">{p.name}</h3>
                    <p className="mt-0.5 text-xs text-white/70">{p.client}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3 text-[0.7rem] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{p.location}</span>
                  <span className="inline-flex items-center gap-1"><Ruler className="size-3" />{p.area}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <button
                type="button"
                onClick={() => open(p)}
                className="group card-premium grid w-full gap-4 overflow-hidden p-3 text-left sm:grid-cols-[14rem_1fr]"
              >
                <div className="hover-zoom overflow-hidden rounded-xl">
                  <img src={p.images[0]} alt={p.name} loading="lazy" className="h-40 w-full object-cover sm:h-full" />
                </div>
                <div className="pr-2 pb-1">
                  <div className="flex flex-wrap items-center gap-2 text-[0.62rem] font-bold tracking-wide text-primary uppercase">
                    <span>{p.category}</span>
                    <span className="text-border">/</span>
                    <span className="text-muted-foreground">{p.type}</span>
                  </div>
                  <h3 className="mt-1 text-lg font-semibold transition-colors group-hover:text-primary">{p.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.7rem] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{p.location}</span>
                    <span className="inline-flex items-center gap-1"><Ruler className="size-3" />{p.area}</span>
                    <span className="inline-flex items-center gap-1"><CalendarDays className="size-3" />{p.year}</span>
                    <span>Client: {p.client}</span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      )}

      {active ? (
        <Lightbox
          images={active.images}
          index={imgIndex}
          onIndex={setImgIndex}
          onClose={() => setActive(null)}
          caption={active.name}
          panel={
            <div className="space-y-4 text-sm text-ink-foreground/75">
              <div>
                <p className="text-[0.62rem] font-bold tracking-[0.14em] text-primary uppercase">{active.category}</p>
                <h3 className="mt-1 text-lg font-semibold text-ink-foreground">{active.name}</h3>
                <p className="mt-2 leading-relaxed">{active.desc}</p>
              </div>
              <dl className="grid grid-cols-2 gap-3 border-y border-white/10 py-3 text-xs">
                {[
                  ["Client", active.client],
                  ["Location", active.location],
                  ["Area", active.area],
                  ["Completed", String(active.year)],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-ink-foreground/45">{k}</dt>
                    <dd className="mt-0.5 font-semibold text-ink-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <p className="text-[0.62rem] font-bold tracking-[0.14em] text-ink-foreground/45 uppercase">Materials used</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {active.materials.map((m) => (
                    <span key={m} className="rounded-full border border-white/15 px-2.5 py-1 text-[0.68rem]">{m}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[0.62rem] font-bold tracking-[0.14em] text-ink-foreground/45 uppercase">Services included</p>
                <ul className="mt-2 space-y-1 text-xs">
                  {active.scope.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              {related.length > 0 ? (
                <div>
                  <p className="text-[0.62rem] font-bold tracking-[0.14em] text-ink-foreground/45 uppercase">Related projects</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {related.map((r) => (
                      <button
                        key={r.slug}
                        type="button"
                        onClick={() => open(r)}
                        className="overflow-hidden rounded-lg border border-white/10 transition-opacity hover:opacity-80"
                      >
                        <img src={r.images[0]} alt={r.name} className="h-14 w-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          }
        />
      ) : null}
    </div>
  );
}