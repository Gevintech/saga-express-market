import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Plus, Edit, Trash2 } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useUserListings, useDeleteListing } from "@/hooks/useListings";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/listings";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MyAdverts = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: listings, isLoading } = useUserListings(user?.id || "");
  const deleteListing = useDeleteListing();

  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <header className="bg-card sticky top-0 z-50 border-b border-border">
          <div className="container py-3 flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-medium">My Adverts</span>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
            <FileText className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-medium text-foreground mb-2">Sign in to see your ads</h2>
          <p className="text-muted-foreground text-center mb-6">
            Manage your listings and track their performance.
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
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-medium">My Adverts</span>
          </div>
          <Button size="sm" onClick={() => navigate("/post-ad")}>
            <Plus className="w-4 h-4 mr-1" />
            New Ad
          </Button>
        </div>
      </header>

      <main className="container py-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl h-24 animate-pulse" />
            ))}
          </div>
        ) : listings && listings.length > 0 ? (
          <div className="space-y-3">
            {listings.map((listing) => (
              <div 
                key={listing.id} 
                className="bg-card rounded-xl p-3 flex gap-3 shadow-card"
              >
                <img 
                  src={listing.images?.[0] || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop"}
                  alt={listing.title}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                  <p className="text-price font-bold text-sm mt-1">
                    {formatPrice(listing.price, listing.currency)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {listing.location} • {new Date(listing.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => navigate(`/listing/${listing.id}`)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your listing.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteListing.mutate(listing.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileText className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-medium text-foreground mb-2">No adverts yet</h2>
            <p className="text-muted-foreground text-center mb-6">
              Start selling by posting your first ad.
            </p>
            <Button onClick={() => navigate("/post-ad")}>
              <Plus className="w-4 h-4 mr-2" />
              Post Your First Ad
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default MyAdverts;
