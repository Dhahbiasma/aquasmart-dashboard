import { Thermometer, Lightbulb, Fan, Droplets } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SensorCard } from "@/components/dashboard/SensorCard";
import { StatusOverview } from "@/components/dashboard/StatusOverview";
import { QuickControls } from "@/components/dashboard/QuickControls";
import { AlertsList } from "@/components/dashboard/AlertsList";
import { TemperatureChart } from "@/components/dashboard/TemperatureChart";

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor your aquarium in real-time</p>
        </div>

        {/* Sensor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <SensorCard
              title="Water Temperature"
              value={25.2}
              unit="°C"
              icon={Thermometer}
              status="normal"
              lastUpdate="Just now"
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
            <SensorCard
              title="Lighting"
              value="ON"
              unit="85%"
              icon={Lightbulb}
              status="normal"
              lastUpdate="2 min ago"
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <SensorCard
              title="Filtration"
              value="Active"
              unit=""
              icon={Fan}
              status="normal"
              lastUpdate="5 min ago"
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "250ms" }}>
            <SensorCard
              title="Water Level"
              value={78}
              unit="%"
              icon={Droplets}
              status="warning"
              lastUpdate="10 min ago"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Chart */}
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <TemperatureChart />
          </div>

          {/* Right Column - Status */}
          <div className="animate-fade-in" style={{ animationDelay: "350ms" }}>
            <StatusOverview
              isOnline={true}
              lastSync="Just now"
              uptime="14d 6h 32m"
            />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <QuickControls />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "450ms" }}>
            <AlertsList />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
