import { type FC } from "react";
import logoPng from "../assets/logo.png";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  invertedText?: boolean;
}

export const BrandLogo: FC<BrandLogoProps> = ({
  size = "md",
  showText = true,
  className = "",
  invertedText = false,
}) => {
  const sizeMap = {
    sm: { iconSize: 26, textSize: "text-[15px]", subSize: "text-[8px]" },
    md: { iconSize: 32, textSize: "text-[18px]", subSize: "text-[9px]" },
    lg: { iconSize: 38, textSize: "text-[22px]", subSize: "text-[10px]" },
  };

  const s = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <img
        src={logoPng}
        alt="Freizy Technologies logo"
        className="flex-shrink-0 object-contain"
        style={{ height: s.iconSize, width: 'auto' }}
      />

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-display font-bold uppercase ${s.textSize} ${
              invertedText ? "text-white" : "text-[#1d1d1f] dark:text-white"
            }`}
            style={{ letterSpacing: "0.08em" }}
          >
            Freizy
          </span>
          <span
            className={`font-display font-medium uppercase ${s.subSize} ${
              invertedText ? "text-neutral-400" : "text-[#6e6e73] dark:text-neutral-400"
            }`}
            style={{ letterSpacing: "0.3em" }}
          >
            Technologies
          </span>
        </div>
      )}
    </div>
  );
};
