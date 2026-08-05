import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { catalogPdf } from "@/lib/catalog-data";
import { Reveal } from "@/components/site/motion";

export type BrowserBase = "/products/$slug" | "/product-categories/$slug" | "/industries/$slug";

export type BrowserItem = {
  slug: string;
  name: string;
  desc: string;
  image: string;
  badge: string;
  series: string[]; // series ids
  types: string[]; // type ids
};

export type FilterOption = { id: string; name: string };

type Sort = "featured" | "latest" | "az";

const sorts: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "latest", label: "Latest" },
  { id: "az", label: "Alphabetical" },
];

function ItemLink({
  base,
  slug,
  hash,
  className,
  children,
}: {
  base: BrowserBase;
  slug: string;
  hash?: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (base === "/product-categories/$slug")
    return (
      <Link to="/product-categories/$slug" params={{ slug }} hash={hash} className={className}>
        {children}
      </Link>
    );
  if (base === "/industries/$slug")
    return (
      <Link to="/industries/$slug" params={{ slug }} hash={hash} className={className}>
        {children}
      </Link>
    );
  return (
    <Link to="/products/$slug" params={{ slug }} hash={hash} className={className}>
      {children}
    </Link>
  );
}

function FilterGroup({
  title,
  options,
  counts,
  selected,
  onToggle,
  onClear,
}: {
  title: string;
  options: FilterOption[];
  counts: Record<string, number>;
  selected: string[];
  onToggle: (id: string) => void;
  onClear: () => void;
}) {
  return (
    <div>
      <p className="text-[0.62rem] font-bold tracking-[0.14em] text-primary uppercase">{title}</p>
      <ul className="mt-1.5 space-y-1">
        <li>
          <button
            type="button"
            onClick={onClear}
            className={`w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition-colors ${
              selected.length === 0 ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60"
            }`}
          >
            All
          </button>
        </li>
        {options.map((o) => {
          const on = selected.includes(o.id);
          return (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => onToggle(o.id)}
                aria-pressed={on}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
                  on ? "bg-secondary font-semibold text-foreground" : "text-muted-foreground hover:bg-secondary/60"
                }`}
              >
                <span className="truncate">{o.name}</span>
                <span className="shrink-0 text-[0.6rem] text-muted-foreground">{counts[o.id] ?? 0}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function CatalogBrowser({
  items,
  base,
  seriesOptions,
  typeOptions,
  searchPlaceholder = "Search the product range…",
  noun = "item",
}: {
  items: BrowserItem[];
  base: BrowserBase;
  seriesOptions: FilterOption[];
  typeOptions: FilterOption[];
  searchPlaceholder?: string;
  noun?: string;
}) {
  const [series, setSeries] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [openSuggest, setOpenSuggest] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [sort, setSort] = useState<Sort>("featured");
  const [drawer, setDrawer] = useState(false);

  const count = (key: "series" | "types") => (id: string) => items.filter((i) => i[key].includes(id)).length;
  const seriesCounts = Object.fromEntries(seriesOptions.map((o) => [o.id, count("series")(o.id)]));
  const typeCounts = Object.fromEntries(typeOptions.map((o) => [o.id, count("types")(o.id)]));

  const term = q.trim().toLowerCase();

  const filtered = useMemo(() => {
    const list = items.filter((p) => {
      if (series.length && !p.series.some((s) => series.includes(s))) return false;
      if (types.length && !p.types.some((t) => types.includes(t))) return false;
      if (term && !`${p.name} ${p.desc} ${p.badge}`.toLowerCase().includes(term)) return false;
      return true;
    });
    if (sort === "az") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "latest") return [...list].reverse();
    return list;
  }, [items, series, types, term, sort]);

  const suggestions = useMemo(
    () => (term ? items.filter((p) => `${p.name} ${p.desc}`.toLowerCase().includes(term)).slice(0, 6) : []),
    [items, term],
  );

  const toggle = (setter: typeof setSeries) => (id: string) =>
    setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const sidebar = (
    <div className="grid gap-4">
      <div>
        <p className="text-sm font-bold">Filters</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Combine series and type — results update instantly.</p>
      </div>
      <FilterGroup
        title="Product Series"
        options={seriesOptions}
        counts={seriesCounts}
        selected={series}
        onToggle={toggle(setSeries)}
        onClear={() => setSeries([])}
      />
      <FilterGroup
        title="Product Type"
        options={typeOptions}
        counts={typeCounts}
        selected={types}
        onToggle={toggle(setTypes)}
        onClear={() => setTypes([])}
      />
      {series.length || types.length ? (
        <button
          type="button"
          onClick={() => {
            setSeries([]);
            setTypes([]);
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
        >
          <X className="size-3" /> Clear all filters
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="shell grid gap-5 py-6 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-6">
      <aside className="hidden lg:block">
        <div className="card-premium sticky top-24 p-4">{sidebar}</div>
      </aside>

      <div>
        <div className="relative">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 shadow-[var(--shadow-card)] transition-colors focus-within:border-primary">
            <Search className="size-4 shrink-0 text-primary" />
            <input
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setOpenSuggest(true);
                setCursor(0);
              }}
              onFocus={() => setOpenSuggest(true)}
              onBlur={() => window.setTimeout(() => setOpenSuggest(false), 150)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setCursor((c) => Math.min(c + 1, Math.max(suggestions.length - 1, 0)));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setCursor((c) => Math.max(c - 1, 0));
                } else if (e.key === "Escape") {
                  setOpenSuggest(false);
                }
              }}
              placeholder={searchPlaceholder}
              aria-label="Search"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold lg:hidden"
            >
              <Filter className="size-3.5" /> Filters
            </button>
          </div>

          {openSuggest && term ? (
            <div className="animate-in fade-in slide-in-from-top-1 absolute inset-x-0 top-[calc(100%+0.4rem)] z-40 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)] duration-200">
              {suggestions.length ? (
                <ul className="max-h-80 overflow-auto py-1">
                  {suggestions.map((s, i) => (
                    <li key={s.slug}>
                      <ItemLink
                        base={base}
                        slug={s.slug}
                        className={`flex items-center gap-3 px-3 py-2 transition-colors ${i === cursor ? "bg-secondary/70" : ""}`}
                      >
                        <img src={s.image} alt="" className="size-9 shrink-0 rounded-lg object-cover" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">{s.name}</span>
                          <span className="block truncate text-xs text-muted-foreground">{s.desc}</span>
                        </span>
                        <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
                      </ItemLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-3 text-sm text-muted-foreground">No matches for “{q.trim()}”.</p>
              )}
            </div>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-2.5">
          <p className="text-xs font-semibold text-muted-foreground">
            Showing <span className="text-foreground">{filtered.length}</span> {noun}
            {filtered.length === 1 ? "" : "s"}
          </p>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <SlidersHorizontal className="size-3.5" />
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort results"
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground outline-none transition-colors focus:border-primary"
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 60}>
                <article className="card-premium group flex h-full flex-col overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:border-primary/50">
                  <ItemLink base={base} slug={p.slug} className="hover-zoom block">
                    <img src={p.image} alt={p.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  </ItemLink>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="inline-flex w-fit rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[0.6rem] font-bold tracking-[0.1em] text-muted-foreground uppercase">
                      {p.badge}
                    </span>
                    <h3 className="mt-1.5 text-base font-semibold">
                      <ItemLink base={base} slug={p.slug} className="transition-colors hover:text-primary">
                        {p.name}
                      </ItemLink>
                    </h3>
                    <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <ItemLink
                        base={base}
                        slug={p.slug}
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1.5 text-[0.7rem] font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
                      >
                        Know More <ArrowRight className="size-3" />
                      </ItemLink>
                      <ItemLink
                        base={base}
                        slug={p.slug}
                        hash="request-quote"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[0.7rem] font-semibold transition-colors hover:border-primary hover:text-primary"
                      >
                        Request Quote
                      </ItemLink>
                      <a
                        href={catalogPdf}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[0.7rem] font-semibold transition-colors hover:border-primary hover:text-primary"
                      >
                        <Download className="size-3" /> Catalog
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-border p-6 text-center">
            <p className="text-sm font-semibold">Nothing matches these filters.</p>
            <button
              type="button"
              onClick={() => {
                setSeries([]);
                setTypes([]);
                setQ("");
              }}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              Reset everything
            </button>
          </div>
        )}
      </div>

      {drawer ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close filters" onClick={() => setDrawer(false)} className="absolute inset-0 bg-ink/60" />
          <div className="animate-in slide-in-from-left absolute inset-y-0 left-0 w-[84%] max-w-xs overflow-auto bg-card p-5 duration-300">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold">Filters</p>
              <button type="button" onClick={() => setDrawer(false)} aria-label="Close">
                <X className="size-4" />
              </button>
            </div>
            {sidebar}
          </div>
        </div>
      ) : null}
    </div>
  );
}
