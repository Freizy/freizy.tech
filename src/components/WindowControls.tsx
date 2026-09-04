import React from 'react';
import { Minus, Plus, X } from 'lucide-react';

/**
 * Classic macOS traffic lights for telemetry windows.
 * Glyphs appear on hover, just like the real thing.
 * Stays round via .win-controls exemption from the sharp-corner rule.
 */
export const WindowControls: React.FC = () => {
  const dots = [
    { color: 'bg-[#ff5f57]', Icon: X, label: 'Close' },
    { color: 'bg-[#febc2e]', Icon: Minus, label: 'Minimize' },
    { color: 'bg-[#28c840]', Icon: Plus, label: 'Zoom' },
  ];

  return (
    <div className="win-controls group/wc flex gap-1.5" role="toolbar" aria-label="Window controls">
      {dots.map(({ color, Icon, label }) => (
        <button
          key={label}
          type="button"
          title={label}
          aria-label={label}
          className={`tl ${color} w-3 h-3 flex items-center justify-center transition-transform hover:scale-110 active:scale-95`}
        >
          <Icon className="w-2 h-2 text-black/60 opacity-0 group-hover/wc:opacity-100 transition-opacity" strokeWidth={3} />
        </button>
      ))}
    </div>
  );
};
