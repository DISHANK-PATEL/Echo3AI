
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    let moveTimer: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Clear existing timer
      clearTimeout(moveTimer);

      // Create sparkle on movement
      if (Math.random() > 0.7) {
        const newSparkle: Sparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 30,
          opacity: 1,
          scale: Math.random() * 0.5 + 0.5,
          rotation: Math.random() * 360,
        };

        setSparkles(prev => [...prev, newSparkle]);

        // Remove sparkle after animation
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 1000);
      }

      // Set moving to false after 100ms of no movement
      moveTimer = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(moveTimer);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${isMoving ? 1.2 : 1})`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="w-4 h-4 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50 animate-pulse">
          <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-75"></div>
        </div>
      </div>

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: sparkle.x - 6,
            top: sparkle.y - 6,
            transform: `scale(${sparkle.scale}) rotate(${sparkle.rotation}deg)`,
            opacity: sparkle.opacity,
            animation: 'sparkle-fade 1s ease-out forwards',
          }}
        >
          <Sparkles className="w-3 h-3 text-teal-400 drop-shadow-lg" />
        </div>
      ))}
    </>
  );
};

export default CustomCursor;
