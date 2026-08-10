import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductCategoriesSidebarProps {
  seriesCategories: string[];
  productTypes: string[];
  selectedSeries: string;
  setSelectedSeries: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
}

const ProductCategoriesSidebar = ({
  seriesCategories,
  productTypes,
  selectedSeries,
  setSelectedSeries,
  selectedType,
  setSelectedType,
}: ProductCategoriesSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Product Series Filter */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-3 border-b border-border">
          <h3 className="font-semibold text-foreground">Product Series</h3>
        </div>
        <ScrollArea className="h-[280px]">
          <div className="p-4 space-y-3">
            {seriesCategories.map((series) => (
              <label
                key={series}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={selectedSeries === series}
                  onCheckedChange={() => setSelectedSeries(series)}
                  className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span
                  className={`text-sm transition-colors ${
                    selectedSeries === series
                      ? "text-foreground font-medium"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {series}
                </span>
              </label>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Product Type Filter */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-3 border-b border-border">
          <h3 className="font-semibold text-foreground">Product Type</h3>
        </div>
        <ScrollArea className="h-[220px]">
          <div className="p-4 space-y-3">
            {productTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={selectedType === type}
                  onCheckedChange={() => setSelectedType(type)}
                  className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span
                  className={`text-sm transition-colors ${
                    selectedType === type
                      ? "text-foreground font-medium"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {type}
                </span>
              </label>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProductCategoriesSidebar;
