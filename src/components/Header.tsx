import { Search, User, MessageSquare, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-primary sticky top-0 z-50">
      <div className="container py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold text-primary-foreground tracking-tight">
              Saga Express
            </h1>
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            <Link to="/messages">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-primary-foreground/90 text-sm mb-2">What are you looking for?</p>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              className="flex-shrink-0 bg-card text-foreground hover:bg-card/90 gap-1 px-3"
            >
              All Uganda
              <ChevronDown className="h-4 w-4" />
            </Button>
            <div className="relative flex-1">
              <Input 
                placeholder="I am looking for..." 
                className="bg-card border-0 pr-10 h-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
