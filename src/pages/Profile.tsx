import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, DollarSign, FileText, Bell, Users, MessageCircle, HelpCircle, X } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: DollarSign, label: "Make money", color: "text-yellow-500" },
    { icon: FileText, label: "My adverts" },
    { icon: Bell, label: "Notifications" },
    { icon: Users, label: "Followers" },
    { icon: MessageCircle, label: "Feedback" },
    { icon: HelpCircle, label: "FAQ" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-primary">👤</span>
            </div>
            <span className="font-medium">User Name</span>
          </div>
          <button onClick={() => navigate('/settings')} className="flex items-center gap-1 text-muted-foreground">
            <span className="text-sm">SETTINGS</span>
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Advice Banner */}
      <div className="bg-accent">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <span className="text-accent-foreground font-medium">Advice</span>
            <span className="text-accent-foreground text-sm">hide 1</span>
          </div>
          <div className="bg-card rounded-lg mt-2 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              <span className="text-accent text-sm">Learn, how to create an effective ad</span>
            </div>
            <button>
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="container py-4">
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="bg-card rounded-xl p-4 flex items-center gap-3 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <Icon className={`w-6 h-6 ${item.color || 'text-foreground'}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
