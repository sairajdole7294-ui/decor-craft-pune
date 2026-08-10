import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductRangeSidebarProps {
  productRangeCategories: string[];
  productCategories: string[];
  selectedRange: string;
  setSelectedRange: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

const ProductRangeSidebar = ({
  productRangeCategories,
  productCategories,
  selectedRange,
  setSelectedRange,
  selectedCategory,
  setSelectedCategory,
}: ProductRangeSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Product Range Filter */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-3 border-b border-border">
          <h3 className="font-semibold text-foreground">Product Range</h3>
        </div>
        <ScrollArea className="h-[280px]">
          <div className="p-4 space-y-3">
            {productRangeCategories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={selectedRange === category}
                  onCheckedChange={() => setSelectedRange(category)}
                  className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span
                  className={`text-sm transition-colors ${
                    selectedRange === category
                      ? "text-foreground font-medium"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {category}
                </span>
              </label>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Product Category Filter */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-3 border-b border-border">
          <h3 className="font-semibold text-foreground">Product Category</h3>
        </div>
        <ScrollArea className="h-[220px]">
          <div className="p-4 space-y-3">
            {productCategories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={selectedCategory === category}
                  onCheckedChange={() => setSelectedCategory(category)}
                  className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span
                  className={`text-sm transition-colors ${
                    selectedCategory === category
                      ? "text-foreground font-medium"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {category}
                </span>
              </label>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProductRangeSidebar;
