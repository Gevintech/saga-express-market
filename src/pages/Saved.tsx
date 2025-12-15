import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { ListingCard } from "@/components/ListingCard";
import { useAuth } from "@/contexts/AuthContext";
import { useSavedListings } from "@/hooks/useSavedListings";
import { Button } from "@/components/ui/button";

const Saved = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: savedListings, isLoading } = useSavedListings();

  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <header className="bg-card sticky top-0 z-50 border-b border-border">
          <div className="container py-3 flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-medium">Saved Items</span>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
            <Bookmark className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-medium text-foreground mb-2">Sign in to see saved items</h2>
          <p className="text-muted-foreground text-center mb-6">
            Save your favorite items and find them easily here.
          </p>
          <Button onClick={() => navigate("/auth")}>Sign In</Button>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card sticky top-0 z-50 border-b border-border">
        <div className="container py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-medium">Saved Items</span>
        </div>
      </header>

      <main className="container py-4">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-xl h-48 animate-pulse" />
            ))}
          </div>
        ) : savedListings && savedListings.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {savedListings.map((listing) => (
              <ListingCard 
                key={listing.id} 
                listing={{
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
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <Bookmark className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-medium text-foreground mb-2">No saved items yet</h2>
            <p className="text-muted-foreground text-center">
              When you save items, they will appear here so you can easily find them later.
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Saved;
