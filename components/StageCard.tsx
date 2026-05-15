// components/StageCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StageCardProps {
  stage: string;
  status: "completed" | "in_progress" | "pending";
  documents: number;
  pages: number;
}

export function StageCard({ stage, status, documents, pages }: StageCardProps) {
  const statusConfig = {
    completed: {
      icon: CheckCircle2,
      color: "text-green-500",
      label: "Completed",
    },
    in_progress: {
      icon: PlayCircle,
      color: "text-blue-500",
      label: "In Progress",
    },
    pending: {
      icon: Clock,
      color: "text-white/40",
      label: "Pending",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Card className="bg-[#111111] border-white/10 hover:border-white/20 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg tracking-tight">{stage}</h3>
            <p className={cn("text-xs mt-1 flex items-center gap-1.5", config.color)}>
              <Icon className="h-3.5 w-3.5" />
              {config.label}
            </p>
          </div>
          <Icon className={cn("h-5 w-5", config.color)} />
        </div>

        <div className="mt-4 flex justify-between text-sm">
          <div>
            <div className="text-white/60 text-xs">Documents</div>
            <div className="font-mono text-lg font-medium">{documents}</div>
          </div>
          <div>
            <div className="text-white/60 text-xs">Pages</div>
            <div className="font-mono text-lg font-medium">{pages}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
