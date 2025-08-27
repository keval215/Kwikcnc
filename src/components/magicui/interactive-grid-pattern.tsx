"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";

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
  /**
   * When true, the component auto-fits the grid to the viewport so it covers the whole page
   * and aligns the grid lines to the edges. Ignores `squares` prop.
   */
  autoFit?: boolean;
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
  autoFit = true,
  ...props
}: InteractiveGridPatternProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevCellRef = useRef<{ col: number; row: number } | null>(null);

  // Compute cols/rows to fill viewport (or use provided squares)
  const [colsRows, setColsRows] = useState<[number, number]>(squares);
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  // Trail intensities 0..1 per cell
  const [intensities, setIntensities] = useState<Float32Array>(() => new Float32Array(squares[0] * squares[1]));
  const animRef = useRef<number | null>(null);
  const lastTsRef = useRef<number>(0);
  // Exponential decay for smoother fade; half-life controls trail length
  const HALF_LIFE_SEC = 0.5; // shorter trail so only previous cell remains briefly
  const DECAY_LAMBDA = Math.log(2) / HALF_LIFE_SEC;

  const [cellSize, setCellSize] = useState<{ w: number; h: number }>({ w: width, h: height });

  useEffect(() => {
    if (!autoFit) {
      setColsRows(squares);
      setCellSize({ w: width, h: height });
      return;
    }

    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Fit cell size so cols/rows are integers and the grid aligns with edges
      const cols = Math.max(1, Math.round(vw / width));
      const fittedW = vw / cols;
      const rows = Math.max(1, Math.round(vh / height));
      const fittedH = vh / rows;
      setCellSize({ w: fittedW, h: fittedH });
  setColsRows([cols, rows]);
  // Resize intensity buffer when grid changes
  setIntensities(new Float32Array(cols * rows));
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [autoFit, width, height, squares]);

  const [horizontal, vertical] = colsRows;
  const viewW = useMemo(() => cellSize.w * horizontal, [cellSize.w, horizontal]);
  const viewH = useMemo(() => cellSize.h * vertical, [cellSize.h, vertical]);

  // Track mouse globally so hover works even when the grid is behind content
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
  const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        setHoveredSquare(null);
        return;
      }
  // Map client pixels -> viewBox -> indices
  const vx = (x / rect.width) * viewW;
  const vy = (y / rect.height) * viewH;
  const col = Math.min(horizontal - 1, Math.max(0, Math.floor(vx / cellSize.w)));
  const row = Math.min(vertical - 1, Math.max(0, Math.floor(vy / cellSize.h)));
      const idx = row * horizontal + col;
      setHoveredSquare(idx);
      // Stamp only current cell and the previous cell (single neighbor behind)
      setIntensities((old) => {
        const arr = new Float32Array(old.length);
        arr.set(old);
        const w = horizontal;
        const h = vertical;
        const stamp = (cx: number, cy: number, weight: number) => {
          if (cx < 0 || cy < 0 || cx >= w || cy >= h) return;
          const i = cy * w + cx;
          arr[i] = Math.max(arr[i], Math.min(1, weight));
        };
        const cx = idx % w;
        const cy = Math.floor(idx / w);
        // center - full black
        stamp(cx, cy, 1.0);
        // stamp previous cell (the one just behind cursor)
        const lastCell = prevCellRef.current;
        if (lastCell) {
          stamp(lastCell.col, lastCell.row, 0.6);
        }
        // update prev for next movement
        prevCellRef.current = { col: cx, row: cy };
        return arr;
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [horizontal, vertical]);

  // Decay animation loop
  useEffect(() => {
  const step = (ts: number) => {
      const dt = Math.min(0.1, (ts - lastTsRef.current) / 1000 || 0); // cap dt for tab switches
      lastTsRef.current = ts;
      let changed = false;
      setIntensities((prev) => {
        const next = new Float32Array(prev.length);
        for (let i = 0; i < prev.length; i++) {
          const v = prev[i];
          if (v > 0) {
      const factor = Math.exp(-DECAY_LAMBDA * dt);
      const nv = v * factor;
            next[i] = nv;
            if (nv !== v) changed = true;
          } else next[i] = 0;
        }
        return changed ? next : prev;
      });
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        // Keep it positioned but don't block interactions above
        "absolute inset-0 h-full w-full pointer-events-none",
        className
      )}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="h-full w-full"
        preserveAspectRatio="none"
        // Allow pointer to pass through unless we specifically set it on shapes
        style={{ pointerEvents: "none" }}
        {...props}
      >
        <g shapeRendering="crispEdges">
        <defs>
          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width={cellSize.w}
            height={cellSize.h}
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width={cellSize.w}
              height={cellSize.h}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className="text-industrial-medium/15"
            />
          </pattern>
        </defs>
        
        {/* Base grid pattern */}
        <rect
          width="100%"
          height="100%"
          fill="url(#grid-pattern)"
        />
        
        {/* Interactive squares with fading trail */}
        {Array.from({ length: horizontal * vertical }).map((_, index) => {
          const x = (index % horizontal) * width;
          const y = Math.floor(index / horizontal) * height;
          const a = intensities[index] ?? 0;

          return (
            <rect
              key={index}
              x={(index % horizontal) * cellSize.w}
              y={Math.floor(index / horizontal) * cellSize.h}
              width={cellSize.w}
              height={cellSize.h}
              fill={a > 0 ? `rgba(0,0,0,${Math.min(1, a)})` : "transparent"}
              stroke={a > 0 ? `rgba(0,0,0,${Math.min(1, a)})` : "transparent"}
              className={cn(
                "transition-all duration-200 ease-in-out",
                squaresClassName
              )}
              // Explicitly enable pointer events on the rects only. Since we track globally,
              // this is mainly for correct cursor feedback when the grid is on top.
              style={{ pointerEvents: "auto" }}
            />
          );
        })}
        </g>
      </svg>
    </div>
  );
}