import { useState } from "react";
import { Download, Play } from "lucide-react";
import { Reveal } from "@/components/site/motion";
import { catalogPdf } from "@/lib/catalog-data";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className="grid gap-3">
      <div className="hover-zoom overflow-hidden rounded-3xl border border-border bg-secondary/30">
        <img src={main} alt={`${name} — view ${active + 1}`} className="aspect-[16/9] max-h-[32rem] w-full object-cover" loading="lazy" />
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${name} image ${i + 1}`}
              className={`overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${
                i === active ? "border-primary ring-2 ring-primary/30" : "border-border opacity-80 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="aspect-square w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CatalogDownload({
  label = "Download Product Catalog",
  href,
  variant = "solid",
}: {
  label?: string;
  href?: string;
  variant?: "solid" | "outline";
}) {
  return (
    <a
      href={href ?? catalogPdf}
      download
      className={
        variant === "solid"
          ? "inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
          : "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-semibold transition-colors duration-300 hover:border-primary hover:text-primary"
      }
    >
      <Download className="size-3.5" />
      {label}
    </a>
  );
}

export function IntroVideoCard({
  src,
  poster,
  heading = "Inside Payal Decor",
  eyebrow = "Company Introduction",
  description = "Watch how Payal Decor delivers high-quality interior, manufacturing and commercial furniture solutions through innovation, precision, craftsmanship and decades of industry experience.",
}: {
  src: string;
  poster?: string;
  heading?: string;
  eyebrow?: string;
  description?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <Reveal className="group card-premium overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-video overflow-hidden bg-ink">
        <video
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          src={src}
          controls={playing}
          preload="metadata"
          playsInline
        />
        {!playing ? (
          <button
            type="button"
            onClick={(e) => {
              setPlaying(true);
              const v = e.currentTarget.parentElement?.querySelector("video");
              v?.play();
            }}
            aria-label="Play the Payal Decor company introduction"
            className="absolute inset-0 flex items-center justify-center bg-ink/45 transition-colors duration-500 hover:bg-ink/30"
          >
            <span className="inline-flex size-16 items-center justify-center rounded-full bg-brand-gradient shadow-[var(--shadow-lift)] transition-transform duration-500 group-hover:scale-110">
              <Play className="ml-0.5 size-6 fill-current text-primary-foreground" />
            </span>
          </button>
        ) : null}
      </div>
      <div className="p-5">
        <p className="text-[0.62rem] font-bold tracking-[0.14em] text-primary uppercase">{eyebrow}</p>
        <h3 className="mt-1 text-lg font-semibold">{heading}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </Reveal>
  );
}