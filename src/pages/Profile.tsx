import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, FileText, Bell, Users, MessageCircle, HelpCircle, LogOut, User as UserIcon, Edit, Shield, Phone } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { useIsAdmin } from "@/hooks/useAdmin";
import { useUnreadCount } from "@/hooks/useNotifications";

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const { data: profile } = useProfile();
  const { data: isAdmin } = useIsAdmin();
  const { data: unreadCount } = useUnreadCount();

  const menuItems = [
    { icon: Edit, label: "Edit Profile", path: "/edit-profile", badge: 0 },
    { icon: FileText, label: "My adverts", path: "/my-adverts", badge: 0 },
    { icon: Bell, label: "Notifications", path: "/notifications", badge: unreadCount || 0 },
    { icon: Users, label: "Followers", path: "#", badge: 0 },
    { icon: MessageCircle, label: "Feedback", path: "#", badge: 0 },
    { icon: HelpCircle, label: "FAQ", path: "#", badge: 0 },
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
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-primary-foreground font-medium">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <span className="font-medium block">{profile?.full_name || user.user_metadata?.full_name || "User"}</span>
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
                className="bg-card rounded-xl p-4 flex items-center gap-3 shadow-card hover:shadow-card-hover transition-shadow relative"
              >
                <Icon className="w-6 h-6 text-foreground" />
                <span className="font-medium text-sm">{item.label}</span>
                {item.badge > 0 && (
                  <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Admin Dashboard Button */}
        {isAdmin && (
          <button
            onClick={() => navigate('/admin')}
            className="w-full mt-3 bg-primary rounded-xl p-4 flex items-center gap-3 shadow-card"
          >
            <Shield className="w-6 h-6 text-primary-foreground" />
            <span className="font-medium text-sm text-primary-foreground">Admin Dashboard</span>
          </button>
        )}

        {/* Sign Out */}
        <button
          onClick={signOut}
          className="w-full mt-3 bg-card rounded-xl p-4 flex items-center gap-3 shadow-card hover:shadow-card-hover transition-shadow text-destructive"
        >
          <LogOut className="w-6 h-6" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>

        {/* Customer Support */}
        <div className="mt-6 p-4 bg-muted rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">Customer Support</p>
          <a href="tel:+256755842484" className="flex items-center gap-2 text-primary font-medium">
            <Phone className="w-4 h-4" />
            +256 755 842 484
          </a>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
