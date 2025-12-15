import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/BottomNav";

const Messages = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary sticky top-0 z-50">
        <div className="container py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <Input 
              placeholder="Search here" 
              className="bg-card border-0 pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <button className="p-2 text-primary-foreground">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="relative mb-6">
          <svg width="200" height="120" viewBox="0 0 200 120" className="text-primary/20">
            <path d="M20 60 Q50 20 100 40 T180 50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
            <polygon points="180,45 200,50 180,55" fill="currentColor" className="text-primary/40" />
            <circle cx="30" cy="30" r="20" fill="currentColor" className="text-primary/10" />
            <circle cx="160" cy="80" r="15" fill="currentColor" className="text-primary/10" />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-primary/10 rounded-lg transform rotate-12 flex items-center justify-center">
              <span className="text-3xl">✈️</span>
            </div>
          </div>
        </div>
        <p className="text-lg text-foreground text-center">
          There are no adverts yet. Create new one now!
        </p>
      </div>

      {/* Help FAB */}
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center">
        <span className="text-2xl">❓</span>
      </button>

      <BottomNav />
    </div>
  );
};

export default Messages;
