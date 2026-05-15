// components/Sidebar.tsx
import { Folder, FileText, ChevronDown } from "lucide-react";

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <div className="w-72 h-full bg-[#111111] border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <span className="text-black font-bold text-lg">M</span>
          </div>
          <span className="font-semibold text-xl tracking-tight">MetaMax</span>
        </div>
      </div>

      {/* Files & Artifacts */}
      <div className="p-4">
        <div className="flex items-center justify-between px-2 mb-3">
          <span className="text-sm font-medium text-white/70">Files & Artifacts</span>
          <ChevronDown className="h-4 w-4 text-white/50" />
        </div>

        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer">
            <Folder className="h-4 w-4 text-white/60" />
            <span>Habit Tracker</span>
          </div>
          <div className="pl-6 space-y-1 text-white/70">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/5 cursor-pointer text-sm">
              <FileText className="h-3.5 w-3.5" /> SKILL.md
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/5 cursor-pointer text-sm">
              <FileText className="h-3.5 w-3.5" /> reports/
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/5 cursor-pointer text-sm">
              <FileText className="h-3.5 w-3.5" /> wireframes/
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/5 cursor-pointer text-sm">
              <FileText className="h-3.5 w-3.5" /> code/
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 text-xs text-white/40 border-t border-white/10">
        Local • Last synced moments ago
      </div>
    </div>
  );
}
