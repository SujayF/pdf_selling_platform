import React, { useEffect, useRef, useState } from 'react';

export default function NumberPreloader({ duration = 2200, onComplete, className = '' }) {
  const [percent, setPercent] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const containerRef = useRef(null);

  // Circle settings
  const size = 160; // base svg viewport size (we'll scale via Tailwind container)
  const stroke = 2;
  const radius = (size - 10 * stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // animate percentage from 0 -> 100 over `duration` milliseconds
    function step(timestamp) {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const t = Math.min(1, elapsed / duration);
      // easeOutCubic for pleasant feel
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * 100);
      setPercent(value);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        // finish
        setPercent(100);
        if (typeof onComplete === 'function') onComplete();
        // small delay then fade out
        if (containerRef.current) {
          containerRef.current.classList.add('opacity-0');
          setTimeout(() => {
            // remove from DOM visually by setting display none (optional)
            if (containerRef.current) containerRef.current.style.display = 'none';
          }, 400);
        }
      }
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, onComplete]);

  // SVG stroke offset for progress
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      ref={containerRef}
      className={`fixed font-sans inset-0 z-[9999] flex items-center justify-center bg-black text-white transition-opacity duration-400 ${className}`}
      aria-hidden={percent < 100 ? 'false' : 'true'}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Responsive container: mobile small, desktop larger */}
        <div className="relative">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-28 h-28 md:w-40 md:h-40 lg:w-56 lg:h-56"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={`Loading ${percent}%`}
          >
            {/* background circle (subtle) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={stroke}
            />

            {/* progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#ffffff"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 120ms linear' }}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </svg>

          {/* Percentage number centered */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-white font-medium leading-none select-none">
              <span className="text-[16px] md:text-[20px] lg:text-[28px] font-semibold font-sans">{percent}%</span>
            </div>
          </div>
        </div>

        {/* Accessible label for screen readers */}
        <span className="sr-only">Loading {percent} percent</span>
      </div>
    </div>
  );
}
