import { Wifi, WifiOff, Clock, Activity } from "lucide-react";

interface StatusOverviewProps {
  isOnline: boolean;
  lastSync: string;
  uptime: string;
}

export const StatusOverview = ({ isOnline, lastSync, uptime }: StatusOverviewProps) => {
  return (
    <div className="card-glass p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isOnline ? (
              <Wifi className="h-5 w-5 text-success" />
            ) : (
              <WifiOff className="h-5 w-5 text-destructive" />
            )}
            <span className="text-sm text-muted-foreground">ESP32 Status</span>
          </div>
          <span className={`text-sm font-medium ${isOnline ? "text-success" : "text-destructive"}`}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Last Sync</span>
          </div>
          <span className="text-sm font-medium text-foreground">{lastSync}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-accent" />
            <span className="text-sm text-muted-foreground">Uptime</span>
          </div>
          <span className="text-sm font-medium text-foreground">{uptime}</span>
        </div>
      </div>
    </div>
  );
};
