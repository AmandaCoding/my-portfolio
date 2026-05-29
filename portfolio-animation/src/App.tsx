import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

// ==========================================
// 1. MAGNETIC WRAPPER COMPONENT
// ==========================================
interface MagneticProps {
  children: ReactNode;
}

export const Magnetic = ({ children }: MagneticProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      
      // Calculate absolute center point of our target element
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Distance vectors from cursor to center
      const moveX = clientX - centerX;
      const moveY = clientY - centerY;

      // Animate the physical element towards the cursor position (pull strength: 35%)
      gsap.to(element, {
        x: moveX * 0.35,
        y: moveY * 0.35,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      // Snap element back to its resting origin state using an elastic spring curve
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseleave", onMouseLeave);

    return () => {
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="inline-block">
      {children}
    </div>
  );
};

// ==========================================
// 2. THE CUSTOM CURSOR ENGINE
// ==========================================
export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center absolute coordinate frame tracking & hide until movement detected
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });

    // High performance quickTo setters for frame-rate interpolation
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      // First frame reveal step
      gsap.to(cursor, { scale: 1, duration: 0.3, overwrite: "auto" });
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Event Delegation: Scrapes elements for data-cursor markup attributes
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor="pointer"]');
      if (target) {
        gsap.to(cursor, {
          scale: 3.5,
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
          duration: 0.3,
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor="pointer"]');
      if (target) {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "transparent",
          mixBlendMode: "normal",
          duration: 0.3,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-5 h-5 border border-white rounded-full pointer-events-none z-50 mix-blend-normal will-change-transform"
    />
  );
};

// ==========================================
// 3. IMPLEMENTATION DEMONSTRATION LAYOUT
// ==========================================
export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center gap-12 select-none font-sans">
      {/* Absolute cursor layer injected at root */}
      <CustomCursor />

      <div className="text-center space-y-2">
        <h1 className="text-5xl font-extrabold tracking-tighter uppercase">
          Studio Architecture
        </h1>
        <p className="text-zinc-500 text-sm">Hover over elements below to test fluid mechanics</p>
      </div>

      <div className="flex gap-12 items-center">
        {/* Basic Hover Element (Scales up & flips overlay layout contrast color) */}
        <a 
          href="#work" 
          data-cursor="pointer" 
          className="text-lg font-medium underline underline-offset-8 decoration-zinc-700 hover:decoration-white transition-colors duration-300"
        >
          Explore Work
        </a>

        {/* Compound Element (Triggers full magnetic frame pull + micro color fluid inversion) */}
        <Magnetic>
          <button 
            data-cursor="pointer" 
            className="px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-zinc-800 transition-colors duration-200"
          >
            Launch Project
          </button>
        </Magnetic>
      </div>
    </div>
  );
}