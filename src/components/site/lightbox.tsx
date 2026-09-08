import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import type { ReactNode } from "react";

export function Lightbox({
  images,
  index,
  onIndex,
  onClose,
  caption,
  panel,
}: {
  images: string[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  caption?: string;
  panel?: ReactNode;
}) {
  const [zoom, setZoom] = useState(1);
  const touchX = useRef<number | null>(null);

  const next = useCallback(() => {
    setZoom(1);
    onIndex((index + 1) % images.length);
  }, [index, images.length, onIndex]);

  const prev = useCallback(() => {
    setZoom(1);
    onIndex((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [next, prev, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-md"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="truncate text-sm font-semibold text-ink-foreground">
          {caption} <span className="text-ink-foreground/50">· {index + 1} / {images.length}</span>
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
          >
            <ZoomOut className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
          >
            <ZoomIn className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Close viewer"
            onClick={onClose}
            className="inline-flex size-9 items-center justify-center rounded-full bg-brand-gradient text-primary-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2 pb-2">
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="absolute left-2 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-ink/60 text-white transition-colors hover:bg-white/15"
          >
            <ChevronLeft className="size-5" />
          </button>
          <img
            src={images[index]}
            alt={caption ?? "Project image"}
            className="aspect-[4/3] w-full max-w-3xl rounded-xl object-cover transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
          />
          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="absolute right-2 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-ink/60 text-white transition-colors hover:bg-white/15"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {panel ? (
          <aside className="max-h-[42vh] shrink-0 overflow-y-auto border-t border-white/10 bg-ink-soft/70 p-5 lg:max-h-none lg:w-[22rem] lg:border-t-0 lg:border-l">
            {panel}
          </aside>
        ) : null}
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-4">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => {
              setZoom(1);
              onIndex(i);
            }}
            aria-label={`Go to image ${i + 1}`}
            className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
              i === index ? "border-primary opacity-100" : "border-transparent opacity-50 hover:opacity-90"
            }`}
          >
            <img src={src} alt="" className="size-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}