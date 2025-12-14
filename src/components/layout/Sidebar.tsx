import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  LineChart, 
  Sliders, 
  Bell, 
  Server, 
  ClipboardList,
  Settings,
  Fish,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Live Charts", path: "/charts", icon: LineChart },
  { title: "Controls", path: "/controls", icon: Sliders },
  { title: "Alerts", path: "/alerts", icon: Bell },
  { title: "System", path: "/system", icon: Server },
  { title: "Maintenance", path: "/maintenance", icon: ClipboardList },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-20 items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Fish className="h-8 w-8 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-xl font-bold text-gradient">AquaSmart</h1>
              <p className="text-xs text-muted-foreground">IoT Dashboard</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                "hover:bg-sidebar-accent group",
                isActive && "bg-primary/10 border border-primary/30"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-primary" : "text-sidebar-foreground group-hover:text-primary"
                )}
              />
              {!collapsed && (
                <span
                  className={cn(
                    "font-medium transition-colors",
                    isActive ? "text-primary" : "text-sidebar-foreground"
                  )}
                >
                  {item.title}
                </span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto h-2 w-2 rounded-full bg-primary pulse-glow" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Settings at bottom */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <NavLink
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
            "hover:bg-sidebar-accent text-sidebar-foreground"
          )}
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span className="font-medium">Settings</span>}
        </NavLink>
      </div>
    </aside>
  );
};
