import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Wifi, WifiOff, Cpu, HardDrive, Thermometer, 
  Droplets, Lightbulb, Fan, Signal, Clock, RefreshCw 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface SensorRowProps {
  name: string;
  value: string;
  status: "online" | "offline" | "warning";
  icon: React.ElementType;
}

const SensorRow = ({ name, value, status, icon: Icon }: SensorRowProps) => (
  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50">
    <div className="flex items-center gap-3">
      <Icon className={cn(
        "h-5 w-5",
        status === "online" ? "text-success" : status === "warning" ? "text-warning" : "text-destructive"
      )} />
      <span className="text-foreground">{name}</span>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-foreground">{value}</span>
      <div className={cn(
        "h-2 w-2 rounded-full",
        status === "online" ? "bg-success" : status === "warning" ? "bg-warning" : "bg-destructive"
      )} />
    </div>
  </div>
);

const System = () => {
  const isOnline = true;

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">System Overview</h1>
            <p className="text-muted-foreground mt-1">ESP32 device and sensor status</p>
          </div>
          
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Device Status Card */}
        <div className="card-glass p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-4 rounded-xl",
                isOnline ? "bg-success/20" : "bg-destructive/20"
              )}>
                {isOnline ? (
                  <Wifi className="h-8 w-8 text-success" />
                ) : (
                  <WifiOff className="h-8 w-8 text-destructive" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">ESP32 DevKit</h3>
                <p className={cn(
                  "text-sm font-medium",
                  isOnline ? "text-success" : "text-destructive"
                )}>
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg bg-secondary/30">
                <Signal className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Signal</p>
                <p className="text-sm font-semibold text-foreground">-42 dBm</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/30">
                <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Uptime</p>
                <p className="text-sm font-semibold text-foreground">14d 6h</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/30">
                <Cpu className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">CPU</p>
                <p className="text-sm font-semibold text-foreground">12%</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/30">
                <HardDrive className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Memory</p>
                <p className="text-sm font-semibold text-foreground">34%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sensor Status */}
          <div className="card-glass p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Sensor Status</h3>
            <div className="space-y-3">
              <SensorRow name="Temperature Sensor" value="25.2°C" status="online" icon={Thermometer} />
              <SensorRow name="Water Level Sensor" value="78%" status="warning" icon={Droplets} />
              <SensorRow name="Light Sensor" value="85%" status="online" icon={Lightbulb} />
              <SensorRow name="Flow Sensor" value="500 L/h" status="online" icon={Fan} />
            </div>
          </div>

          {/* System Health */}
          <div className="card-glass p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h3 className="text-lg font-semibold text-foreground mb-4">System Health</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">CPU Usage</span>
                  <span className="text-foreground font-medium">12%</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Memory Usage</span>
                  <span className="text-foreground font-medium">34%</span>
                </div>
                <Progress value={34} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Storage</span>
                  <span className="text-foreground font-medium">18%</span>
                </div>
                <Progress value={18} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Network</span>
                  <span className="text-foreground font-medium">Excellent</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Last Sync */}
        <div className="card-glass p-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Last Synchronization</h3>
              <p className="text-sm text-muted-foreground mt-1">Data was last synced with the cloud</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">Just now</p>
              <p className="text-xs text-muted-foreground">Dec 14, 2025 at 10:32 AM</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default System;
