import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";

export default function Stats() {
  const stats = JSON.parse(localStorage.getItem("stats") || "{}");
  const played = stats.played || 0;
  const wins = stats.wins || 0;
  const winPercentage = played > 0 ? Math.round((wins / played) * 100) : 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <BarChart className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Statistics</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{played}</div>
            <div className="text-sm text-muted-foreground">Played</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{winPercentage}%</div>
            <div className="text-sm text-muted-foreground">Win Rate</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
