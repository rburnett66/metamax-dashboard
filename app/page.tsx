// app/page.tsx
'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { StageCard } from '@/components/StageCard';
import { ActivityPane } from '@/components/ActivityPane';
import { StageCompletionLog } from '@/components/StageCompletionLog';
import { ActionBar } from '@/components/ActionBar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function MetaMaxDashboard() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0A1628] text-white overflow-hidden">
      {/* Desktop Left Sidebar - Files */}
      <div className="hidden lg:block w-60 border-r border-white/10 bg-[#111827]">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#111827]">
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger */}
            <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 bg-[#111827] border-white/10">
                <Sidebar onNavigate={() => setMobileSidebarOpen(false)} />
              </SheetContent>
            </Sheet>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold tracking-tight">Habit Tracker Mobile App</h1>
                <div className="px-2.5 py-0.5 text-xs rounded-full bg-white/10 text-[#00AEEF]">v2.4</div>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60 mt-1">
                <span>Global ETA</span>
                <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[68%] bg-gradient-to-r from-[#00AEEF] to-[#FF6B00] rounded-full" />
                </div>
                <span className="font-mono text-xs">14d 7h</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FF6B00] flex items-center justify-center text-sm font-medium">RB</div>
          </div>
        </header>

        {/* Stage Cards Row - Centered between columns */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-white/60">STAGES</div>
            <div className="text-xs px-2.5 py-1 bg-white/10 rounded-full text-[#00AEEF]">4 / 4 active</div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StageCard stage="IDEA" status="completed" progress={100} />
            <StageCard stage="DESIGN" status="in_progress" progress={65} />
            <StageCard stage="TECH PLAN" status="pending" progress={0} />
            <StageCard stage="DEV" status="pending" progress={0} />
          </div>
        </div>

        {/* Prompt Area */}
        <div className="px-6 mt-6">
          <div className="text-sm font-semibold text-white/60 mb-2">ENTRY PROMPT</div>
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-4">
            <input 
              type="text" 
              placeholder="Describe what you want to do next..." 
              className="w-full bg-transparent border-none focus:ring-0 text-sm placeholder-white/40" 
            />
          </div>
        </div>

        {/* Activity Pane */}
        <div className="flex-1 px-6 pt-6 pb-4 overflow-hidden">
          <ActivityPane />
        </div>

        {/* Bottom Action Bar */}
        <ActionBar />
      </div>

      {/* Right Column - Log Stream (with controls inside) */}
      <div className="hidden xl:flex w-80 flex-col border-l border-white/10 bg-[#111827]">
        {/* Control Buttons inside the column */}
        <div className="p-4 border-b border-white/10">
          <div className="text-xs font-semibold text-white/60 mb-2 px-1">STAGE CONTROLS</div>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-center border-white/20 hover:bg-white/5">⏸ PAUSE</Button>
            <Button className="w-full justify-center bg-[#FF6B00] hover:bg-[#FF8C33] text-black font-semibold">✓ FINISH STAGE</Button>
            <Button variant="outline" className="w-full justify-center border-white/20 hover:bg-white/5">🔄 ITERATE</Button>
          </div>
        </div>

        {/* Log Stream */}
        <div className="flex-1 p-4 overflow-auto">
          <StageCompletionLog />
        </div>
      </div>
    </div>
  );
}
