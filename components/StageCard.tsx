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
    completed: { icon: CheckCircle2, color: "text-[#00AEEF]", label: "Completed", bar: "bg-[#00AEEF]" },
    in_progress: { icon: PlayCircle, color: "text-[#FF6B00]", label: "In Progress", bar: "bg-[#FF6B00]" },
    pending: { icon: Clock, color: "text-white/40", label: "Pending", bar: "bg-white/30" },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Card className="bg-[#111827] border-white/10 hover:border-[#00AEEF]/50 transition-all hover:-translate-y-px">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] text-white/50 tracking-[1px]">STAGE</div>
            <h3 className="font-semibold text-[22px] tracking-[-0.5px] mt-1">{stage}</h3>
          </div>
          <div className={cn("px-2.5 py-1 rounded-full text-[10px] font-medium flex items-center gap-1", 
            status === 'completed' ? 'bg-[#00AEEF]/10 text-[#00AEEF]' : 
            status === 'in_progress' ? 'bg-[#FF6B00]/10 text-[#FF6B00]' : 'bg-white/10 text-white/50'
          )}>
            <Icon className="h-3 w-3" />
            {config.label}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-[10px] mb-1.5 text-white/50">
            <span>PROGRESS</span>
            <span className="font-mono">{progress}%</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className={cn("h-1 rounded-full transition-all", config.bar)} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
