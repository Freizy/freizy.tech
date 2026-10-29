import { type FC } from "react";
import { Minus, Square, X } from "lucide-react";

/**
 * Decorative Windows-style caption buttons for the telemetry mockups.
 * They are part of the illustration, not real controls, so they are
 * exposed as one hidden group instead of three dead buttons.
 */
export const WindowControls: FC = () => {
  const icons = [Minus, Square, X];

  return (
    <div className="flex items-center" aria-hidden="true">
      {icons.map((Icon, i) => (
        <span
          key={i}
          className="px-2 py-1.5 flex items-center justify-center text-[#6e6e73] dark:text-neutral-400"
        >
          <Icon className="w-3 h-3" strokeWidth={2} />
        </span>
      ))}
    </div>
  );
};
