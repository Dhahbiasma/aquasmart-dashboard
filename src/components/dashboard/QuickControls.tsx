import { useState } from "react";
import { Power, Lightbulb, Fan, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface ControlItemProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onToggle: () => void;
}

const ControlItem = ({ icon: Icon, label, isActive, onToggle }: ControlItemProps) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50">
    <div className="flex items-center gap-3">
      <div className={cn(
        "p-2 rounded-lg transition-colors",
        isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
      )}>
        <Icon className="h-5 w-5" />
      </div>
      <span className="font-medium text-foreground">{label}</span>
    </div>
    <Switch checked={isActive} onCheckedChange={onToggle} />
  </div>
);

export const QuickControls = () => {
  const [controls, setControls] = useState({
    heater: true,
    light: true,
    filter: true,
  });

  const handleToggle = (key: keyof typeof controls) => {
    setControls(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} ${newState[key] ? 'activated' : 'deactivated'}`);
      return newState;
    });
  };

  return (
    <div className="card-glass p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Controls</h3>
      
      <div className="space-y-3">
        <ControlItem
          icon={Thermometer}
          label="Heater"
          isActive={controls.heater}
          onToggle={() => handleToggle("heater")}
        />
        <ControlItem
          icon={Lightbulb}
          label="Lighting"
          isActive={controls.light}
          onToggle={() => handleToggle("light")}
        />
        <ControlItem
          icon={Fan}
          label="Filtration"
          isActive={controls.filter}
          onToggle={() => handleToggle("filter")}
        />
      </div>
    </div>
  );
};
