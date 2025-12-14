import { AlertTriangle, AlertCircle, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Alert {
  id: string;
  type: "success" | "warning" | "error";
  message: string;
  time: string;
}

const initialAlerts: Alert[] = [
  { id: "1", type: "success", message: "Water temperature stable at 25°C", time: "2 min ago" },
  { id: "2", type: "warning", message: "Water level slightly low", time: "15 min ago" },
  { id: "3", type: "error", message: "Heater requires maintenance", time: "1 hour ago" },
];

export const AlertsList = () => {
  const [alerts, setAlerts] = useState(initialAlerts);

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
    }
  };

  const getAlertStyles = (type: Alert["type"]) => {
    switch (type) {
      case "success":
        return "border-success/30 bg-success/5";
      case "warning":
        return "border-warning/30 bg-warning/5";
      case "error":
        return "border-destructive/30 bg-destructive/5";
    }
  };

  return (
    <div className="card-glass p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
        <span className="text-xs text-muted-foreground">{alerts.length} alerts</span>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-success/50" />
            <p>All systems running smoothly</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl border transition-all",
                getAlertStyles(alert.type)
              )}
            >
              {getAlertIcon(alert.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
              </div>
              <button
                onClick={() => dismissAlert(alert.id)}
                className="p-1 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
