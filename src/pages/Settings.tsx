import { MainLayout } from "@/components/layout/MainLayout";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Wifi, Shield, Globe, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    telegramAlerts: true,
    emailAlerts: false,
    autoMode: true,
    tempWarningThreshold: "28",
    tempCriticalThreshold: "30",
    waterLevelWarning: "20",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <MainLayout>
      <div className="space-y-8 max-w-3xl">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your AquaSmart system</p>
        </div>

        {/* Notifications */}
        <div className="card-glass p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
              </div>
              <Switch 
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifications: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground">Telegram Alerts</p>
                <p className="text-sm text-muted-foreground">Get alerts via Telegram bot</p>
              </div>
              <Switch 
                checked={settings.telegramAlerts}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, telegramAlerts: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email summaries</p>
              </div>
              <Switch 
                checked={settings.emailAlerts}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailAlerts: checked }))}
              />
            </div>
          </div>
        </div>

        {/* Thresholds */}
        <div className="card-glass p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Alert Thresholds</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-muted-foreground">Temperature Warning (°C)</label>
              <Input
                type="number"
                value={settings.tempWarningThreshold}
                onChange={(e) => setSettings(prev => ({ ...prev, tempWarningThreshold: e.target.value }))}
                className="mt-1 bg-secondary/50 border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Temperature Critical (°C)</label>
              <Input
                type="number"
                value={settings.tempCriticalThreshold}
                onChange={(e) => setSettings(prev => ({ ...prev, tempCriticalThreshold: e.target.value }))}
                className="mt-1 bg-secondary/50 border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Water Level Warning (%)</label>
              <Input
                type="number"
                value={settings.waterLevelWarning}
                onChange={(e) => setSettings(prev => ({ ...prev, waterLevelWarning: e.target.value }))}
                className="mt-1 bg-secondary/50 border-border"
              />
            </div>
          </div>
        </div>

        {/* Device */}
        <div className="card-glass p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center gap-3 mb-6">
            <Wifi className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Device Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground">Auto Mode</p>
                <p className="text-sm text-muted-foreground">Automatically adjust settings based on conditions</p>
              </div>
              <Switch 
                checked={settings.autoMode}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoMode: checked }))}
              />
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="card-glass p-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Language</h3>
          </div>
          
          <div className="flex gap-3">
            <Button variant="default" size="sm">English</Button>
            <Button variant="outline" size="sm">Français</Button>
          </div>
        </div>

        {/* Save Button */}
        <div className="animate-fade-in" style={{ animationDelay: "500ms" }}>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
