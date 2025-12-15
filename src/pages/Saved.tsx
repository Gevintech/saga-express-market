import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

const Saved = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card sticky top-0 z-50 border-b border-border">
        <div className="container py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-medium">Saved Items</span>
        </div>
      </header>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
          <Bookmark className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-medium text-foreground mb-2">No saved items yet</h2>
        <p className="text-muted-foreground text-center">
          When you save items, they will appear here so you can easily find them later.
        </p>
      </div>

      <BottomNav />
    </div>
  );
};

export default Saved;
