"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

/**
 * InteractiveGridPattern is a component that renders a grid pattern with interactive squares.
 *
 * @param width - The width of each square.
 * @param height - The height of each square.
 * @param squares - The number of squares in the grid. The first element is the number of horizontal squares, and the second element is the number of vertical squares.
 * @param className - The class name of the grid.
 * @param squaresClassName - The class name of the squares.
 */
interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number]; // [horizontal, vertical]
  className?: string;
  squaresClassName?: string;
}

/**
 * The InteractiveGridPattern component.
 *
 * @see InteractiveGridPatternProps for the props interface.
 * @returns A React component.
 */
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  return (
    <div className={cn("absolute inset-0 h-full w-full", className)}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width * horizontal} ${height * vertical}`}
        className="h-full w-full"
        {...props}
      >
        <defs>
          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width={width}
              height={height}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-industrial-medium/30"
            />
          </pattern>
        </defs>
        
        {/* Base grid pattern */}
        <rect
          width="100%"
          height="100%"
          fill="url(#grid-pattern)"
        />
        
        {/* Interactive squares */}
        {Array.from({ length: horizontal * vertical }).map((_, index) => {
          const x = (index % horizontal) * width;
          const y = Math.floor(index / horizontal) * height;
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={width}
              height={height}
              className={cn(
                "fill-transparent stroke-transparent transition-all duration-200 ease-in-out cursor-pointer",
                hoveredSquare === index ? "fill-current" : "fill-transparent",
                squaresClassName,
              )}
              onMouseEnter={() => setHoveredSquare(index)}
              onMouseLeave={() => setHoveredSquare(null)}
            />
          );
        })}
      </svg>
    </div>
  );
}