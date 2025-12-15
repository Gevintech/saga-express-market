import { useState } from "react";
import { Grid3X3, List } from "lucide-react";
import { Button } from "./ui/button";
import { ListingCard } from "./ListingCard";
import { useListings, Listing } from "@/hooks/useListings";
import { listings as mockListings } from "@/data/listings";
import { SearchFilters } from "./SearchFilters";

interface TrendingAdsProps {
  searchQuery?: string;
}

export const TrendingAds = ({ searchQuery }: TrendingAdsProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    location: "",
    condition: "",
  });

  const { data: dbListings, isLoading } = useListings({
    search: searchQuery,
    category: filters.category || undefined,
    minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
    location: filters.location || undefined,
    condition: filters.condition || undefined,
  });

  const handleClearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      location: "",
      condition: "",
    });
  };

  // Use database listings if available, otherwise fallback to mock data
  const displayListings = dbListings && dbListings.length > 0 
    ? dbListings.map(listing => ({
        id: listing.id,
        title: listing.title,
        price: listing.price,
        currency: listing.currency,
        location: listing.location,
        region: listing.region,
        image: listing.images?.[0] || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
        category: listing.category,
        condition: listing.condition,
        postedAt: new Date(listing.created_at).toLocaleDateString(),
        isPromoted: listing.is_promoted,
        isFeatured: listing.is_featured,
      }))
    : mockListings;

  return (
    <div className="container py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Trending ads</h2>
        <div className="flex gap-2 items-center">
          <SearchFilters 
            filters={filters}
            onFiltersChange={setFilters}
            onClear={handleClearFilters}
          />
          <div className="flex gap-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card rounded-xl h-48 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-2 gap-3" : "flex flex-col gap-3"}>
          {displayListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};
