import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SensorCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  status: "normal" | "warning" | "critical";
  trend?: "up" | "down" | "stable";
  lastUpdate?: string;
}

export const SensorCard = ({
  title,
  value,
  unit,
  icon: Icon,
  status,
  lastUpdate,
}: SensorCardProps) => {
  const statusColors = {
    normal: "border-success/30 bg-success/5",
    warning: "border-warning/30 bg-warning/5",
    critical: "border-destructive/30 bg-destructive/5",
  };

  const statusDotColors = {
    normal: "bg-success",
    warning: "bg-warning",
    critical: "bg-destructive",
  };

  const statusText = {
    normal: "Normal",
    warning: "Warning",
    critical: "Critical",
  };

  return (
    <div className="card-glass card-glow p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-xl border", statusColors[status])}>
          <Icon className={cn("h-6 w-6", status === "normal" ? "text-success" : status === "warning" ? "text-warning" : "text-destructive")} />
        </div>
        <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-full", statusDotColors[status])} />
          <span className={cn("text-xs font-medium", status === "normal" ? "text-success" : status === "warning" ? "text-warning" : "text-destructive")}>
            {statusText[status]}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          <span className="text-lg text-muted-foreground">{unit}</span>
        </div>
      </div>

      {lastUpdate && (
        <p className="mt-4 text-xs text-muted-foreground">
          Updated {lastUpdate}
        </p>
      )}
    </div>
  );
};
