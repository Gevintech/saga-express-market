import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Bookmark, MapPin, Phone, MessageCircle, ChevronRight, Flag, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { listings, formatPrice } from "@/data/listings";
import { BottomNav } from "@/components/BottomNav";

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === id);

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Listing not found</p>
      </div>
    );
  }

  const quickMessages = ["Make an offer", "Is this available", "Last price"];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card sticky top-0 z-50 border-b border-border">
        <div className="container py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-medium">Home page</span>
          <div className="flex items-center gap-2">
            <button className="p-2">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 relative">
              <Bookmark className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </button>
          </div>
        </div>
      </header>

      {/* Image */}
      <div className="relative aspect-square bg-muted">
        <img 
          src={listing.image} 
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-foreground/80 text-card px-3 py-1 rounded-full text-sm flex items-center gap-1">
          📷 1/2
        </div>
      </div>

      {/* Details */}
      <div className="bg-card">
        <div className="container py-4 border-b border-border">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{listing.location}, {listing.region}, {listing.postedAt}</span>
            </div>
            {listing.isPromoted && (
              <Badge variant="secondary">Promoted</Badge>
            )}
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-3">{listing.title}</h1>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-price">{formatPrice(listing.price, listing.currency)}</p>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Price History <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="container py-4 border-b border-border">
          <div className="flex gap-3">
            <Button variant="primary-outline" className="flex-1">
              Request call back
            </Button>
            <Button variant="default" className="flex-1 gap-2">
              <Phone className="w-4 h-4" />
              Show contact
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-3 text-center">
            Market price: USh 800 K ~ 850 K
          </p>
        </div>

        {/* Chat Section */}
        <div className="container py-4 border-b border-border">
          <h3 className="font-medium mb-3">Chat with the seller</h3>
          <div className="flex gap-2 flex-wrap mb-3">
            {quickMessages.map((msg) => (
              <Button key={msg} variant="outline" size="sm" className="text-primary border-primary">
                {msg}
              </Button>
            ))}
          </div>
          <Input placeholder="Type a message" className="mb-3" />
          <Button variant="accent" className="w-full" disabled>
            Start chat
          </Button>
        </div>

        {/* Specs */}
        {listing.specs && (
          <div className="container py-4 border-b border-border">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(listing.specs).map(([key, value]) => (
                <div key={key}>
                  <p className="text-foreground font-medium">{value}</p>
                  <p className="text-xs text-primary uppercase">{key}</p>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-primary">
              Show more <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Description */}
        {listing.description && (
          <div className="container py-4 border-b border-border">
            <p className="text-muted-foreground">{listing.description}</p>
          </div>
        )}

        {/* Seller */}
        {listing.seller && (
          <div className="container py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <span className="text-lg">🏪</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{listing.seller.name}</span>
                  <span className="text-primary">• {listing.seller.adsCount} Ads</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  ✉️ Typically replies {listing.seller.responseTime} {listing.seller.verified && "✓ verified"}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="container py-4">
          <div className="flex gap-3">
            <Button variant="primary-outline" className="flex-1">
              Mark unavailable
            </Button>
            <Button variant="outline" className="flex-1 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground gap-2">
              <Flag className="w-4 h-4" />
              Report Abuse
            </Button>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="container py-4 text-center">
          <Button variant="ghost" className="text-muted-foreground gap-2">
            <AlertCircle className="w-4 h-4" />
            Safety tips
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ListingDetail;
