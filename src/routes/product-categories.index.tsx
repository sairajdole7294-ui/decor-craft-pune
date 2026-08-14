import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Filter, X } from "lucide-react";
import { allProducts, seriesCategories, productTypes } from "@/data/productCategoriesData";
import ProductCategoriesSidebar from "@/components/site/product-categories-sidebar";
import ProductRangeCard from "@/components/site/product-range-card";
import { PageHero } from "@/components/site/bits";

const title = "Product Categories — Commercial Furniture | Payal Decor";
const description =
  "Browse Payal Decor product categories by series and type: office workstations and desking, technical and laboratory furniture, education furniture, and modular kitchens and wardrobes.";

export const Route = createFileRoute("/product-categories/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/product-categories" },
    ],
    links: [{ rel: "canonical", href: "/product-categories" }],
  }),
  component: CategoriesIndex,
});

function CategoriesIndex() {
  const [selectedSeries, setSelectedSeries] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = allProducts.filter((product) => {
    const matchesSeries = selectedSeries === "All" || product.series === selectedSeries;
    const matchesType = selectedType === "All" || product.type === selectedType;
    return matchesSeries && matchesType;
  });

  return (
    <>
      <PageHero
        eyebrow="Product Categories"
        crumbs="Product Categories"
        title="Product Categories"
        lead="Explore our premium furniture series and collections"
        image="/media/products/lab-workstation-2.jpg"
      />

      {/* Mobile Filter Button */}
      <div className="lg:hidden sticky top-16 z-40 bg-background border-b border-border px-4 py-3">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
        >
          <Filter className="w-4 h-4" />
          Filters
          {(selectedSeries !== "All" || selectedType !== "All") && (
            <span className="bg-background text-foreground text-xs px-1.5 py-0.5 rounded-full">
              {(selectedSeries !== "All" ? 1 : 0) +
                (selectedType !== "All" ? 1 : 0)}
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
              <ProductCategoriesSidebar
                seriesCategories={seriesCategories}
                productTypes={productTypes}
                selectedSeries={selectedSeries}
                setSelectedSeries={setSelectedSeries}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
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
            <ProductCategoriesSidebar
              seriesCategories={seriesCategories}
              productTypes={productTypes}
              selectedSeries={selectedSeries}
              setSelectedSeries={setSelectedSeries}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
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
                  slug={product.slug}
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
                  setSelectedSeries("All");
                  setSelectedType("All");
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
