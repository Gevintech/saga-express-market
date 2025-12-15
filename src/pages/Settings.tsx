import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, LogOut } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const navigate = useNavigate();

  const settingsGroups = [
    {
      items: [
        { label: "Personal details" },
        { label: "Business details", highlight: true },
      ]
    },
    {
      items: [
        { label: "Add phone number" },
        { label: "Change email" },
        { label: "Change language" },
      ]
    },
    {
      items: [
        { label: "Disable chats" },
        { label: "Disable Feedback" },
        { label: "Manage notifications" },
      ]
    },
    {
      items: [
        { label: "Change password" },
        { label: "Delete my account permanently", danger: true },
        { label: "Log out", icon: LogOut },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <span className="font-medium text-primary">Settings</span>
        </div>
      </header>

      <main>
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className="bg-card">
              {group.items.map((item, itemIndex) => (
                <div key={item.label}>
                  <button className="w-full container py-4 flex items-center justify-between">
                    <span className={item.danger ? "text-destructive" : "text-foreground"}>
                      {item.label}
                    </span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                  {itemIndex < group.items.length - 1 && (
                    <div className="container">
                      <Separator />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {groupIndex < settingsGroups.length - 1 && (
              <div className="h-3 bg-secondary" />
            )}
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;
