// components/StageCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, PlayCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StageCardProps {
  stage: string;
  status: "completed" | "in_progress" | "pending";
  progress: number;
}

export function StageCard({ stage, status, progress }: StageCardProps) {
  const statusConfig = {
    completed: {
      icon: CheckCircle2,
      color: "text-[#00AEEF]",
      label: "Completed",
      bg: "bg-[#00AEEF]/10",
    },
    in_progress: {
      icon: PlayCircle,
      color: "text-[#FF6B00]",
      label: "In Progress",
      bg: "bg-[#FF6B00]/10",
    },
    pending: {
      icon: Clock,
      color: "text-white/40",
      label: "Pending",
      bg: "bg-white/5",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Card className="bg-[#111827] border-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-white/60">STAGE</div>
            <h3 className="font-semibold text-2xl tracking-tighter mt-1">{stage}</h3>
          </div>
          <div className={cn("px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5", config.bg, config.color)}>
            <Icon className="h-3.5 w-3.5" />
            {config.label}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-white/60">Progress</span>
            <span className="font-mono text-white/80">{progress}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={cn("h-1.5 rounded-full transition-all", 
                status === 'completed' ? 'bg-[#00AEEF]' : 
                status === 'in_progress' ? 'bg-[#FF6B00]' : 'bg-white/30'
              )} 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
