import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { company, media } from "@/lib/site-data";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/manufacturing", label: "Manufacturing" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/clients", label: "Clients" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onHome = pathname === "/";
  const transparent = onHome && !scrolled;

  return (
    <>
      <div className="hidden bg-ink text-[0.7rem] text-ink-foreground/70 lg:block">
        <div className="shell flex h-9 items-center justify-between">
          <p className="tracking-wide">
            {company.tagline} · ISO 9001:2015 Certified · Katraj, Pune
          </p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${company.email}`} className="transition-colors hover:text-primary">
              {company.email}
            </a>
            <a href={company.phoneHref} className="transition-colors hover:text-primary">
              {company.phone}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          transparent ? "bg-transparent" : "surface-glass shadow-[0_1px_0_0_var(--border)]",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-3 lg:h-[4.5rem]">
          <Link to="/" className="flex items-center" aria-label="Payal Decor home">
            <img
              src={media.logo}
              alt="Payal Decor"
              className="h-11 w-auto max-w-[9.5rem] object-contain transition-transform duration-300 hover:scale-[1.03] sm:h-12 lg:h-14"
            />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className={cn(
                  "relative rounded-full px-2.5 py-2 text-[0.8rem] font-medium whitespace-nowrap transition-all duration-300 hover:-translate-y-px",
                  transparent ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground",
                )}
                activeProps={{
                  className: cn(
                    "!font-semibold",
                    transparent ? "!text-white" : "!text-primary",
                  ),
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={company.phoneHref}
              className={cn(
                "hidden items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors xl:inline-flex",
                transparent
                  ? "border-white/25 text-white hover:bg-white/10"
                  : "border-border text-foreground hover:border-primary hover:text-primary",
              )}
            >
              <Phone className="size-3.5" />
              {company.phone}
            </a>
            <Link
              to="/contact"
              className="hidden whitespace-nowrap rounded-full bg-brand-gradient px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] sm:inline-flex"
            >
              Book Free Consultation
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-full border transition-colors lg:hidden",
                transparent ? "border-white/25 text-white" : "border-border text-foreground",
              )}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-500 lg:hidden",
            open ? "max-h-[34rem] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <nav className="shell grid gap-0.5 py-3" aria-label="Mobile">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "!bg-accent !text-primary !font-semibold" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href={company.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-3 py-2.5 text-xs font-semibold"
              >
                <Phone className="size-3.5" /> Call
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-gradient px-3 py-2.5 text-xs font-semibold text-primary-foreground"
              >
                Book Consultation
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}