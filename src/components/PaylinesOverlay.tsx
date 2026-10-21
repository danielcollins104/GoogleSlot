import React from 'react';
import { WinningLine } from '../types/game';

interface PaylinesOverlayProps {
  winningLines: WinningLine[];
  activeLineIndex?: number | null;
}

const LINE_COLORS = [
  '#f59e0b', // Amber/Gold
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#14b8a6'  // Teal
];

export const PaylinesOverlay: React.FC<PaylinesOverlayProps> = ({ winningLines, activeLineIndex = null }) => {
  if (winningLines.length === 0) return null;

  // Filter to active line or show all if none specifically active
  const linesToRender = activeLineIndex !== null
    ? winningLines.filter(l => l.lineIndex === activeLineIndex)
    : winningLines.slice(0, 3); // show up to 3 dominant lines to keep screen clean

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
      viewBox="0 0 500 300"
      preserveAspectRatio="none"
    >
      <defs>
        {LINE_COLORS.map((color, idx) => (
          <filter key={idx} id={`glowLine-${idx}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        ))}
      </defs>

      {linesToRender.map((line, idx) => {
        const color = LINE_COLORS[line.lineIndex % LINE_COLORS.length];
        
        // Calculate cell center points: 5 columns (0..4), 3 rows (0..2)
        // Col width = 100, Row height = 100. Center of col c: c * 100 + 50, Center of row r: r * 100 + 50
        const points = line.positions.map(([col, row]) => {
          const x = col * 100 + 50;
          const y = row * 100 + 50;
          return `${x},${y}`;
        });

        const pathData = `M ${points.join(' L ')}`;

        return (
          <g key={line.lineIndex}>
            {/* Outer Glow */}
            <path
              d={pathData}
              fill="none"
              stroke={color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
              filter={`url(#glowLine-${idx})`}
            />
            {/* Core Bright Beam */}
            <path
              d={pathData}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.95"
            />
            {/* Pin nodes at each matched position */}
            {line.positions.map(([col, row], pIdx) => {
              const cx = col * 100 + 50;
              const cy = row * 100 + 50;
              return (
                <g key={pIdx}>
                  <circle cx={cx} cy={cy} r="6" fill={color} />
                  <circle cx={cx} cy={cy} r="3" fill="#ffffff" />
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};
