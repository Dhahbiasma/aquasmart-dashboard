import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "00:00", temp: 24.5 },
  { time: "04:00", temp: 24.2 },
  { time: "08:00", temp: 24.8 },
  { time: "12:00", temp: 25.1 },
  { time: "16:00", temp: 25.3 },
  { time: "20:00", temp: 25.0 },
  { time: "Now", temp: 25.2 },
];

export const TemperatureChart = () => {
  return (
    <div className="card-glass p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Temperature (24h)</h3>
      
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(185, 75%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(185, 75%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 30%, 22%)" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(200, 15%, 60%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(200, 15%, 60%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[23, 27]}
              tickFormatter={(value) => `${value}°`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(210, 45%, 12%)",
                border: "1px solid hsl(210, 30%, 22%)",
                borderRadius: "8px",
                color: "hsl(200, 20%, 95%)",
              }}
              formatter={(value: number) => [`${value}°C`, "Temperature"]}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="hsl(185, 75%, 45%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#tempGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
