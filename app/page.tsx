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
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block border-r border-white/10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="flex items-center justify-between border-b border-white/10 px-4 lg:px-6 py-4">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 bg-[#111111] border-white/10">
                <Sidebar onNavigate={() => setMobileSidebarOpen(false)} />
              </SheetContent>
            </Sheet>

            <div>
              <h1 className="text-lg lg:text-xl font-semibold tracking-tight">
                Habit Tracker Mobile App
              </h1>
              <div className="flex items-center gap-3 text-sm text-white/60 mt-1">
                <span>Global ETA</span>
                <div className="w-28 sm:w-40 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[73%] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                </div>
                <span className="font-mono text-xs">73%</span>
                <span className="font-mono text-white/70 text-xs">02:41:33</span>
              </div>
            </div>
          </div>
        </header>

        {/* Stage Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 p-4 lg:p-6">
          <StageCard stage="Ideation" status="completed" documents={18} pages={18} />
          <StageCard stage="Design" status="completed" documents={24} pages={24} />
          <StageCard stage="Technical Planning" status="in_progress" documents={9} pages={9} />
          <StageCard stage="Development" status="pending" documents={0} pages={0} />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col lg:flex-row gap-4 px-4 lg:px-6 pb-4 lg:pb-6 overflow-hidden">
          {/* Central Activity Pane */}
          <div className="flex-1 min-h-[400px] lg:min-h-0">
            <ActivityPane />
          </div>

          {/* Right Sidebar - Only visible on xl screens */}
          <div className="hidden xl:block w-80 shrink-0">
            <StageCompletionLog />
          </div>
        </div>

        {/* Bottom Action Bar */}
        <ActionBar />
      </div>
    </div>
  );
}
