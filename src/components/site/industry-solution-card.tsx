import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

interface IndustrySolutionCardProps {
  name: string;
  image: string;
}

const IndustrySolutionCard = ({ name, image }: IndustrySolutionCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-base font-medium text-foreground mb-3">{name}</h3>
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
      </div>
    </div>
  );
};

export default IndustrySolutionCard;
