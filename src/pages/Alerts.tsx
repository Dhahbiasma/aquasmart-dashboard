import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AlertTriangle, AlertCircle, CheckCircle, Bell, BellOff, Trash2, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Alert {
  id: string;
  type: "success" | "warning" | "error";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialAlerts: Alert[] = [
  { id: "1", type: "success", title: "Temperature Stable", message: "Water temperature has been stable at 25°C for the past 24 hours.", time: "2 min ago", read: false },
  { id: "2", type: "warning", title: "Low Water Level", message: "Water level is at 78%. Consider refilling soon.", time: "15 min ago", read: false },
  { id: "3", type: "error", title: "Heater Maintenance Required", message: "Heater efficiency has dropped. Schedule maintenance.", time: "1 hour ago", read: true },
  { id: "4", type: "success", title: "Filter Cleaned", message: "Filtration system is running at optimal capacity.", time: "3 hours ago", read: true },
  { id: "5", type: "warning", title: "Light Schedule Changed", message: "Lighting schedule was automatically adjusted.", time: "5 hours ago", read: true },
];

const Alerts = () => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filterType, setFilterType] = useState<"all" | "unread">("all");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const filteredAlerts = filterType === "unread" 
    ? alerts.filter(a => !a.read) 
    : alerts;

  const unreadCount = alerts.filter(a => !a.read).length;

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "success": return <CheckCircle className="h-5 w-5 text-success" />;
      case "warning": return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "error": return <AlertCircle className="h-5 w-5 text-destructive" />;
    }
  };

  const getAlertStyles = (type: Alert["type"], read: boolean) => {
    const base = read ? "opacity-60" : "";
    switch (type) {
      case "success": return cn("border-success/30 bg-success/5", base);
      case "warning": return cn("border-warning/30 bg-warning/5", base);
      case "error": return cn("border-destructive/30 bg-destructive/5", base);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
            <p className="text-muted-foreground mt-1">
              {unreadCount > 0 ? `${unreadCount} unread alerts` : "All caught up!"}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {notificationsEnabled ? <Bell className="h-5 w-5 text-primary" /> : <BellOff className="h-5 w-5 text-muted-foreground" />}
              <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
            </div>
          </div>
        </div>

        {/* Notification Settings Card */}
        <div className="card-glass p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Notification Channels</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <span className="text-sm text-foreground">In-App</span>
              <div className="h-2 w-2 rounded-full bg-success" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <span className="text-sm text-foreground">Telegram</span>
              <div className="h-2 w-2 rounded-full bg-success" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <span className="text-sm text-foreground">Email</span>
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Filter and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="flex gap-2 bg-secondary/50 p-1 rounded-lg">
            <button
              onClick={() => setFilterType("all")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                filterType === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("unread")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                filterType === "unread" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Unread
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-destructive text-destructive-foreground">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
          
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark all as read
          </Button>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="card-glass p-12 text-center animate-fade-in">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-success/50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">All Clear!</h3>
              <p className="text-muted-foreground">No {filterType === "unread" ? "unread " : ""}alerts at the moment.</p>
            </div>
          ) : (
            filteredAlerts.map((alert, index) => (
              <div
                key={alert.id}
                onClick={() => markAsRead(alert.id)}
                className={cn(
                  "card-glass p-6 border cursor-pointer transition-all hover:scale-[1.01] animate-fade-in",
                  getAlertStyles(alert.type, alert.read)
                )}
                style={{ animationDelay: `${300 + index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className={cn(
                          "font-semibold text-foreground",
                          !alert.read && "flex items-center gap-2"
                        )}>
                          {alert.title}
                          {!alert.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteAlert(alert.id); }}
                        className="p-2 hover:bg-destructive/20 rounded-lg transition-colors text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Alerts;
