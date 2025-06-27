
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  rotation: number;
}

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const rafRef = useRef<number>();
  const moveTimerRef = useRef<NodeJS.Timeout>();

  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Clear existing timer
      if (moveTimerRef.current) {
        clearTimeout(moveTimerRef.current);
      }

      // Create sparkle with reduced frequency for better performance
      if (Math.random() > 0.85) {
        const newSparkle: Sparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          opacity: 1,
          scale: Math.random() * 0.4 + 0.6,
          rotation: Math.random() * 360,
        };

        setSparkles(prev => {
          // Limit sparkles to prevent memory issues
          const newSparkles = [...prev, newSparkle];
          return newSparkles.length > 8 ? newSparkles.slice(-8) : newSparkles;
        });

        // Remove sparkle after animation
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 800);
      }

      // Set moving to false after no movement
      moveTimerRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 80);
    });
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', updateMousePosition, { passive: true });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (moveTimerRef.current) {
        clearTimeout(moveTimerRef.current);
      }
    };
  }, [updateMousePosition]);

  return (
    <>
      {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference will-change-transform"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${isMoving ? 1.2 : 1})`,
          transition: 'transform 0.08s ease-out',
        }}
      >
        <div className="w-4 h-4 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50">
          <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-75"></div>
        </div>
      </div>

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-40 will-change-transform"
          style={{
            left: sparkle.x - 6,
            top: sparkle.y - 6,
            transform: `scale(${sparkle.scale}) rotate(${sparkle.rotation}deg)`,
            opacity: sparkle.opacity,
            animation: 'sparkle-fade 0.8s ease-out forwards',
          }}
        >
          <Sparkles className="w-3 h-3 text-teal-400 drop-shadow-lg" />
        </div>
      ))}
    </>
  );
};

export default CustomCursor;
