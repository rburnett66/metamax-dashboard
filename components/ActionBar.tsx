// components/ActionBar.tsx
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw, Download } from "lucide-react";

export function ActionBar() {
  return (
    <div className="border-t border-white/10 bg-[#0A0A0A] px-4 lg:px-6 py-3 flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" className="gap-2">
        <Pause className="h-4 w-4" />
        Pause
      </Button>

      <Button 
        size="sm" 
        className="gap-2 bg-green-600 hover:bg-green-700 text-white border-none"
      >
        <Play className="h-4 w-4" />
        Continue to Next Stage
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2 border-orange-500/50 text-orange-400 hover:bg-orange-950"
      >
        <RotateCcw className="h-4 w-4" />
        Iterate
      </Button>

      <div className="flex-1" />

      <Button variant="outline" size="sm" className="gap-2">
        <Download className="h-4 w-4" />
        Export ZIP
      </Button>
    </div>
  );
}
