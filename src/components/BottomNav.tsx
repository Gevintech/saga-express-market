import { Home, Bookmark, PlusSquare, MessageCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", label: "Home", icon: Home, path: "/" },
  { id: "saved", label: "Saved", icon: Bookmark, path: "/saved" },
  { id: "sell", label: "Sell", icon: PlusSquare, path: "/post-ad" },
  { id: "messages", label: "Messages", icon: MessageCircle, path: "/messages" },
  { id: "profile", label: "Profile", icon: User, path: "/profile" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isSell = item.id === "sell";

          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
                isSell && "relative"
              )}
            >
              <div className={cn(
                "p-1 rounded-lg",
                isSell && "bg-primary text-primary-foreground"
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
