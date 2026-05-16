// app/page.tsx
'use client';

export default function MetaMaxDashboard() {
  return (
    <div className="flex h-screen flex-col bg-[#0A1628] text-white overflow-hidden">
      {/* ROW 1: HEADER */}
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#111827]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00AEEF] to-[#FF6B00] rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="font-semibold text-2xl tracking-tight">MetaMax</span>
          </div>

          <div className="ml-6">
            <div className="text-lg font-semibold tracking-tight">Project Name</div>
            <div className="flex items-center gap-3 text-sm text-white/70 mt-0.5">
              <span>Global ETA</span>
              <div className="w-28 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[68%] bg-gradient-to-r from-[#00AEEF] to-[#FF6B00] rounded-full" />
              </div>
              <span className="font-mono text-xs text-white/80">14d 7h</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#FF6B00] flex items-center justify-center text-sm font-medium">RB</div>
        </div>
      </header>

      {/* ROW 2: BODY (3 columns) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* COLUMN 1: FILES */}
        <div className="w-60 border-r border-white/10 bg-[#111827] p-4 flex flex-col">
          <div className="text-xs font-semibold text-white/60 tracking-[1px] mb-3">FILES &amp; ARTIFACTS</div>
          <div className="space-y-1 text-sm">
            <div className="px-3 py-2 bg-[#1F2937] rounded-2xl text-[#00AEEF] flex items-center gap-2">
              <span>📁</span> <span>Project Root</span>
            </div>
            <div className="pl-8 text-white/70 space-y-1">
              <div className="px-2 py-1 hover:bg-white/5 rounded-xl cursor-pointer">requirements.md</div>
              <div className="px-2 py-1 hover:bg-white/5 rounded-xl cursor-pointer">design-spec.md</div>
              <div className="px-2 py-1 hover:bg-white/5 rounded-xl cursor-pointer">/src</div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: MAIN */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 4 Stages Row */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-white/60">STAGES</div>
              <div className="text-xs px-3 py-1 bg-white/10 rounded-full text-[#00AEEF]">4 / 4 active</div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {['IDEA', 'DESIGN', 'TECH PLAN', 'DEV'].map((name, i) => (
                <div key={i} className="bg-[#111827] border border-white/10 rounded-2xl p-5 hover:border-[#00AEEF]/50 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] text-white/50 tracking-[1px]">STAGE</div>
                      <div className="font-semibold text-[22px] tracking-[-0.5px] mt-1">{name}</div>
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-medium flex items-center gap-1
                      ${i === 0 ? 'bg-[#00AEEF]/10 text-[#00AEEF]' : i === 1 ? 'bg-[#FF6B00]/10 text-[#FF6B00]' : 'bg-white/10 text-white/50'}`}>
                      {i === 0 ? '✓ Completed' : i === 1 ? '⟳ In Progress' : '○ Pending'}
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-[10px] mb-1.5 text-white/50">
                      <span>PROGRESS</span>
                      <span className="font-mono text-white/80">{i === 0 ? '100' : i === 1 ? '65' : '0'}%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-1 rounded-full ${i === 0 ? 'bg-[#00AEEF]' : i === 1 ? 'bg-[#FF6B00]' : 'bg-white/30'}`} style={{ width: `${i === 0 ? 100 : i === 1 ? 65 : 0}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt */}
          <div className="px-6">
            <div className="text-sm font-semibold text-white/60 mb-2">ENTRY PROMPT</div>
            <div className="bg-[#111827] border border-white/10 rounded-2xl p-4">
              <input 
                type="text" 
                placeholder="Describe what you want to do next..." 
                className="w-full bg-transparent border-none focus:ring-0 text-sm placeholder-white/40" 
              />
            </div>
          </div>

          {/* Activity Window */}
          <div className="flex-1 px-6 pt-4 pb-6 overflow-hidden">
            <div className="text-sm font-semibold text-white/60 mb-2">ACTIVITY WINDOW</div>
            <div className="h-full bg-[#111827] border border-white/10 rounded-2xl p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-3 opacity-40">📊</div>
                <div className="text-sm text-white/70">Activity Window (3 states: Ribbon / Cards / Logs)</div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 3: LOG */}
        <div className="w-80 border-l border-white/10 bg-[#111827] flex flex-col">
          {/* Buttons */}
          <div className="p-4 border-b border-white/10">
            <div className="text-xs font-semibold text-white/60 mb-2 px-1">STAGE CONTROLS</div>
            <div className="space-y-2">
              <button className="w-full py-2.5 rounded-2xl bg-[#1F2937] hover:bg-[#374151] text-sm font-medium transition-colors">⏸ PAUSE</button>
              <button className="w-full py-2.5 rounded-2xl bg-[#FF6B00] hover:bg-[#FF8C33] text-black font-semibold transition-colors">✓ FINISH STAGE</button>
              <button className="w-full py-2.5 rounded-2xl bg-[#1F2937] hover:bg-[#374151] text-sm font-medium transition-colors">🔄 ITERATE</button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-auto">
            <div className="text-xs font-semibold text-white/60 mb-3 px-1">LOG STREAM (Current Stage)</div>
            <div className="space-y-3 text-xs">
              <div className="flex gap-2">
                <div className="font-mono text-[#00AEEF] w-14 shrink-0">14:32</div>
                <div className="text-white/80">Agent-01 completed research task</div>
              </div>
              <div className="flex gap-2">
                <div className="font-mono text-[#00AEEF] w-14 shrink-0">14:28</div>
                <div className="text-white/80">Human approved wireframes</div>
              </div>
              <div className="flex gap-2">
                <div className="font-mono text-[#FF6B00] w-14 shrink-0">14:19</div>
                <div className="text-white/80">Agent-02 started visual design</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
