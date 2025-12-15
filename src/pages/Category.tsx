import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/ListingCard";
import { listings } from "@/data/listings";
import { categories } from "@/data/categories";
import { BottomNav } from "@/components/BottomNav";
import { useState } from "react";

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const category = categories.find(c => c.id === id);
  const categoryListings = listings.filter(l => l.category === id);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card sticky top-0 z-50 border-b border-border">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-medium">{category?.name || "Category"}</span>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
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
      </header>

      <main className="container py-4">
        {categoryListings.length > 0 ? (
          <div className={viewMode === "grid" ? "grid grid-cols-2 gap-3" : "flex flex-col gap-3"}>
            {categoryListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-muted-foreground">No listings in this category yet.</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Category;
