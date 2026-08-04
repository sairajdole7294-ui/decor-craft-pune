import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import {
  catalogProducts,
  catalogCategories,
  catalogCollections,
  catalogPdf,
  productCollection,
  categoryBySlug,
} from "@/lib/catalog-data";
import { Reveal } from "@/components/site/motion";

type Sort = "featured" | "latest" | "az";

const sorts: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "latest", label: "Latest" },
  { id: "az", label: "Alphabetical" },
];

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  onClear,
}: {
  title: string;
  options: { id: string; name: string; count: number }[];
  selected: string[];
  onToggle: (id: string) => void;
  onClear: () => void;
}) {
  return (
    <div>
      <p className="text-[0.62rem] font-bold tracking-[0.14em] text-primary uppercase">{title}</p>
      <ul className="mt-2 space-y-1">
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
                <span className="shrink-0 text-[0.6rem] text-muted-foreground">{o.count}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ProductCatalogBrowser() {
  const [cats, setCats] = useState<string[]>([]);
  const [cols, setCols] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [openSuggest, setOpenSuggest] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [sort, setSort] = useState<Sort>("featured");
  const [drawer, setDrawer] = useState(false);

  const catOptions = catalogCategories.map((c) => ({
    id: c.slug,
    name: c.name,
    count: catalogProducts.filter((p) => p.category === c.slug).length,
  }));
  const colOptions = catalogCollections.map((c) => ({
    id: c.id,
    name: c.name,
    count: catalogProducts.filter((p) => productCollection(p.slug) === c.id).length,
  }));

  const term = q.trim().toLowerCase();

  const filtered = useMemo(() => {
    const list = catalogProducts.filter((p) => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (cols.length && !cols.includes(productCollection(p.slug))) return false;
      if (term && !`${p.name} ${p.tagline} ${p.desc} ${p.applications.join(" ")}`.toLowerCase().includes(term))
        return false;
      return true;
    });
    if (sort === "az") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "latest") return [...list].reverse();
    return list;
  }, [cats, cols, term, sort]);

  const suggestions = useMemo(() => {
    if (!term) return [];
    return catalogProducts
      .filter((p) => `${p.name} ${p.tagline}`.toLowerCase().includes(term))
      .slice(0, 6);
  }, [term]);

  const toggle = (setter: typeof setCats) => (id: string) =>
    setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const sidebar = (
    <div className="grid gap-5">
      <div>
        <p className="text-sm font-bold">Product Range</p>
        <p className="mt-1 text-xs text-muted-foreground">Filter by category and collection.</p>
      </div>
      <FilterGroup title="Categories" options={catOptions} selected={cats} onToggle={toggle(setCats)} onClear={() => setCats([])} />
      <FilterGroup title="Collection / Series" options={colOptions} selected={cols} onToggle={toggle(setCols)} onClear={() => setCols([])} />
      {cats.length || cols.length ? (
        <button
          type="button"
          onClick={() => {
            setCats([]);
            setCols([]);
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
        >
          <X className="size-3" /> Clear all filters
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="shell grid gap-6 py-8 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-8">
      <aside className="hidden lg:block">
        <div className="sticky top-24 card-premium p-4">{sidebar}</div>
      </aside>

      <div>
        {/* search */}
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
              placeholder="Search the product range…"
              aria-label="Search products"
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
                      <Link
                        to="/products/$slug"
                        params={{ slug: s.slug }}
                        onMouseEnter={() => setCursor(i)}
                        className={`flex items-center gap-3 px-3 py-2 transition-colors ${i === cursor ? "bg-secondary/70" : ""}`}
                      >
                        <img src={s.images[0]} alt="" className="size-9 shrink-0 rounded-lg object-cover" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">{s.name}</span>
                          <span className="block truncate text-xs text-muted-foreground">{s.tagline}</span>
                        </span>
                        <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-3 text-sm text-muted-foreground">
                  No products match “{q.trim()}”. Try “workstation”, “lab”, “school” or “kitchen”.
                </p>
              )}
            </div>
          ) : null}
        </div>

        {/* top bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
          <p className="text-xs font-semibold text-muted-foreground">
            Showing <span className="text-foreground">{filtered.length}</span> product{filtered.length === 1 ? "" : "s"}
          </p>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <SlidersHorizontal className="size-3.5" />
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort products"
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground outline-none transition-colors focus:border-primary"
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>

        {/* grid */}
        {filtered.length ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => {
              const cat = categoryBySlug(p.category);
              return (
                <Reveal key={p.slug} delay={(i % 3) * 60}>
                  <article className="card-premium group flex h-full flex-col overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:border-primary/50">
                    <Link to="/products/$slug" params={{ slug: p.slug }} className="hover-zoom block">
                      <img src={p.images[0]} alt={p.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                    </Link>
                    <div className="flex flex-1 flex-col p-4">
                      <span className="inline-flex w-fit rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[0.6rem] font-bold tracking-[0.1em] text-muted-foreground uppercase">
                        {cat?.name ?? "Product"}
                      </span>
                      <h3 className="mt-2 text-base font-semibold">
                        <Link to="/products/$slug" params={{ slug: p.slug }} className="transition-colors hover:text-primary">
                          {p.name}
                        </Link>
                      </h3>
                      <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">{p.tagline}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <Link
                          to="/products/$slug"
                          params={{ slug: p.slug }}
                          className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1.5 text-[0.7rem] font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
                        >
                          Know More <ArrowRight className="size-3" />
                        </Link>
                        <Link
                          to="/products/$slug"
                          params={{ slug: p.slug }}
                          hash="request-quote"
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[0.7rem] font-semibold transition-colors hover:border-primary hover:text-primary"
                        >
                          Request Quote
                        </Link>
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
              );
            })}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-border p-8 text-center">
            <p className="text-sm font-semibold">No products match these filters.</p>
            <p className="mt-1 text-xs text-muted-foreground">Clear a filter or search a different term.</p>
            <button
              type="button"
              onClick={() => {
                setCats([]);
                setCols([]);
                setQ("");
              }}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              Reset everything
            </button>
          </div>
        )}
      </div>

      {/* mobile drawer */}
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
