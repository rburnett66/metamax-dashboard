// components/ActivityPane.tsx
import { Card } from "@/components/ui/card";

export function ActivityPane() {
  return (
    <Card className="h-full bg-[#111111] border-white/10 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Technical Planning</div>
            <div className="text-xs text-white/50">Generating React Native components...</div>
          </div>
          <div className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
            In Progress
          </div>
        </div>
      </div>

      {/* Generative Visual Area */}
      <div className="flex-1 relative flex items-center justify-center bg-black/40">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-400/30 flex items-center justify-center mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 animate-pulse" />
          </div>
          <p className="text-sm text-white/70 max-w-xs">
            Generating React Native components for habit tracking screen...
          </p>
        </div>
      </div>

      <div className="p-3 border-t border-white/10 text-xs text-white/50 flex justify-between">
        <span>Agent: Architecture Agent</span>
        <span>Step 3/5</span>
      </div>
    </Card>
  );
}
