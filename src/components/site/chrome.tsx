import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Sparkles, Phone, CalendarDays, FileDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { company } from "@/lib/site-data";

export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent" aria-hidden="true">
      <div className="h-full bg-brand-gradient transition-[width] duration-150" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function FloatingTools() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-3 bottom-20 z-50 flex flex-col items-end gap-2.5 sm:right-5 sm:bottom-6">
      <a
        href={company.whatsapp}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat with Payal Decor on WhatsApp"
        className="group inline-flex size-12 items-center justify-center rounded-full bg-[oklch(0.72_0.17_150)] text-white shadow-[var(--shadow-lift)] transition-transform duration-300 hover:scale-110"
      >
        <MessageCircle className="size-5" />
      </a>
      <Link
        to="/shop-with-ai"
        aria-label="Shop with AI"
        className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-3 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform duration-300 hover:scale-105 sm:px-4 sm:py-3"
      >
        <Sparkles className="size-4" />
        <span className="hidden sm:inline">Shop with AI</span>
      </Link>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[var(--shadow-card)] transition-all duration-300 hover:border-primary hover:text-primary",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <ArrowUp className="size-4" />
      </button>
    </div>
  );
}

export function QuickContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-border bg-card/95 backdrop-blur-lg sm:hidden">
      <a href={company.phoneHref} className="flex flex-col items-center gap-0.5 py-2.5 text-[0.65rem] font-semibold">
        <Phone className="size-4 text-primary" /> Call
      </a>
      <a
        href={company.whatsapp}
        target="_blank"
        rel="noreferrer noopener"
        className="flex flex-col items-center gap-0.5 border-x border-border py-2.5 text-[0.65rem] font-semibold"
      >
        <MessageCircle className="size-4 text-primary" /> WhatsApp
      </a>
      <Link to="/contact" className="flex flex-col items-center gap-0.5 py-2.5 text-[0.65rem] font-semibold">
        <CalendarDays className="size-4 text-primary" /> Book
      </Link>
    </div>
  );
}

export function BrochureButton({ className }: { className?: string }) {
  return (
    <a
      href={company.whatsapp}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary",
        className,
      )}
    >
      <FileDown className="size-4" />
      Request Company Brochure
    </a>
  );
}