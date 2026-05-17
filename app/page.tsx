// app/page.tsx
'use client';

import { useState } from 'react';

export default function MetaMaxDashboard() {
  const [stages, setStages] = useState([
    { id: 1, name: 'IDEA', status: 'completed', progress: 100 },
    { id: 2, name: 'DESIGN', status: 'in_progress', progress: 65 },
    { id: 3, name: 'TECH PLAN', status: 'pending', progress: 0 },
    { id: 4, name: 'DEV', status: 'pending', progress: 0 },
  ]);

  const [currentStage, setCurrentStage] = useState(2); // Design is active
  const [logs, setLogs] = useState([
    { time: '14:32', message: 'Agent-01 completed research task' },
    { time: '14:28', message: 'Human approved wireframes' },
    { time: '14:19', message: 'Agent-02 started visual design' },
  ]);

  const handlePause = () => {
    alert('Stage paused! (This will connect to backend later)');
  };

  const handleFinish = () => {
    const updatedStages = stages.map((stage, index) => {
      if (index === currentStage - 1) {
        return { ...stage, status: 'completed', progress: 100 };
      }
      if (index === currentStage) {
        return { ...stage, status: 'in_progress', progress: 25 };
      }
      return stage;
    });
    setStages(updatedStages);
    setCurrentStage(currentStage + 1);
    setLogs([{ time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), message: `Stage ${stages[currentStage-1].name} completed` }, ...logs]);
    alert('Stage finished! Moving to next stage.');
  };

  const handleIterate = () => {
    const feedback = prompt('What would you like to iterate on?');
    if (feedback) {
      setLogs([{ time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), message: `Iteration requested: ${feedback}` }, ...logs]);
      alert('Iteration request sent to agents.');
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[#0A1628] text-white overflow-hidden">
      {/* HEADER */}
      <header className="flex items-center justify-between border-b border-white/10 px-8 py-5 bg-[#111827]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#00AEEF] to-[#FF6B00] rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <span className="font-semibold text-3xl tracking-tight">MetaMax</span>
            <span className="text-xs text-white/40 font-mono ml-2">v0.9.2</span>
          </div>

          <div className="ml-8">
            <div className="text-xl font-semibold tracking-tight">Project Name</div>
            <div className="flex items-center gap-4 text-sm text-white/70 mt-1">
              <span>Global ETA</span>
              <div className="w-36 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[68%] bg-gradient-to-r from-[#00AEEF] to-[#FF6B00] rounded-full" />
              </div>
              <span className="font-mono text-sm text-white/80">14d 7h</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#FF6B00] flex items-center justify-center text-sm font-medium">RB</div>
        </div>
      </header>

      {/* BODY - 3 Columns */}
      <div className="flex flex-1 overflow-hidden gap-8 p-8">
        
        {/* COLUMN 1: FILES */}
        <div className="w-80 border border-white/10 bg-[#111827] rounded-3xl p-8 flex flex-col">
          <div className="text-xs font-semibold text-white/60 tracking-[1.5px] mb-4">FILES &amp; ARTIFACTS</div>
          <div className="space-y-2 text-base">
            <div className="px-5 py-4 bg-[#1F2937] rounded-2xl text-[#00AEEF] flex items-center gap-3">
              <span>📁</span> <span className="font-medium">Project Root</span>
            </div>
            <div className="pl-12 text-white/70 space-y-1.5">
              <div className="px-4 py-2.5 hover:bg-white/5 rounded-2xl cursor-pointer">requirements.md</div>
              <div className="px-4 py-2.5 hover:bg-white/5 rounded-2xl cursor-pointer">design-spec.md</div>
              <div className="px-4 py-2.5 hover:bg-white/5 rounded-2xl cursor-pointer">/src</div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: MAIN */}
        <div className="flex-1 flex flex-col overflow-hidden gap-8">
          {/* 4 Stages Row */}
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="text-sm font-semibold text-white/60">STAGES</div>
              <div className="text-xs px-4 py-1.5 bg-white/10 rounded-full text-[#00AEEF]">4 / 4 active</div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {stages.map((stage, index) => (
                <div key={stage.id} className="bg-[#111827] border border-white/10 rounded-3xl p-7 hover:border-[#00AEEF]/50 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[11px] text-white/50 tracking-[1.5px]">STAGE</div>
                      <div className="font-semibold text-2xl tracking-[-0.5px] mt-2">{stage.name}</div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5
                      ${stage.status === 'completed' ? 'bg-[#00AEEF]/10 text-[#00AEEF]' : 
                        stage.status === 'in_progress' ? 'bg-[#FF6B00]/10 text-[#FF6B00]' : 'bg-white/10 text-white/50'}`}>
                      {stage.status === 'completed' ? '✓ Completed' : stage.status === 'in_progress' ? '⟳ In Progress' : '○ Pending'}
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="flex justify-between text-xs mb-2 text-white/50">
                      <span>PROGRESS</span>
                      <span className="font-mono text-white/80">{stage.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-1.5 rounded-full ${stage.status === 'completed' ? 'bg-[#00AEEF]' : stage.status === 'in_progress' ? 'bg-[#FF6B00]' : 'bg-white/30'}`} style={{ width: `${stage.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt */}
          <div>
            <div className="text-sm font-semibold text-white/60 mb-3 px-1">ENTRY PROMPT</div>
            <div className="bg-[#111827] border border-white/10 rounded-3xl p-6">
              <input 
                type="text" 
                placeholder="Describe what you want to do next..." 
                className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder-white/40" 
              />
            </div>
          </div>

          {/* Activity Window */}
          <div className="flex-1">
            <div className="text-sm font-semibold text-white/60 mb-3 px-1">ACTIVITY WINDOW</div>
            <div className="h-full bg-[#111827] border border-white/10 rounded-3xl p-10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-4 opacity-40">📊</div>
                <div className="text-lg text-white/70">Activity Window (3 states coming soon)</div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 3: LOG */}
        <div className="w-96 border border-white/10 bg-[#111827] rounded-3xl flex flex-col overflow-hidden">
          {/* Buttons */}
          <div className="p-6 border-b border-white/10">
            <div className="text-xs font-semibold text-white/60 tracking-[1.5px] mb-4 px-1">STAGE CONTROLS</div>
            <div className="space-y-3">
              <button 
                onClick={handlePause}
                className="w-full py-3.5 rounded-2xl bg-[#1F2937] hover:bg-[#374151] text-base font-medium transition-colors">
                ⏸ PAUSE
              </button>
              <button 
                onClick={handleFinish}
                className="w-full py-3.5 rounded-2xl bg-[#FF6B00] hover:bg-[#FF8C33] text-white font-semibold transition-colors">
                ✓ FINISH STAGE
              </button>
              <button 
                onClick={handleIterate}
                className="w-full py-3.5 rounded-2xl bg-[#1F2937] hover:bg-[#374151] text-base font-medium transition-colors">
                🔄 ITERATE
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-auto">
            <div className="text-xs font-semibold text-white/60 tracking-[1.5px] mb-4 px-1">LOG STREAM (Current Stage)</div>
            <div className="space-y-4 text-sm">
              {logs.map((log, index) => (
                <div key={index} className="flex gap-3">
                  <div className="font-mono text-[#00AEEF] w-16 shrink-0">{log.time}</div>
                  <div className="text-white/80">{log.message}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
