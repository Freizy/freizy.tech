import { type FC } from "react";
import { Minus, Square, X } from "lucide-react";

/**
 * Windows-style caption buttons for telemetry windows.
 * Minimal glyphs, hover states, red close — sharp to match the site.
 */
export const WindowControls: FC = () => {
  const btns = [
    { Icon: Minus, label: "Minimize", close: false },
    { Icon: Square, label: "Maximize", close: false },
    { Icon: X, label: "Close", close: true },
  ];

  return (
    <div className="flex items-center" role="toolbar" aria-label="Window controls">
      {btns.map(({ Icon, label, close }) => (
        <button
          key={label}
          type="button"
          title={label}
          aria-label={label}
          className={`px-2 py-1.5 flex items-center justify-center text-[#6e6e73] dark:text-neutral-400 transition-colors ${
            close
              ? "hover:bg-[#ed1c24] hover:text-white"
              : "hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
          }`}
        >
          <Icon className="w-3 h-3" strokeWidth={2} />
        </button>
      ))}
    </div>
  );
};
