import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Filter, X } from "lucide-react";
import { allProducts, productRangeCategories, productCategories } from "@/data/productRangeData";
import ProductRangeSidebar from "@/components/site/product-range-sidebar";
import ProductRangeCard from "@/components/site/product-range-card";
import { PageHero } from "@/components/site/bits";

const title = "Product Range — Office, Lab & Education Furniture | Payal Decor";
const description =
  "Browse the full Payal Decor product range by product range and product category.";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const [selectedRange, setSelectedRange] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesRange = selectedRange === "All" || product.category === selectedRange;
      const matchesCategory = selectedCategory === "All" || product.series === selectedCategory;
      return matchesRange && matchesCategory;
    })
    .sort((a, b) => Number(a.id) - Number(b.id));

  return (
    <>
      <PageHero
        eyebrow="Product Range"
        crumbs="Product Range"
        title="Product Range"
        lead="Explore our comprehensive collection of premium office furniture"
        image="/media/products/impact-7.jpg"
      />

      {/* Mobile Filter Button */}
      <div className="lg:hidden sticky top-16 z-40 bg-background border-b border-border px-4 py-3">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
        >
          <Filter className="w-4 h-4" />
          Filters
          {(selectedRange !== "All" || selectedCategory !== "All") && (
            <span className="bg-background text-foreground text-xs px-1.5 py-0.5 rounded-full">
              {(selectedRange !== "All" ? 1 : 0) +
                (selectedCategory !== "All" ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background overflow-y-auto animate-slide-in-left">
            <div className="sticky top-0 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
              <span className="font-medium">Filters</span>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <ProductRangeSidebar
                productRangeCategories={productRangeCategories}
                productCategories={productCategories}
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="shell grid gap-6 py-6 lg:grid-cols-[minmax(0,16rem)_1fr] lg:py-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ProductRangeSidebar
              productRangeCategories={productRangeCategories}
              productCategories={productCategories}
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </aside>

        {/* Products Grid */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-6">
            Showing {filteredProducts.length} products
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductRangeCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products found matching your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedRange("All");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-primary underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
