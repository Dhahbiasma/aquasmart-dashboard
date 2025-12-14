import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Plus, Edit2, Trash2, Droplets, Filter, Fish, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface MaintenanceEntry {
  id: string;
  date: string;
  action: "water_change" | "filter_cleaning" | "feeding" | "other";
  notes: string;
}

const actionLabels = {
  water_change: "Water Change",
  filter_cleaning: "Filter Cleaning",
  feeding: "Feeding",
  other: "Other",
};

const actionIcons = {
  water_change: Droplets,
  filter_cleaning: Filter,
  feeding: Fish,
  other: Calendar,
};

const initialEntries: MaintenanceEntry[] = [
  { id: "1", date: "2025-12-14", action: "feeding", notes: "Morning feeding - 2g flakes" },
  { id: "2", date: "2025-12-13", action: "water_change", notes: "Changed 25% of water" },
  { id: "3", date: "2025-12-10", action: "filter_cleaning", notes: "Cleaned filter media" },
  { id: "4", date: "2025-12-08", action: "feeding", notes: "Evening feeding - bloodworms" },
  { id: "5", date: "2025-12-05", action: "water_change", notes: "Changed 30% of water, added conditioner" },
];

const Maintenance = () => {
  const [entries, setEntries] = useState(initialEntries);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<MaintenanceEntry | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    action: "water_change" as MaintenanceEntry["action"],
    notes: "",
  });

  const handleSubmit = () => {
    if (editingEntry) {
      setEntries(prev => prev.map(e => 
        e.id === editingEntry.id 
          ? { ...e, ...formData }
          : e
      ));
      toast.success("Entry updated successfully");
    } else {
      const newEntry: MaintenanceEntry = {
        id: Date.now().toString(),
        ...formData,
      };
      setEntries(prev => [newEntry, ...prev]);
      toast.success("Entry added successfully");
    }
    
    setIsDialogOpen(false);
    setEditingEntry(null);
    setFormData({ date: new Date().toISOString().split('T')[0], action: "water_change", notes: "" });
  };

  const handleEdit = (entry: MaintenanceEntry) => {
    setEditingEntry(entry);
    setFormData({ date: entry.date, action: entry.action, notes: entry.notes });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
    toast.success("Entry deleted");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Maintenance Log</h1>
            <p className="text-muted-foreground mt-1">Track aquarium maintenance activities</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">
                  {editingEntry ? "Edit Entry" : "Add Maintenance Entry"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm text-muted-foreground">Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="mt-1 bg-secondary/50 border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Action</label>
                  <Select
                    value={formData.action}
                    onValueChange={(value: MaintenanceEntry["action"]) => 
                      setFormData(prev => ({ ...prev, action: value }))
                    }
                  >
                    <SelectTrigger className="mt-1 bg-secondary/50 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="water_change">Water Change</SelectItem>
                      <SelectItem value="filter_cleaning">Filter Cleaning</SelectItem>
                      <SelectItem value="feeding">Feeding</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Notes</label>
                  <Input
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Add notes..."
                    className="mt-1 bg-secondary/50 border-border"
                  />
                </div>
                <Button onClick={handleSubmit} className="w-full">
                  {editingEntry ? "Update Entry" : "Add Entry"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          {Object.entries(actionLabels).map(([key, label]) => {
            const Icon = actionIcons[key as keyof typeof actionIcons];
            const count = entries.filter(e => e.action === key).length;
            return (
              <div key={key} className="card-glass p-4 text-center">
                <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-foreground">{count}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            );
          })}
        </div>

        {/* Log Table */}
        <div className="card-glass overflow-hidden animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Action</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Notes</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => {
                  const Icon = actionIcons[entry.action];
                  return (
                    <tr 
                      key={entry.id} 
                      className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                    >
                      <td className="p-4">
                        <span className="text-foreground">{formatDate(entry.date)}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-primary" />
                          <span className="text-foreground">{actionLabels[entry.action]}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-muted-foreground">{entry.notes}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(entry)}
                            className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="p-2 hover:bg-destructive/20 rounded-lg transition-colors text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Maintenance;
