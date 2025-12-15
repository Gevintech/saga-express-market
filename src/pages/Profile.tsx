import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, DollarSign, FileText, Bell, Users, MessageCircle, HelpCircle, LogOut, User as UserIcon } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  const menuItems = [
    { icon: DollarSign, label: "Make money", color: "text-yellow-500", path: "#" },
    { icon: FileText, label: "My adverts", path: "/my-adverts" },
    { icon: Bell, label: "Notifications", path: "#" },
    { icon: Users, label: "Followers", path: "#" },
    { icon: MessageCircle, label: "Feedback", path: "#" },
    { icon: HelpCircle, label: "FAQ", path: "#" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <header className="bg-card border-b border-border">
          <div className="container py-3 flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <span className="font-medium">Profile</span>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
            <UserIcon className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-medium text-foreground mb-2">Sign in to your account</h2>
          <p className="text-muted-foreground text-center mb-6">
            Access your profile, manage your ads, and more.
          </p>
          <Button onClick={() => navigate("/auth")} size="lg">
            Sign In / Sign Up
          </Button>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-medium">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <span className="font-medium block">{user.user_metadata?.full_name || "User"}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
          <button onClick={() => navigate('/settings')} className="flex items-center gap-1 text-muted-foreground">
            <span className="text-sm">SETTINGS</span>
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Menu Grid */}
      <div className="container py-4">
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => item.path !== "#" && navigate(item.path)}
                className="bg-card rounded-xl p-4 flex items-center gap-3 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <Icon className={`w-6 h-6 ${item.color || 'text-foreground'}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sign Out */}
        <button
          onClick={signOut}
          className="w-full mt-4 bg-card rounded-xl p-4 flex items-center gap-3 shadow-card hover:shadow-card-hover transition-shadow text-destructive"
        >
          <LogOut className="w-6 h-6" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
