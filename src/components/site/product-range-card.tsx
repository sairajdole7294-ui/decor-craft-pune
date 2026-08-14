import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

interface ProductRangeCardProps {
  id: string;
  name: string;
  image: string;
  category?: string;
  series?: string;
  slug?: string;
}

const ProductRangeCard = ({
  id,
  name,
  image,
  slug,
}: ProductRangeCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <Link to={`/products/${slug || id}` as any} className="block aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${slug || id}` as any}>
          <h3 className="text-base font-medium text-foreground mb-4 hover:text-primary transition-colors line-clamp-2 min-h-[48px]">
            {name}
          </h3>
        </Link>

        {/* Action Buttons */}
        <div className="space-y-2">
         <Button
   asChild
   className="
     w-full
     bg-[#f26523] text-white
     hover:bg-[#f26523]/90
   "
 >
   <Link to={`/products/${slug || id}` as any}>Know More</Link>
 </Button>


         <Button
   asChild
   variant="outline"
   className="
     w-full
     border-[#f26523] text-[#f26523]
     transition-all duration-300
     hover:bg-[#f26523]
     hover:text-white
   "
 >
   <Link to="/contact">Request A Quote</Link>
 </Button>


          <Button
            asChild
            variant="outline"
            className="w-full border-muted-foreground/30 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <a href="/payal-decor-product-catalog-2026.pdf" target="_blank" rel="noreferrer" download>
              Download Catalogs
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductRangeCard;
