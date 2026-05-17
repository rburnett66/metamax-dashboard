// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Settings, Play, Pause, RotateCcw, X, FileText, Download, Folder, FolderOpen } from 'lucide-react';

interface Stage {
  name: string;
  status: 'completed' | 'in_progress' | 'pending';
  progress: number;
}

interface FileNode {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FileNode[];
  extension?: string;
}

const colorPalettes = {
  'Gulf Oil': { primary: '#00AEEF', secondary: '#FF6B00', name: 'Gulf Oil' },
  'Martini Racing': { primary: '#E30613', secondary: '#FFFFFF', name: 'Martini Racing' },
  'Red Bull': { primary: '#001F5B', secondary: '#F1C40F', name: 'Red Bull Racing' },
  'McLaren': { primary: '#FF8000', secondary: '#000000', name: 'McLaren Racing' },
};

// Mock file tree (matches backend structure)
const mockFileTree: FileNode[] = [
  {
    name: '01-ideation',
    type: 'folder',
    path: '01-ideation',
    children: [
      { name: '01-stage-requirements.md', type: 'file', path: '01-ideation/01-stage-requirements.md', extension: 'md' },
      { name: '01-stage-requirements.docx', type: 'file', path: '01-ideation/01-stage-requirements.docx', extension: 'docx' },
      { name: '02-project-requirements.md', type: 'file', path: '01-ideation/02-project-requirements.md', extension: 'md' },
      { name: '02-project-requirements.docx', type: 'file', path: '01-ideation/02-project-requirements.docx', extension: 'docx' },
      { name: '03-work-status.md', type: 'file', path: '01-ideation/03-work-status.md', extension: 'md' },
      { name: '03-work-status.docx', type: 'file', path: '01-ideation/03-work-status.docx', extension: 'docx' },
      { name: '04-process-improvements.md', type: 'file', path: '01-ideation/04-process-improvements.md', extension: 'md' },
      { name: '04-process-improvements.docx', type: 'file', path: '01-ideation/04-process-improvements.docx', extension: 'docx' },
      { name: '05-final-results.md', type: 'file', path: '01-ideation/05-final-results.md', extension: 'md' },
      { name: '05-final-results.docx', type: 'file', path: '01-ideation/05-final-results.docx', extension: 'docx' },
      { name: '06-work-items.md', type: 'file', path: '01-ideation/06-work-items.md', extension: 'md' },
      { name: '06-work-items.docx', type: 'file', path: '01-ideation/06-work-items.docx', extension: 'docx' },
    ]
  },
  {
    name: '02-design',
    type: 'folder',
    path: '02-design',
    children: [
      { name: '01-stage-requirements.md', type: 'file', path: '02-design/01-stage-requirements.md', extension: 'md' },
      { name: '01-stage-requirements.docx', type: 'file', path: '02-design/01-stage-requirements.docx', extension: 'docx' },
      { name: '02-project-requirements.md', type: 'file', path: '02-design/02-project-requirements.md', extension: 'md' },
      { name: '02-project-requirements.docx', type: 'file', path: '02-design/02-project-requirements.docx', extension: 'docx' },
      { name: '03-work-status.md', type: 'file', path: '02-design/03-work-status.md', extension: 'md' },
      { name: '03-work-status.docx', type: 'file', path: '02-design/03-work-status.docx', extension: 'docx' },
      { name: '04-process-improvements.md', type: 'file', path: '02-design/04-process-improvements.md', extension: 'md' },
      { name: '04-process-improvements.docx', type: 'file', path: '02-design/04-process-improvements.docx', extension: 'docx' },
      { name: '05-final-results.md', type: 'file', path: '02-design/05-final-results.md', extension: 'md' },
      { name: '05-final-results.docx', type: 'file', path: '02-design/05-final-results.docx', extension: 'docx' },
      { name: '06-work-items.md', type: 'file', path: '02-design/06-work-items.md', extension: 'md' },
      { name: '06-work-items.docx', type: 'file', path: '02-design/06-work-items.docx', extension: 'docx' },
    ]
  },
  {
    name: '03-tech-plan',
    type: 'folder',
    path: '03-tech-plan',
    children: [
      { name: '01-stage-requirements.md', type: 'file', path: '03-tech-plan/01-stage-requirements.md', extension: 'md' },
      { name: '01-stage-requirements.docx', type: 'file', path: '03-tech-plan/01-stage-requirements.docx', extension: 'docx' },
      { name: '02-project-requirements.md', type: 'file', path: '03-tech-plan/02-project-requirements.md', extension: 'md' },
      { name: '02-project-requirements.docx', type: 'file', path: '03-tech-plan/02-project-requirements.docx', extension: 'docx' },
      { name: '03-work-status.md', type: 'file', path: '03-tech-plan/03-work-status.md', extension: 'md' },
      { name: '03-work-status.docx', type: 'file', path: '03-tech-plan/03-work-status.docx', extension: 'docx' },
      { name: '04-process-improvements.md', type: 'file', path: '03-tech-plan/04-process-improvements.md', extension: 'md' },
      { name: '04-process-improvements.docx', type: 'file', path: '03-tech-plan/04-process-improvements.docx', extension: 'docx' },
      { name: '05-final-results.md', type: 'file', path: '03-tech-plan/05-final-results.md', extension: 'md' },
      { name: '05-final-results.docx', type: 'file', path: '03-tech-plan/05-final-results.docx', extension: 'docx' },
      { name: '06-work-items.md', type: 'file', path: '03-tech-plan/06-work-items.md', extension: 'md' },
      { name: '06-work-items.docx', type: 'file', path: '03-tech-plan/06-work-items.docx', extension: 'docx' },
    ]
  },
  {
    name: '04-development',
    type: 'folder',
    path: '04-development',
    children: [
      { name: '01-stage-requirements.md', type: 'file', path: '04-development/01-stage-requirements.md', extension: 'md' },
      { name: '01-stage-requirements.docx', type: 'file', path: '04-development/01-stage-requirements.docx', extension: 'docx' },
      { name: '02-project-requirements.md', type: 'file', path: '04-development/02-project-requirements.md', extension: 'md' },
      { name: '02-project-requirements.docx', type: 'file', path: '04-development/02-project-requirements.docx', extension: 'docx' },
      { name: '03-work-status.md', type: 'file', path: '04-development/03-work-status.md', extension: 'md' },
      { name: '03-work-status.docx', type: 'file', path: '04-development/03-work-status.docx', extension: 'docx' },
      { name: '04-process-improvements.md', type: 'file', path: '04-development/04-process-improvements.md', extension: 'md' },
      { name: '04-process-improvements.docx', type: 'file', path: '04-development/04-process-improvements.docx', extension: 'docx' },
      { name: '05-final-results.md', type: 'file', path: '04-development/05-final-results.md', extension: 'md' },
      { name: '05-final-results.docx', type: 'file', path: '04-development/05-final-results.docx', extension: 'docx' },
      { name: '06-work-items.md', type: 'file', path: '04-development/06-work-items.md', extension: 'md' },
      { name: '06-work-items.docx', type: 'file', path: '04-development/06-work-items.docx', extension: 'docx' },
    ]
  }
];

export default function MetaMaxDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState('Gulf Oil');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['01-ideation']);
  const [selectedFile, setSelectedFile] = useState<{ path: string; content: string; name: string } | null>(null);
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

  const currentPalette = colorPalettes[selectedPalette as keyof typeof colorPalettes];

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleFolder = (path: string) => {
    if (expandedFolders.includes(path)) {
      setExpandedFolders(expandedFolders.filter(p => p !== path));
    } else {
      setExpandedFolders([...expandedFolders, path]);
    }
  };

  const openFile = async (file: FileNode) => {
    if (file.extension === 'md') {
      const mockContent = `# ${file.name}\n\nThis is a preview of ${file.path}.\n\n*In production, this would fetch the actual file content from the backend.*`;
      setSelectedFile({
        path: file.path,
        content: mockContent,
        name: file.name
      });
    } else if (file.extension === 'docx') {
      alert(`Downloading: ${file.name}\n\n(In production, this would trigger a download from the backend)`);
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

  const changePalette = (palette: string) => {
    setSelectedPalette(palette);
    setShowPreferences(false);
    addLog(`Color palette changed to ${palette}`);
  };

  const renderFileTree = (nodes: FileNode[], level: number = 0) => {
    return nodes.map((node, index) => (
      <div key={index} style={{ paddingLeft: `${level * 12}px` }}>
        {node.type === 'folder' ? (
          <div>
            <div 
              className="flex items-center gap-2 px-2 py-1 hover:bg-white/5 rounded cursor-pointer text-sm"
              onClick={() => toggleFolder(node.path)}
            >
              {expandedFolders.includes(node.path) ? (
                <FolderOpen className="h-4 w-4 text-[#00AEEF]" />
              ) : (
                <Folder className="h-4 w-4 text-[#00AEEF]" />
              )}
              <span>{node.name}</span>
            </div>
            {expandedFolders.includes(node.path) && node.children && (
              <div>{renderFileTree(node.children, level + 1)}</div>
            )}
          </div>
        ) : (
          <div 
            className="flex items-center gap-2 px-2 py-1 hover:bg-white/5 rounded cursor-pointer text-sm text-white/80"
            onClick={() => openFile(node)}
          >
            {node.extension === 'md' ? (
              <FileText className="h-4 w-4 text-[#00AEEF]" />
            ) : (
              <Download className="h-4 w-4 text-[#FF6B00]" />
            )}
            <span>{node.name}</span>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex h-screen flex-col bg-[#0A1628] text-white overflow-hidden">
      <header className="flex items-center justify-between border-b border-white/10 px-8 py-5 bg-[#111827]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-2xl flex items-center justify-center"
              style={{ background: `linear-gradient(to bottom right, ${currentPalette.primary}, ${currentPalette.secondary})` }}
            >
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <span className="font-semibold text-3xl tracking-tight">MetaMax</span>
          </div>

          <div className="ml-8">
            <div className="text-xl font-semibold tracking-tight">Project Name</div>
            <div className="flex items-center gap-4 text-sm text-white/70 mt-1">
              <span>Global ETA</span>
              <div className="w-36 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ width: '68%', background: `linear-gradient(to right, ${currentPalette.primary}, ${currentPalette.secondary})` }}
                />
              </div>
              <span className="font-mono text-sm text-white/80">14d 7h</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs text-white/40 font-mono px-3 py-1 bg-white/5 rounded-full">v0.9.2</div>

          <button
            onClick={() => setShowPreferences(true)}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-1 text-sm"
          >
            <Settings className="h-4 w-4" />
            <span>Preferences</span>
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="w-9 h-9 rounded-full bg-[#FF6B00] flex items-center justify-center text-sm font-medium">RB</div>
        </div>
      </header>

      {showPreferences && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111827] border border-white/10 rounded-3xl w-full max-w-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Preferences</h2>
              <button onClick={() => setShowPreferences(false)} className="p-2 hover:bg-white/10 rounded-xl">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold text-white/60 mb-3">COLOR PALETTE</div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(colorPalettes).map((palette) => (
                    <button
                      key={palette}
                      onClick={() => changePalette(palette)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedPalette === palette 
                          ? 'border-[#00AEEF] bg-[#00AEEF]/10' 
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="font-medium">{palette}</div>
                      <div className="text-xs text-white/50 mt-1">Racing Livery</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-white/50">
                Color palettes inspired by classic racing liveries
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedFile && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111827] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[#00AEEF]" />
                <h3 className="text-lg font-semibold">{selectedFile.name}</h3>
              </div>
              <button onClick={() => setSelectedFile(null)} className="p-2 hover:bg-white/10 rounded-xl">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <pre className="text-sm text-white/80 whitespace-pre-wrap font-mono">{selectedFile.content}</pre>
            </div>
            <div className="p-6 border-t border-white/10 text-xs text-white/50">
              Path: {selectedFile.path} • Read-only preview
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden gap-8 p-8">
        <div className="w-80 border border-white/10 bg-[#111827] rounded-3xl p-6 flex flex-col">
          <div className="text-xs font-semibold text-white/60 tracking-[1.5px] mb-4 flex items-center justify-between">
            <span>FILES &amp; ARTIFACTS</span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded">48 files</span>
          </div>
          
          <div className="flex-1 overflow-auto text-sm">
            {renderFileTree(mockFileTree)}
          </div>
          
          <div className="pt-4 border-t border-white/10 text-[10px] text-white/40">
            Click .md to preview • Click .docx to download
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden gap-8">
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

        <div className="w-96 border border-white/10 bg-[#111827] rounded-3xl flex flex-col overflow-hidden">
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
