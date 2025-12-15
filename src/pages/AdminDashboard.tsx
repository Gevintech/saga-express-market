import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Pin, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsAdmin, useAllListingsAdmin, useApproveListing, useDeleteListingAdmin } from "@/hooks/useAdmin";
import { formatPrice } from "@/data/listings";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();
  const { data: listings, isLoading } = useAllListingsAdmin();
  const approveListing = useApproveListing();
  const deleteListing = useDeleteListingAdmin();

  if (checkingAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold text-foreground mb-2">Access Denied</h1>
        <p className="text-muted-foreground text-center mb-4">
          You don't have permission to access this page.
        </p>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary sticky top-0 z-50">
        <div className="container py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-primary-foreground">Admin Dashboard</h1>
        </div>
      </header>

      <main className="container py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">All Listings ({listings?.length || 0})</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : listings?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No listings found
          </div>
        ) : (
          <div className="space-y-4">
            {listings?.map((listing: any) => (
              <div key={listing.id} className="bg-card rounded-xl p-4 shadow-card">
                <div className="flex gap-3">
                  <img
                    src={listing.images?.[0] || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{listing.title}</h3>
                    <p className="text-price font-bold">{formatPrice(listing.price)}</p>
                    <p className="text-xs text-muted-foreground">
                      By: {listing.profiles?.full_name || listing.profiles?.email || "Unknown"}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {listing.is_promoted && (
                        <Badge variant="secondary" className="text-xs">Promoted</Badge>
                      )}
                      {listing.is_featured && (
                        <Badge variant="secondary" className="text-xs">Featured</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-3 flex-wrap">
                  <Button
                    size="sm"
                    variant={listing.is_promoted ? "default" : "outline"}
                    onClick={() => approveListing.mutate({ 
                      id: listing.id, 
                      is_promoted: !listing.is_promoted 
                    })}
                    disabled={approveListing.isPending}
                  >
                    <Star className="w-4 h-4 mr-1" />
                    {listing.is_promoted ? "Unpromote" : "Promote"}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant={listing.is_featured ? "default" : "outline"}
                    onClick={() => approveListing.mutate({ 
                      id: listing.id, 
                      is_featured: !listing.is_featured 
                    })}
                    disabled={approveListing.isPending}
                  >
                    <Pin className="w-4 h-4 mr-1" />
                    {listing.is_featured ? "Unpin" : "Pin"}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (confirm("Delete this listing?")) {
                        deleteListing.mutate(listing.id);
                      }
                    }}
                    disabled={deleteListing.isPending}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Admin Help */}
        <div className="mt-8 p-4 bg-muted rounded-xl">
          <p className="text-sm font-medium mb-2">Admin Controls:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• <strong>Promote</strong>: Mark listing as paid promotion</li>
            <li>• <strong>Pin</strong>: Feature listing at the top</li>
            <li>• <strong>Delete</strong>: Remove listing permanently</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
