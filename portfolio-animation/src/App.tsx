import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// ==========================================
// DATA STRUCTURES
// ==========================================
const PROJECTS = [
  { id: 1, name: "NeuralNet_Dashboard.py", tech: "Python / NextJS", desc: "AI-driven cluster analytic interface monitoring deep learning models in real time.", status: "DEPLOYED" },
  { id: 2, name: "Liquid_Distortion.glsl", tech: "WebGL / Three.js", desc: "A high-performance creative fluid shader capturing mouse position vector displacements.", status: "STABLE" },
  { id: 3, name: "Quant_Trading_Bot.cpp", tech: "C++ / WebSockets", desc: "High-frequency trade execution engine running sub-millisecond latencies across exchanges.", status: "COMPILED" },
  { id: 4, name: "Secure_Auth_Core.rust", tech: "Rust / WASM", desc: "Memory-safe cryptographic authentication layout engine protecting decentralized edge points.", status: "ENCRYPTED" },
];

export default function App() {
  // OS System States
  const [isHardwareView, setIsHardwareView] = useState(false);
  const [isProjectWindowOpen, setIsProjectWindowOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  
  // Active Project Card Deck Index Tracker
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  
  // Terminal History States
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "A.M.A.N.D.A Core OS v4.0.26 initialized.",
    "Type 'help' to see available shell variables.",
    ""
  ]);

  // Window states positions
  const [projWindowPos] = useState({ x: 80, y: 140 });
  const [termWindowPos] = useState({ x: 560, y: 220 });

  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Global theme background shift animation loop
  useEffect(() => {
    if (!mainContainerRef.current) return;
    gsap.to(mainContainerRef.current, {
      backgroundColor: isHardwareView ? "#022c22" : "#09090b",
      duration: 0.6,
      ease: "power2.out"
    });
  }, [isHardwareView]);

  // Card deck helper navigators
  const nextProjectCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevProjectCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  // Terminal compiler processor engine
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
        setIsProjectWindowOpen(true);
        response = [`> ${terminalInput}`, "Opening Projects Swiper Container Stack Layer..."];
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
      className={`relative w-screen h-screen overflow-hidden p-6 transition-all duration-300 select-none ${isHardwareView ? 'circuit-grid text-emerald-400' : 'text-zinc-300'}`}
    >
      {/* Scanline atmospheric mesh overlay layer */}
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
        <button 
          onClick={() => setIsProjectWindowOpen(true)}
          className="group flex flex-col items-center justify-center w-20 text-center gap-2 cursor-pointer"
        >
          <div className={`w-14 h-14 rounded-lg flex items-center justify-center border transition-all duration-300 ${isHardwareView ? 'border-emerald-600/30 bg-emerald-950/40 group-hover:bg-emerald-800/40 group-hover:scale-105' : 'border-zinc-800 bg-zinc-900/30 group-hover:bg-zinc-800/50 group-hover:scale-105'}`}>
            <span className="text-2xl">📁</span>
          </div>
          <span className="text-[11px] font-medium tracking-tight truncate w-full">Projects.bin</span>
        </button>

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
          MODULAR DRAGGABLE WINDOW: SWIPER CARD DECK PROJECTS
         ========================================== */}
      {isProjectWindowOpen && (
        <div 
          style={{ transform: `translate(${projWindowPos.x}px, ${projWindowPos.y}px)`, perspective: "1000px" }}
          className={`absolute w-[460px] border rounded-lg overflow-hidden backdrop-blur-xl z-20 transition-colors ${isHardwareView ? 'border-emerald-500/40 bg-zinc-950/90 window-neon-hardware' : 'border-zinc-800 bg-zinc-900/90 window-neon-software'}`}
        >
          {/* Top Bar Controls */}
          <div className={`px-4 py-2 flex justify-between items-center text-xs border-b ${isHardwareView ? 'border-emerald-500/20 bg-emerald-950/30' : 'border-zinc-800 bg-zinc-950/40'}`}>
            <span className="font-semibold tracking-wider">📁 Swipe Deck: /interactive_vault</span>
            <button onClick={() => setIsProjectWindowOpen(false)} className="hover:text-red-400 font-bold transition-colors cursor-pointer">✕</button>
          </div>

          {/* Core Interactive Card Deck Container */}
          <div className="p-6 flex flex-col items-center justify-center min-h-[340px] relative overflow-hidden">
            <div className="w-full h-[220px] relative flex items-center justify-center">
              {PROJECTS.map((proj, idx) => {
                // Calculus logic mapping geometric layer transforms per offset array indexes
                const offset = idx - activeCardIndex;
                const isActive = idx === activeCardIndex;
                
                // Absolute visual boundary clipping limits
                if (Math.abs(offset) > 1) return null;

                return (
                  <div
                    key={proj.id}
                    style={{
                      transform: `
                        translateX(${offset * 140}px) 
                        scale(${isActive ? 1 : 0.82}) 
                        rotateY(${offset * -24}deg)
                        translateZ(${isActive ? 0 : -100}px)
                      `,
                      zIndex: isActive ? 10 : 5,
                    }}
                    className={`absolute w-[240px] h-[210px] p-5 border rounded-xl flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isActive 
                        ? isHardwareView ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_25px_rgba(16,185,129,0.25)]' : 'border-white bg-zinc-900/95 text-white shadow-2xl'
                        : 'opacity-30 border-zinc-800 bg-zinc-950/80 scale-95 pointer-events-none'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] tracking-widest font-mono text-zinc-500 mb-1 uppercase">
                        CODE_STREAM // 0{proj.id}
                      </div>
                      <h3 className={`text-sm font-bold font-mono tracking-tight line-clamp-1 ${isActive && !isHardwareView ? 'text-white' : ''}`}>
                        {proj.name}
                      </h3>
                      <p className="text-[11px] text-zinc-400 font-sans mt-2 line-clamp-4 leading-normal">
                        {proj.desc}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-dashed border-current/10 text-[10px]">
                      <span className="font-mono opacity-60 font-semibold">{proj.tech}</span>
                      <span className={`font-mono px-1.5 py-0.5 rounded text-[9px] border border-current font-bold ${isActive ? 'animate-pulse' : ''}`}>
                        {proj.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Deck Interface Swipe Action Triggers */}
            <div className="flex items-center gap-8 mt-4 z-40">
              <button 
                onClick={prevProjectCard}
                className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${isHardwareView ? 'border-emerald-800 bg-emerald-950/30 hover:border-emerald-400' : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-500 text-white'}`}
              >
                ◀
              </button>
              <span className="text-[11px] font-mono opacity-50 tracking-widest">
                {activeCardIndex + 1} / {PROJECTS.length}
              </span>
              <button 
                onClick={nextProjectCard}
                className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${isHardwareView ? 'border-emerald-800 bg-emerald-950/30 hover:border-emerald-400' : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-500 text-white'}`}
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODULAR DRAGGABLE WINDOW: CORE TERMINAL SHELL
         ========================================== */}
      {isTerminalOpen && (
        <div 
          style={{ transform: `translate(${termWindowPos.x}px, ${termWindowPos.y}px)` }}
          className={`absolute w-[520px] border rounded-lg overflow-hidden backdrop-blur-xl z-30 transition-colors ${isHardwareView ? 'border-emerald-500/40 bg-zinc-950/95 window-neon-hardware' : 'border-zinc-800 bg-zinc-950/95 window-neon-software'}`}
        >
          <div className={`px-4 py-2 flex justify-between items-center text-xs border-b ${isHardwareView ? 'border-emerald-500/20 bg-emerald-950/30' : 'border-zinc-800 bg-zinc-950/40'}`}>
            <span className="font-semibold tracking-wider">⚡ Core_System_Terminal.sh</span>
            <button onClick={() => setIsTerminalOpen(false)} className="hover:text-red-400 font-bold transition-colors cursor-pointer">✕</button>
          </div>
          <div className="p-4 text-xs font-mono h-[280px] overflow-y-auto space-y-1 flex flex-col justify-end">
            <div className="overflow-y-auto pr-1 space-y-1">
              {terminalLogs.map((log, index) => (
                <div key={index} className="whitespace-pre-wrap leading-relaxed opacity-90">{log}</div>
              ))}
            </div>
            
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

      <footer className="absolute bottom-4 left-6 text-[10px] opacity-40 font-mono tracking-tight">
        COMPILER_MODE: {isHardwareView ? "NEON_SCHEMATIC_CIRCUIT" : "STANDARD_VIRTUAL_IDE"}
      </footer>
    </div>
  );
}