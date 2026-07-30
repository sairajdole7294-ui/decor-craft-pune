import { useMemo, useState } from "react";
import { Expand, Play } from "lucide-react";
import { galleryItems, galleryCategories, media } from "@/lib/site-data";
import { Reveal } from "./motion";
import { Lightbox } from "./lightbox";
import { cn } from "@/lib/utils";

export function GalleryExplorer() {
  const [cat, setCat] = useState("All");
  const [index, setIndex] = useState<number | null>(null);

  const items = useMemo(
    () => (cat === "All" ? galleryItems : galleryItems.filter((g) => g.cat === cat)),
    [cat],
  );

  return (
    <div>
      <Reveal className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {galleryCategories.map((c) => (
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
      </Reveal>

      <div className="mt-5 columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
        {items.map((g, i) => (
          <Reveal key={g.src + i} delay={(i % 4) * 70} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block w-full overflow-hidden rounded-xl border border-border"
            >
              <img
                src={g.src}
                alt={g.title}
                loading="lazy"
                decoding="async"
                className={cn(
                  "w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]",
                  i % 5 === 0 ? "h-64" : i % 3 === 0 ? "h-44" : "h-52",
                )}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3 opacity-0 transition-all duration-400 group-hover:opacity-100">
                <span className="text-left text-xs font-semibold text-white">{g.title}</span>
                <Expand className="size-4 shrink-0 text-white" />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {index !== null ? (
        <Lightbox
          images={items.map((i) => i.src)}
          index={index}
          onIndex={setIndex}
          onClose={() => setIndex(null)}
          caption={items[index]?.title}
        />
      ) : null}
    </div>
  );
}

export function BeforeAfter({
  before,
  after,
  labelBefore = "Bare shell",
  labelAfter = "After handover",
}: {
  before: string;
  after: string;
  labelBefore?: string;
  labelAfter?: string;
}) {
  const [pos, setPos] = useState(50);
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="relative aspect-[16/9] select-none">
        <img src={before} alt={labelBefore} className="absolute inset-0 size-full object-cover" loading="lazy" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img
            src={after}
            alt={labelAfter}
            className="absolute inset-0 h-full w-[100vw] max-w-none object-cover"
            style={{ width: `${(100 / pos) * 100}%` }}
            loading="lazy"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_oklch(0_0_0/0.2)]"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 inline-flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-gradient text-primary-foreground">
            <Play className="size-3 rotate-180" />
          </span>
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-2.5 py-1 text-[0.65rem] font-semibold text-white backdrop-blur">
          {labelAfter}
        </span>
        <span className="absolute right-3 bottom-3 rounded-full bg-ink/70 px-2.5 py-1 text-[0.65rem] font-semibold text-white backdrop-blur">
          {labelBefore}
        </span>
        <input
          type="range"
          min={2}
          max={98}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare before and after"
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}

export function VideoShowcase() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
      <video
        className="aspect-video w-full object-cover"
        src={media.workVideo}
        poster={media.workshop}
        controls
        playsInline
        preload="none"
      />
    </div>
  );
}