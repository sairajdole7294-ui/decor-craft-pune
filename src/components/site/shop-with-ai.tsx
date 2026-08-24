import { useState, useCallback } from "react";
import { Sparkles, Search, Loader2, RefreshCw, ArrowRight, AlertTriangle, X } from "lucide-react";
import { Reveal } from "@/components/site/motion";
import { SectionHead } from "@/components/site/bits";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { generateShopAI } from "@/lib/gemini-shop.server";

// Sensible fallback used only when a matched product has no usable image.
const PRODUCT_FALLBACK_IMAGE = "/media/products/p28.jpg";

function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src || PRODUCT_FALLBACK_IMAGE);
  return (
    <img
      src={imgSrc}
      alt={alt}
      className="size-full object-cover"
      loading="lazy"
      onError={() => {
        if (imgSrc !== PRODUCT_FALLBACK_IMAGE) setImgSrc(PRODUCT_FALLBACK_IMAGE);
      }}
    />
  );
}

export default function ShopWithAI() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const canSearch = query.trim().length >= 3;

  const handleSearch = useCallback(async () => {
    if (!canSearch) return;
    setIsSearching(true);
    setError(null);
    setResult(null);

    try {
      const response = await (generateShopAI as any)({
        data: { query: query.trim() },
      });

      if (response.success && response.products) {
        setResult(response);
      } else {
        setError(response.message || "We couldn't find matches this time. Please try again.");
      }
    } catch {
      setError("We couldn't find matches this time. Please try again.");
    } finally {
      setIsSearching(false);
    }
  }, [canSearch, query]);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  const handleClear = useCallback(() => {
    setQuery("");
    setResult(null);
    setError(null);
  }, []);

  const showResult = result && !error;
  const showError = error && !result;

  return (
    <div className="mx-auto max-w-6xl">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHead
            eyebrow="Shop with AI"
            title="Tell us what you need"
            lead="Describe the furniture or interior solution you are looking for, and our AI will match it with Payal Decor products from our catalogue."
            align="center"
          />
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Left: Search Form */}
        <div className="space-y-5">
          <Reveal>
            <Card>
              <CardContent className="p-5">
                <Label className="text-sm font-semibold">What are you looking for?</Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Describe your requirement. For example: "ergonomic chair for long office hours", "storage for my bedroom", "conference table for 12 people".
                </p>
                <div className="mt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                      }}
                      placeholder="e.g. ergonomic chair for office, modular wardrobe, bunk bed for hostel..."
                      className="pl-9 pr-20"
                      disabled={isSearching}
                    />
                    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {query && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-7 rounded-full"
                          onClick={handleClear}
                        >
                          <X className="size-3.5" />
                        </Button>
                      )}
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleSearch}
                        disabled={!canSearch || isSearching}
                        className="h-8 bg-brand-gradient text-[0.75rem] font-semibold text-primary-foreground hover:shadow-[var(--shadow-lift)] disabled:opacity-60"
                      >
                        {isSearching ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <>
                            <Sparkles className="mr-1.5 size-3.5" />
                            Shop
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  {query && !canSearch && (
                    <p className="mt-1.5 text-[0.7rem] text-muted-foreground">
                      Please enter at least 3 characters to search.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {showResult && result && (
            <Reveal delay={80}>
              <Card className="border-primary/20 bg-accent/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">Searching for: "{result.query}"</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Found {result.products.length} matching product{result.products.length !== 1 ? "s" : ""} from our catalogue.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          )}
        </div>

        {/* Right: Results */}
        <div className="space-y-5">
          <Reveal delay={120}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col p-6">
                {isSearching ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-10">
                    <Loader2 className="size-12 animate-spin text-primary" />
                    <div className="text-center">
                      <p className="text-sm font-semibold">Finding best matches...</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Our AI is searching the Payal Decor catalogue for you.
                      </p>
                    </div>
                  </div>
                ) : showResult && result ? (
                  <div className="flex h-full flex-col gap-4 overflow-y-auto">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {result.products.map((product: any, i: number) => (
                        <Card key={i} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="aspect-video w-full overflow-hidden bg-secondary/40">
                              <ProductImage src={product.image} alt={product.name} />
                            </div>
                            <div className="p-3">
                              <p className="text-xs font-semibold">{product.name}</p>
                              {product.type && (
                                <p className="mt-0.5 text-[0.65rem] text-muted-foreground">{product.type}</p>
                              )}
                              <p className="mt-1 line-clamp-2 text-[0.7rem] leading-relaxed text-muted-foreground">
                                {product.desc}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <Button asChild size="sm" variant="outline" className="h-7 text-[0.65rem]">
                                  <Link to={product.url}>View Product</Link>
                                </Button>
                                <Button asChild size="sm" className="h-7 bg-brand-gradient text-[0.65rem] text-primary-foreground">
                                  <Link to="/contact">Request Quote</Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex items-start gap-2 rounded-lg border border-border bg-accent/30 p-3">
                      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" />
                      <p className="text-[0.7rem] leading-relaxed text-muted-foreground">
                        AI suggestions are for general guidance only and do not replace professional interior design consultation.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                      >
                        <RefreshCw className="mr-2 size-3" />
                        Try Another Search
                      </Button>
                    </div>
                  </div>
                ) : showError ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-accent text-primary">
                      <Search className="size-7" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">No matches found</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {error}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                    >
                      <RefreshCw className="mr-2 size-3" />
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-accent text-primary">
                      <Sparkles className="size-7" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Your matches will appear here</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Describe what furniture or interior solution you need, and we will match it with Payal Decor products.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
