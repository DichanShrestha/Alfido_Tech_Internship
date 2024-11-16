import React, { CSSProperties } from "react";
import { cn } from "../../lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.2em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background,
      variant = "primary",
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Define color schemes for different variants
    const getVariantStyles = () => {
      switch (variant) {
        case "primary":
          return {
            background: "#FFA500", // Vibrant Orange
            shimmerColor: "#FFFFFF", // White shimmer
          };
        case "secondary":
          return {
            background: "#0055FF", // Deep Blue
            shimmerColor: "#FFFFFF", // White shimmer
          };
        case "tertiary":
          return {
            background: "#808080", // Neutral Gray
            shimmerColor: "#FFFFFF", // White shimmer
          };
        default:
          return {
            background: background || "rgba(0, 0, 0, 1)", // Default background
            shimmerColor: shimmerColor || "#ffffff", // Default shimmer
          };
      }
    };

    const { background: variantBackground, shimmerColor: variantShimmerColor } =
      getVariantStyles();

    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": variantShimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": variantBackground,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] dark:text-black",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Spark container */}
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "absolute inset-0 overflow-visible [container-type:size]"
          )}
        >
          {/* Spark */}
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            {/* Spark before */}
            <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>
        {children}

        {/* Highlight */}
        <div
          className={cn(
            "insert-0 absolute size-full",
            "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
            "transform-gpu transition-all duration-300 ease-in-out",
            "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
            "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
          )}
        />

        {/* Backdrop */}
        <div
          className={cn(
            "absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"
          )}
        />
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;
