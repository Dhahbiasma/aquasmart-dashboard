import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts";
import { cn } from "@/lib/utils";

const temperatureData = [
  { time: "00:00", value: 24.5 },
  { time: "02:00", value: 24.3 },
  { time: "04:00", value: 24.2 },
  { time: "06:00", value: 24.4 },
  { time: "08:00", value: 24.8 },
  { time: "10:00", value: 25.0 },
  { time: "12:00", value: 25.1 },
  { time: "14:00", value: 25.2 },
  { time: "16:00", value: 25.3 },
  { time: "18:00", value: 25.1 },
  { time: "20:00", value: 25.0 },
  { time: "22:00", value: 24.8 },
];

const lightingData = [
  { time: "00:00", intensity: 0 },
  { time: "04:00", intensity: 0 },
  { time: "06:00", intensity: 30 },
  { time: "08:00", intensity: 70 },
  { time: "10:00", intensity: 100 },
  { time: "12:00", intensity: 100 },
  { time: "14:00", intensity: 100 },
  { time: "16:00", intensity: 80 },
  { time: "18:00", intensity: 50 },
  { time: "20:00", intensity: 20 },
  { time: "22:00", intensity: 0 },
];

const filtrationData = [
  { day: "Mon", runtime: 22.5 },
  { day: "Tue", runtime: 23.0 },
  { day: "Wed", runtime: 24.0 },
  { day: "Thu", runtime: 23.5 },
  { day: "Fri", runtime: 22.0 },
  { day: "Sat", runtime: 24.0 },
  { day: "Sun", runtime: 23.8 },
];

const timeFilters = ["Last Hour", "Last Day", "Last Week"];

const Charts = () => {
  const [activeFilter, setActiveFilter] = useState("Last Day");

  const chartTooltipStyle = {
    backgroundColor: "hsl(210, 45%, 12%)",
    border: "1px solid hsl(210, 30%, 22%)",
    borderRadius: "8px",
    color: "hsl(200, 20%, 95%)",
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Live Charts</h1>
            <p className="text-muted-foreground mt-1">Historical sensor data visualization</p>
          </div>
          
          {/* Time Filter */}
          <div className="flex gap-2 bg-secondary/50 p-1 rounded-lg">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Temperature Chart */}
        <div className="card-glass p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h3 className="text-lg font-semibold text-foreground mb-6">Water Temperature</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={temperatureData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(185, 75%, 45%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(185, 75%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 30%, 22%)" />
                <XAxis dataKey="time" stroke="hsl(200, 15%, 60%)" fontSize={12} />
                <YAxis stroke="hsl(200, 15%, 60%)" fontSize={12} domain={[23, 27]} tickFormatter={(v) => `${v}°C`} />
                <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value}°C`, "Temperature"]} />
                <Area type="monotone" dataKey="value" stroke="hsl(185, 75%, 45%)" strokeWidth={2} fill="url(#tempGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lighting Chart */}
          <div className="card-glass p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h3 className="text-lg font-semibold text-foreground mb-6">Lighting Intensity</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lightingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 30%, 22%)" />
                  <XAxis dataKey="time" stroke="hsl(200, 15%, 60%)" fontSize={12} />
                  <YAxis stroke="hsl(200, 15%, 60%)" fontSize={12} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value}%`, "Intensity"]} />
                  <Line type="stepAfter" dataKey="intensity" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Filtration Chart */}
          <div className="card-glass p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h3 className="text-lg font-semibold text-foreground mb-6">Filtration Runtime (Hours/Day)</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filtrationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 30%, 22%)" />
                  <XAxis dataKey="day" stroke="hsl(200, 15%, 60%)" fontSize={12} />
                  <YAxis stroke="hsl(200, 15%, 60%)" fontSize={12} domain={[0, 24]} tickFormatter={(v) => `${v}h`} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value} hours`, "Runtime"]} />
                  <Bar dataKey="runtime" fill="hsl(175, 65%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Charts;
