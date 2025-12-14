import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Thermometer, Lightbulb, Fan, Power } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ControlCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  isActive: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

const ControlCard = ({ title, description, icon: Icon, isActive, onToggle, children }: ControlCardProps) => (
  <div className={cn(
    "card-glass p-6 transition-all duration-300",
    isActive && "ring-1 ring-primary/50"
  )}>
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className={cn(
          "p-3 rounded-xl transition-colors",
          isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
        )}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={cn(
          "text-sm font-medium",
          isActive ? "text-success" : "text-muted-foreground"
        )}>
          {isActive ? "ON" : "OFF"}
        </span>
        <Switch checked={isActive} onCheckedChange={onToggle} />
      </div>
    </div>
    {children}
  </div>
);

const Controls = () => {
  const [heaterOn, setHeaterOn] = useState(true);
  const [lightOn, setLightOn] = useState(true);
  const [filterOn, setFilterOn] = useState(true);
  const [targetTemp, setTargetTemp] = useState([25]);
  const [lightIntensity, setLightIntensity] = useState([85]);

  const handleToggle = (name: string, setter: React.Dispatch<React.SetStateAction<boolean>>, currentValue: boolean) => {
    setter(!currentValue);
    toast.success(`${name} ${!currentValue ? 'activated' : 'deactivated'}`);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Control Panel</h1>
          <p className="text-muted-foreground mt-1">Manage your aquarium devices</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Heater Control */}
          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <ControlCard
              title="Heater"
              description="Maintain optimal water temperature"
              icon={Thermometer}
              isActive={heaterOn}
              onToggle={() => handleToggle("Heater", setHeaterOn, heaterOn)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Target Temperature</span>
                  <span className="text-lg font-semibold text-primary">{targetTemp[0]}°C</span>
                </div>
                <Slider
                  value={targetTemp}
                  onValueChange={setTargetTemp}
                  min={20}
                  max={30}
                  step={0.5}
                  disabled={!heaterOn}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>20°C</span>
                  <span>25°C</span>
                  <span>30°C</span>
                </div>
              </div>
            </ControlCard>
          </div>

          {/* Lighting Control */}
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <ControlCard
              title="Lighting"
              description="Control aquarium illumination"
              icon={Lightbulb}
              isActive={lightOn}
              onToggle={() => handleToggle("Lighting", setLightOn, lightOn)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Light Intensity</span>
                  <span className="text-lg font-semibold text-warning">{lightIntensity[0]}%</span>
                </div>
                <Slider
                  value={lightIntensity}
                  onValueChange={setLightIntensity}
                  min={0}
                  max={100}
                  step={5}
                  disabled={!lightOn}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Off</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </ControlCard>
          </div>

          {/* Filtration Control */}
          <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <ControlCard
              title="Filtration System"
              description="Keep water clean and oxygenated"
              icon={Fan}
              isActive={filterOn}
              onToggle={() => handleToggle("Filtration", setFilterOn, filterOn)}
            >
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-xs text-muted-foreground">Flow Rate</p>
                  <p className="text-lg font-semibold text-foreground">500 L/h</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-xs text-muted-foreground">Runtime</p>
                  <p className="text-lg font-semibold text-foreground">23.5h</p>
                </div>
              </div>
            </ControlCard>
          </div>

          {/* Master Control */}
          <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="card-glass p-6 h-full flex flex-col justify-center">
              <div className="text-center">
                <div className="inline-flex p-6 rounded-full bg-secondary/50 mb-4">
                  <Power className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">System Status</h3>
                <p className="text-muted-foreground mb-6">All systems operating normally</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                    <div className="h-2 w-2 rounded-full bg-success mx-auto mb-2" />
                    <p className="text-xs text-success">Heater</p>
                  </div>
                  <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                    <div className="h-2 w-2 rounded-full bg-success mx-auto mb-2" />
                    <p className="text-xs text-success">Light</p>
                  </div>
                  <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                    <div className="h-2 w-2 rounded-full bg-success mx-auto mb-2" />
                    <p className="text-xs text-success">Filter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Controls;
