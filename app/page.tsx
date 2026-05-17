// app/page.tsx
'use client';

import { useState } from 'react';
import { Moon, Sun, Play, Pause, RotateCcw } from 'lucide-react';

interface Stage {
  name: string;
  status: 'completed' | 'in_progress' | 'pending';
  progress: number;
}

export default function MetaMaxDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [stages, setStages] = useState<Stage[]>([
    { name: 'IDEA', status: 'completed', progress: 100 },
    { name: 'DESIGN', status: 'in_progress', progress: 65 },
    { name: 'TECH PLAN', status: 'pending', progress: 0 },
    { name: 'DEV', status: 'pending', progress: 0 },
  ]);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [logs, setLogs] = useState([
    { time: '14:32', message: 'Agent-01 completed research task' },
    { time: '14:28', message: 'Human approved wireframes' },
    { time: '14:19', message: 'Agent-02 started visual design' },
  ]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    addLog(isPaused ? 'Stage resumed' : 'Stage paused');
  };

  const handleFinishStage = () => {
    if (currentStage < stages.length - 1) {
      const newStages = [...stages];
      newStages[currentStage].status = 'completed';
      newStages[currentStage].progress = 100;
      newStages[currentStage + 1].status = 'in_progress';
      
      setStages(newStages);
      setCurrentStage(currentStage + 1);
      addLog(`Stage ${stages[currentStage].name} completed`);
    } else {
      alert('All stages completed!');
    }
  };

  const handleIterate = () => {
    const stageName = stages[currentStage].name;
    addLog(`Iteration requested for ${stageName}`);
    alert(`Iteration dialog would open for ${stageName}`);
  };

  const addLog = (message: string) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setLogs(prev => [{ time, message }, ...prev].slice(0, 10));
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

        <div className="flex items-center gap-4">
          {/* Version Number */}
          <div className="text-xs text-white/40 font-mono px-3 py-1 bg-white/5 rounded-full">v0.9.2</div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

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
          {/* Dynamic Stage Cards */}
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="text-sm font-semibold text-white/60">STAGES</div>
              <div className="text-xs px-4 py-1.5 bg-white/10 rounded-full text-[#00AEEF]">4 / 4 active</div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {stages.map((stage, i) => (
                <div 
                  key={i} 
                  className={`bg-[#111827] border border-white/10 rounded-3xl p-7 transition-all cursor-pointer
                    ${i === currentStage ? 'ring-2 ring-[#00AEEF]' : 'hover:border-[#00AEEF]/50'}`}
                  onClick={() => setCurrentStage(i)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[11px] text-white/50 tracking-[1.5px]">STAGE</div>
                      <div className="font-semibold text-2xl tracking-[-0.5px] mt-2">{stage.name}</div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5
                      ${stage.status === 'completed' ? 'bg-[#00AEEF]/10 text-[#00AEEF]' : 
                        stage.status === 'in_progress' ? 'bg-[#FF6B00]/10 text-[#FF6B00]' : 'bg-white/10 text-white/50'}`}>
                      {stage.status === 'completed' ? '✓ Completed' : 
                       stage.status === 'in_progress' ? '⟳ In Progress' : '○ Pending'}
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="flex justify-between text-xs mb-2 text-white/50">
                      <span>PROGRESS</span>
                      <span className="font-mono text-white/80">{stage.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-1.5 rounded-full transition-all
                        ${stage.status === 'completed' ? 'bg-[#00AEEF]' : 
                          stage.status === 'in_progress' ? 'bg-[#FF6B00]' : 'bg-white/30'}`} 
                        style={{ width: `${stage.progress}%` }} 
                      />
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
                <div className="text-sm text-white/50 mt-2">Ribbon • Agent Cards • Logs</div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 3: LOG + FUNCTIONAL BUTTONS */}
        <div className="w-96 border border-white/10 bg-[#111827] rounded-3xl flex flex-col overflow-hidden">
          {/* Functional Buttons */}
          <div className="p-6 border-b border-white/10">
            <div className="text-xs font-semibold text-white/60 tracking-[1.5px] mb-4 px-1">STAGE CONTROLS</div>
            <div className="space-y-3">
              <button 
                onClick={handlePause}
                className="w-full py-3.5 rounded-2xl bg-[#1F2937] hover:bg-[#374151] text-base font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                {isPaused ? 'RESUME' : 'PAUSE'}
              </button>
              
              <button 
                onClick={handleFinishStage}
                className="w-full py-3.5 rounded-2xl bg-[#FF6B00] hover:bg-[#FF8C33] text-white font-semibold transition-colors flex items-center justify-center gap-2"
              >
                ✓ FINISH STAGE
              </button>
              
              <button 
                onClick={handleIterate}
                className="w-full py-3.5 rounded-2xl bg-[#1F2937] hover:bg-[#374151] text-base font-medium transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                ITERATE
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
