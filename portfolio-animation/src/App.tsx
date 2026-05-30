import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// ==========================================
// DATA STRUCTURES
// ==========================================
const PROJECTS = [
  { id: 1, name: "NeuralNet_Dashboard.py", tech: "Python / NextJS", desc: "AI-driven cluster analytic interface monitoring deep learning models." },
  { id: 2, name: "Liquid_Distortion_Shader.glsl", tech: "WebGL / Three.js", desc: "A creative fluid shader capturing mouse vector displacements." },
  { id: 3, name: "Quant_Trading_Bot.cpp", tech: "C++ / WebSockets", desc: "High-frequency trade execution engine running sub-millisecond latencies." },
];

export default function App() {
  // OS System States
  const [isHardwareView, setIsHardwareView] = useState(false);
  const [isProjectWindowOpen, setIsProjectWindowOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  
  // Terminal History States
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "A.M.A.N.D.A Core OS v4.0.26 initialized.",
    "Type 'help' to see available shell variables.",
    ""
  ]);

  // Draggable window state positions
  const [projWindowPos, setProjWindowPos] = useState({ x: 120, y: 150 });
  const [termWindowPos, setTermWindowPos] = useState({ x: 500, y: 220 });

  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Global theme transition effect
  useEffect(() => {
    if (!mainContainerRef.current) return;
    gsap.to(mainContainerRef.current, {
      backgroundColor: isHardwareView ? "#022c22" : "#09090b",
      duration: 0.6,
      ease: "power2.out"
    });
  }, [isHardwareView]);

  // Terminal command prompt compiler engine
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;

    let response: string[] = [];

    switch (command) {
      case "help":
        response = [
          `> ${terminalInput}`,
          "Available shell operations:",
          "  projects - Compiles built project modules script outputs",
          "  contact  - Establishes communication protocols layout",
          "  clear    - Flushes buffer logs screen logs",
          "  hardware - Toggles raw motherboard layout visualization matrix",
        ];
        break;
      case "projects":
        response = [
          `> ${terminalInput}`,
          "Fetching active repos...",
          ...PROJECTS.map(p => `  • ${p.name} [${p.tech}] -> ${p.desc}`),
        ];
        break;
      case "contact":
        response = [
          `> ${terminalInput}`,
          "Inbound channel routes open:",
          "  Email: dev@amanda.codes",
          "  GitHub: github.com/AmandaCoding",
        ];
        break;
      case "hardware":
        setIsHardwareView(prev => !prev);
        response = [`> ${terminalInput}`, `Hardware schematic view toggled state: ${!isHardwareView}`];
        break;
      case "clear":
        setTerminalLogs([]);
        setTerminalInput("");
        return;
      default:
        response = [`> ${terminalInput}`, `sh: command not found: ${command}. Type 'help' for configurations.`];
    }

    setTerminalLogs(prev => [...prev, ...response, ""]);
    setTerminalInput("");
  };

  return (
    <div 
      ref={mainContainerRef} 
      className={`relative w-screen h-screen overflow-hidden p-6 transition-all duration-300 ${isHardwareView ? 'circuit-grid text-emerald-400' : 'text-zinc-300'}`}
    >
      {/* Visual Interceptors overlays */}
      <div className="scanlines" />

      {/* ==========================================
          TOP STATUS DOCK BAR
         ========================================== */}
      <header className={`w-full flex justify-between items-center px-4 py-2 border rounded-md text-xs backdrop-blur-md z-40 ${isHardwareView ? 'border-emerald-800 bg-emerald-950/20' : 'border-zinc-800 bg-zinc-900/40'}`}>
        <div className="flex items-center gap-4">
          <span className="font-bold tracking-widest animate-pulse">● AMANDA_OS</span>
          <span className="opacity-50">SYS_STATUS: ACTIVE</span>
        </div>
        <div className="flex items-center gap-6">
          {/* Aesthetic Toggle Engine switcher */}
          <button 
            onClick={() => setIsHardwareView(!isHardwareView)}
            className={`px-3 py-1 rounded border uppercase text-[10px] font-bold tracking-wider transition-all cursor-pointer ${isHardwareView ? 'bg-emerald-500 text-zinc-950 border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'border-zinc-700 hover:border-zinc-400'}`}
          >
            {isHardwareView ? "⚡ HW VIEW ACTIVE" : "💻 TOGGLE HARDWARE GRAPHICS"}
          </button>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </header>

      {/* ==========================================
          DESKTOP WORKSPACE ICONS
         ========================================== */}
      <main className="absolute inset-0 pt-24 pl-12 flex flex-col gap-8 items-start z-10 w-fit">
        {/* Workspace Folder 1: Projects App */}
        <button 
          onClick={() => setIsProjectWindowOpen(true)}
          className="group flex flex-col items-center justify-center w-20 text-center gap-2 cursor-pointer"
        >
          <div className={`w-14 h-14 rounded-lg flex items-center justify-center border transition-all duration-300 ${isHardwareView ? 'border-emerald-600/30 bg-emerald-950/40 group-hover:bg-emerald-800/40 group-hover:scale-105' : 'border-zinc-800 bg-zinc-900/30 group-hover:bg-zinc-800/50 group-hover:scale-105'}`}>
            <span className="text-2xl">📁</span>
          </div>
          <span className="text-[11px] font-medium tracking-tight truncate w-full">Projects.bin</span>
        </button>

        {/* Workspace Folder 2: Terminal Shell App */}
        <button 
          onClick={() => setIsTerminalOpen(true)}
          className="group flex flex-col items-center justify-center w-20 text-center gap-2 cursor-pointer"
        >
          <div className={`w-14 h-14 rounded-lg flex items-center justify-center border transition-all duration-300 ${isHardwareView ? 'border-emerald-600/30 bg-emerald-950/40 group-hover:bg-emerald-800/40 group-hover:scale-105' : 'border-zinc-800 bg-zinc-900/30 group-hover:bg-zinc-800/50 group-hover:scale-105'}`}>
            <span className="text-xl font-bold font-mono text-center">$_</span>
          </div>
          <span className="text-[11px] font-medium tracking-tight truncate w-full">Core_Shell</span>
        </button>
      </main>

      {/* ==========================================
          MODULAR WINDOW FRAME: PROJECTS APP
         ========================================== */}
      {isProjectWindowOpen && (
        <div 
          style={{ transform: `translate(${projWindowPos.x}px, ${projWindowPos.y}px)` }}
          className={`absolute w-[440px] border rounded-lg overflow-hidden backdrop-blur-xl z-20 transition-colors ${isHardwareView ? 'border-emerald-500/40 bg-zinc-950/90 window-neon-hardware' : 'border-zinc-800 bg-zinc-900/90 window-neon-software'}`}
        >
          {/* Header Draggable Grab bar */}
          <div className={`px-4 py-2 flex justify-between items-center text-xs border-b ${isHardwareView ? 'border-emerald-500/20 bg-emerald-950/30' : 'border-zinc-800 bg-zinc-950/40'}`}>
            <span className="font-semibold tracking-wider">📁 Directory: /projects_meta</span>
            <button onClick={() => setIsProjectWindowOpen(false)} className="hover:text-red-400 font-bold transition-colors cursor-pointer">✕</button>
          </div>
          {/* Main List content view */}
          <div className="p-4 space-y-4 max-h-[320px] overflow-y-auto">
            {PROJECTS.map(proj => (
              <div key={proj.id} className={`p-3 border rounded text-xs transition-all ${isHardwareView ? 'border-emerald-800/50 bg-emerald-950/10 hover:bg-emerald-900/20' : 'border-zinc-800 bg-zinc-950/40 hover:bg-zinc-800/30'}`}>
                <div className="flex justify-between items-center font-bold mb-1">
                  <span className={isHardwareView ? 'text-emerald-300' : 'text-white'}>{proj.name}</span>
                  <span className="text-[10px] opacity-60 px-1.5 py-0.5 rounded border border-current">{proj.tech}</span>
                </div>
                <p className="opacity-80 leading-relaxed">{proj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          MODULAR WINDOW FRAME: SHELL ENGINE TERMINAL
         ========================================== */}
      {isTerminalOpen && (
        <div 
          style={{ transform: `translate(${termWindowPos.x}px, ${termWindowPos.y}px)` }}
          className={`absolute w-[550px] border rounded-lg overflow-hidden backdrop-blur-xl z-30 transition-colors ${isHardwareView ? 'border-emerald-500/40 bg-zinc-950/95 window-neon-hardware' : 'border-zinc-800 bg-zinc-950/95 window-neon-software'}`}
        >
          {/* Bar Wrapper control elements */}
          <div className={`px-4 py-2 flex justify-between items-center text-xs border-b ${isHardwareView ? 'border-emerald-500/20 bg-emerald-950/30' : 'border-zinc-800 bg-zinc-950/40'}`}>
            <span className="font-semibold tracking-wider">⚡ Core_System_Terminal.sh</span>
            <button onClick={() => setIsTerminalOpen(false)} className="hover:text-red-400 font-bold transition-colors cursor-pointer">✕</button>
          </div>
          {/* Log readout display array block */}
          <div className="p-4 text-xs font-mono h-[280px] overflow-y-auto space-y-1 flex flex-col justify-end">
            <div className="overflow-y-auto pr-1 space-y-1">
              {terminalLogs.map((log, index) => (
                <div key={index} className="whitespace-pre-wrap leading-relaxed opacity-90">{log}</div>
              ))}
            </div>
            
            {/* Real-time shell prompt input hook */}
            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 mt-2 pt-2 border-t border-dashed border-current/10">
              <span className={`font-bold ${isHardwareView ? 'text-emerald-300' : 'text-zinc-400'}`}>amanda_shell$</span>
              <input 
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none caret-current text-white font-mono"
                autoFocus
                placeholder="Type 'help'..."
              />
            </form>
          </div>
        </div>
      )}

      {/* Desktop system hint indicator footer */}
      <footer className="absolute bottom-4 left-6 text-[10px] opacity-40 font-mono tracking-tight">
        COMPILER_MODE: {isHardwareView ? "NEON_SCHEMATIC_CIRCUIT" : "STANDARD_VIRTUAL_IDE"}
      </footer>
    </div>
  );
}