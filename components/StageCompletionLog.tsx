// components/StageCompletionLog.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StageCompletionLog() {
  const logs = [
    { time: "6:12 PM", message: "Ideation completed" },
    { time: "6:41 PM", message: "Design completed" },
    { time: "7:03 PM", message: "Technical Planning started" },
    { time: "7:18 PM", message: "Architecture defined" },
  ];

  return (
    <Card className="h-full bg-[#111111] border-white/10 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Stage Completion</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto text-sm space-y-3">
        {logs.map((log, index) => (
          <div key={index} className="flex gap-3">
            <div className="font-mono text-xs text-white/40 w-16 shrink-0">{log.time}</div>
            <div className="text-white/80">{log.message}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
