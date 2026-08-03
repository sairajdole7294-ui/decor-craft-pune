import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, ArrowRight } from "lucide-react";
import { catalogProducts, catalogCategories, industryPages } from "@/lib/catalog-data";
import { services } from "@/lib/site-data";

type Hit = { key: string; label: string; group: string; sub: string; to: string; params?: Record<string, string> };

function buildIndex(): Hit[] {
  const hits: Hit[] = [];
  services.forEach((s) =>
    hits.push({ key: `svc-${s.id}`, label: s.title, group: "Service", sub: s.summary, to: "/services" }),
  );
  catalogProducts.forEach((p) =>
    hits.push({
      key: `prd-${p.slug}`,
      label: p.name,
      group: "Product",
      sub: p.tagline,
      to: "/products/$slug",
      params: { slug: p.slug },
    }),
  );
  catalogCategories.forEach((c) =>
    hits.push({
      key: `cat-${c.slug}`,
      label: c.name,
      group: "Category",
      sub: c.desc,
      to: "/product-categories/$slug",
      params: { slug: c.slug },
    }),
  );
  industryPages.forEach((i) =>
    hits.push({
      key: `ind-${i.slug}`,
      label: i.name,
      group: "Industry",
      sub: i.overview,
      to: "/industries/$slug",
      params: { slug: i.slug },
    }),
  );
  return hits;
}

export function CatalogSearch() {
  const index = useMemo(buildIndex, []);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return index
      .filter((h) => `${h.label} ${h.group} ${h.sub}`.toLowerCase().includes(term))
      .slice(0, 8);
  }, [index, q]);

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 shadow-[var(--shadow-card)] transition-colors duration-300 focus-within:border-primary">
        <Search className="size-4 shrink-0 text-primary" />
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setCursor(0);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setCursor((c) => Math.min(c + 1, Math.max(results.length - 1, 0)));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setCursor((c) => Math.max(c - 1, 0));
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Search products, categories, industries and services…"
          aria-label="Search products, categories, industries and services"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {open && q.trim() ? (
        <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)]">
          {results.length ? (
            <ul className="max-h-80 overflow-auto py-1">
              {results.map((r, i) => (
                <li key={r.key}>
                  <Link
                    to={r.to}
                    params={r.params as never}
                    onMouseEnter={() => setCursor(i)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      i === cursor ? "bg-secondary/70" : ""
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{r.label}</span>
                      <span className="block truncate text-xs text-muted-foreground">{r.sub}</span>
                    </span>
                    <span className="rounded-full border border-border px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.1em] text-primary uppercase">
                      {r.group}
                    </span>
                    <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-4 text-sm text-muted-foreground">
              No results found for “{q.trim()}”. Try “workstation”, “lab”, “school” or “kitchen”.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}