import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, MapPin, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useListing } from "@/hooks/useListings";
import { useIsSaved, useToggleSave } from "@/hooks/useSavedListings";
import { useAuth } from "@/contexts/AuthContext";
import { BottomNav } from "@/components/BottomNav";
import { formatPrice, listings as mockListings } from "@/data/listings";
import { toast } from "sonner";

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: dbListing, isLoading } = useListing(id || "");
  const { data: isSaved } = useIsSaved(id || "");
  const toggleSave = useToggleSave();

  // Try database first, then fallback to mock listings
  const mockListing = mockListings.find(l => l.id === id);
  
  const listing = dbListing ? {
    ...dbListing,
    image: dbListing.images?.[0] || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    images: dbListing.images || [],
  } : mockListing ? {
    id: mockListing.id,
    title: mockListing.title,
    price: mockListing.price,
    currency: mockListing.currency,
    location: mockListing.location,
    region: mockListing.region,
    images: [mockListing.image],
    image: mockListing.image,
    category: mockListing.category,
    condition: mockListing.condition,
    description: mockListing.description || null,
    phone: null,
    is_promoted: mockListing.isPromoted || false,
    is_featured: mockListing.isFeatured || false,
    specs: mockListing.specs || null,
    seller: mockListing.seller || null,
  } : null;

  const handleSave = () => {
    if (!user) {
      toast.error("Please sign in to save items");
      navigate("/auth");
      return;
    }
    if (dbListing) {
      toggleSave.mutate({ listingId: id!, isSaved: !!isSaved });
    } else {
      toast.info("This is a demo listing");
    }
  };

  if (isLoading && !mockListing) {
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

  const mainImage = listing.images?.[0] || listing.image;

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
        {listing.is_promoted && (
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
            Promoted
          </Badge>
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
          {listing.condition && (
            <Badge variant="secondary" className="mt-2">{listing.condition}</Badge>
          )}
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

        {listing.specs && (
          <div className="container py-4 border-b border-border">
            <h3 className="font-medium mb-3">Specifications</h3>
            <div className="space-y-2">
              {Object.entries(listing.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-medium">{value as string}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {listing.seller && (
          <div className="container py-4">
            <h3 className="font-medium mb-3">Seller</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">{listing.seller.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-medium">{listing.seller.name}</p>
                <p className="text-sm text-muted-foreground">{listing.seller.adsCount} ads • {listing.seller.responseTime}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ListingDetail;
