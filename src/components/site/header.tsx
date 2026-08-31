import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { company, media } from "@/lib/site-data";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products", hasDropdown: true },
  { to: "/manufacturing", label: "Manufacturing" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/clients", label: "Clients" },
  { to: "/contact", label: "Contact" },
];

export const productDropdownLinks = [
  { to: "/products", label: "Product Range" },
  { to: "/product-categories", label: "Product Categories" },
  { to: "/industries", label: "Industry Solutions" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!productsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProductsOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [productsOpen]);

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
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          transparent ? "bg-transparent" : "surface-glass shadow-[0_1px_0_0_var(--border)]",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link to="/" className="flex items-center lg:mr-2" aria-label="Payal Decor home">
            <img
              src={media.logo}
              alt="Payal Decor"
              className="h-11 w-auto max-w-[9.5rem] object-contain transition-transform duration-300 hover:scale-[1.03] sm:h-12 lg:h-14"
            />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {navLinks.map((l) =>
              l.hasDropdown ? (
                <div
                  key={l.to}
                  ref={productsRef}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    className={cn(
                      "relative inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-[0.8rem] font-medium whitespace-nowrap transition-all duration-300 hover:-translate-y-px",
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
                  <div
                    className={cn(
                      "absolute top-full left-1/2 z-50 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)] transition-all duration-300",
                      productsOpen ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                  >
                    <div className="p-1.5 pt-1">
                      {productDropdownLinks.map((dl) => (
                        <Link
                          key={dl.to}
                          to={dl.to}
                          className={cn(
                            "block rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                            pathname === dl.to
                              ? "bg-secondary text-primary"
                              : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                          )}
                        >
                          {dl.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className={cn(
                    "relative inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-[0.8rem] font-medium whitespace-nowrap transition-all duration-300 hover:-translate-y-px",
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
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 lg:ml-2">
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
            {navLinks.map((l) =>
              l.hasDropdown ? (
                <div key={l.to}>
                   <button
                     type="button"
                     onClick={() => setProductsOpen((v) => !v)}
                     className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      aria-expanded={productsOpen}
                    >
                      {l.label}
                      <svg
                      className={cn("size-4 transition-transform duration-300", productsOpen && "rotate-180")}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      productsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    {productDropdownLinks.map((dl) => (
                      <Link
                        key={dl.to}
                        to={dl.to}
                        activeOptions={{ exact: dl.to === "/products" }}
                        className="block rounded-lg px-3 py-2 pl-6 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        activeProps={{ className: "!bg-accent !text-primary !font-semibold" }}
                      >
                        {dl.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "!bg-accent !text-primary !font-semibold" }}
                >
                  {l.label}
                </Link>
              ),
            )}
            <div className="mt-2 grid grid-cols-2 gap-2">
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