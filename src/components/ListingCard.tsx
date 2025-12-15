import { Link } from "react-router-dom";
import { MapPin, Award } from "lucide-react";
import { Listing, formatPrice } from "@/data/listings";
import { Badge } from "./ui/badge";

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <Link 
      to={`/listing/${listing.id}`}
      className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 block group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={listing.image} 
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {listing.sellerYears && (
          <Badge className="absolute top-2 left-2 bg-card/90 text-foreground text-xs gap-1">
            <Award className="w-3 h-3" />
            {listing.sellerYears}+ YEARS
          </Badge>
        )}
        {listing.isPromoted && (
          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs">
            Promoted
          </Badge>
        )}
      </div>
      
      <div className="p-3">
        <p className="text-price font-bold text-base mb-1">
          {formatPrice(listing.price, listing.currency)}
        </p>
        <h3 className="text-sm text-foreground font-medium line-clamp-2 mb-2">
          {listing.title}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <MapPin className="w-3 h-3" />
          <span>{listing.location}, {listing.region}</span>
        </div>
        {listing.condition && (
          <Badge variant="secondary" className="mt-2 text-xs">
            {listing.condition}
          </Badge>
        )}
      </div>
    </Link>
  );
};
