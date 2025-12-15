import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Bookmark, MapPin, Phone, MessageCircle, ChevronRight, Flag, AlertCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useListing } from "@/hooks/useListings";
import { useIsSaved, useToggleSave } from "@/hooks/useSavedListings";
import { useAuth } from "@/contexts/AuthContext";
import { BottomNav } from "@/components/BottomNav";
import { formatPrice } from "@/data/listings";
import { toast } from "sonner";

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: listing, isLoading } = useListing(id || "");
  const { data: isSaved } = useIsSaved(id || "");
  const toggleSave = useToggleSave();

  const handleSave = () => {
    if (!user) {
      toast.error("Please sign in to save items");
      navigate("/auth");
      return;
    }
    toggleSave.mutate({ listingId: id!, isSaved: !!isSaved });
  };

  const quickMessages = ["Make an offer", "Is this available", "Last price"];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Listing not found</p>
      </div>
    );
  }

  const mainImage = listing.images?.[0] || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop";

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card sticky top-0 z-50 border-b border-border">
        <div className="container py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-medium">Details</span>
          <div className="flex items-center gap-2">
            <button className="p-2">
              <Share2 className="w-5 h-5" />
            </button>
            <button onClick={handleSave} className="p-2 relative">
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-destructive text-destructive' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <div className="relative aspect-square bg-muted">
        <img src={mainImage} alt={listing.title} className="w-full h-full object-cover" />
        {listing.images && listing.images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-foreground/80 text-card px-3 py-1 rounded-full text-sm">
            📷 1/{listing.images.length}
          </div>
        )}
      </div>

      <div className="bg-card">
        <div className="container py-4 border-b border-border">
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="w-4 h-4" />
            <span>{listing.location}, {listing.region}</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-3">{listing.title}</h1>
          <p className="text-2xl font-bold text-price">{formatPrice(listing.price, listing.currency)}</p>
        </div>

        <div className="container py-4 border-b border-border">
          <div className="flex gap-3">
            <Button variant="primary-outline" className="flex-1">Request call back</Button>
            <Button variant="default" className="flex-1 gap-2">
              <Phone className="w-4 h-4" />
              {listing.phone || "Show contact"}
            </Button>
          </div>
        </div>

        {listing.description && (
          <div className="container py-4 border-b border-border">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{listing.description}</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ListingDetail;
