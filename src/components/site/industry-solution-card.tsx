import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

interface IndustrySolutionCardProps {
  name: string;
  slug?: string;
  industrySlug: string;
  image?: string;
}

const IndustrySolutionCard = ({ name, slug, industrySlug, image }: IndustrySolutionCardProps) => {
  const productSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
      {image ? (
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-muted" />
      )}
      <div className="p-4 text-center">
        <h3 className="text-base font-medium text-foreground mb-3">{name}</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            asChild
            className="
              w-full
              bg-[#f26523] text-white
              hover:bg-transparent
              hover:text-[#f26523]
              hover:border-[#f26523]
              border border-transparent
              transition-all duration-300
              rounded-full
              text-sm
            "
          >
            <Link to="/contact">Request A Quote</Link>
          </Button>
          <Button
            asChild
            className="
              w-full
              bg-[#f26523] text-white
              hover:bg-[#f26523]/90
            "
          >
            <Link to={`/industries/${industrySlug}/${productSlug}` as any}>Know More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndustrySolutionCard;
