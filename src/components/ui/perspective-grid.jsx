import React, { useEffect, useState, useMemo } from "react";
import { cn } from "../../lib/utils.js";

const hoverColors = [
    "hover:bg-[#00d2ff] hover:border-[#00d2ff]/80 hover:shadow-[0_0_10px_rgba(0,210,255,0.4)]",
    "hover:bg-[#00a2ff] hover:border-[#00a2ff]/80 hover:shadow-[0_0_10px_rgba(0,162,255,0.4)]",
    "hover:bg-[#0072ff] hover:border-[#0072ff]/80 hover:shadow-[0_0_10px_rgba(0,114,255,0.4)]",
    "hover:bg-[#00f5ff] hover:border-[#00f5ff]/80 hover:shadow-[0_0_10px_rgba(0,245,255,0.4)]"
];

export function PerspectiveGrid({
    className,
    gridSize = 40,
    showOverlay = true,
    fadeRadius = 80,
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Memoize tiles array to prevent unnecessary re-renders
    const tiles = useMemo(() => Array.from({ length: gridSize * gridSize }), [gridSize]);

    return (
        <div
            className={cn(
                "relative w-full h-full overflow-hidden bg-[#0d1b2e]",
                "[--fade-stop:#0d1b2e]",
                className
            )}
            style={{
                perspective: "2000px",
                transformStyle: "preserve-3d",
            }}
        >
            <div
                className="absolute w-[80rem] aspect-square grid origin-center"
                style={{
                    left: "50%",
                    top: "50%",
                    transform:
                        "translate(-50%, -50%) rotateX(30deg) rotateY(-5deg) rotateZ(20deg) scale(2)",
                    transformStyle: "preserve-3d",
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                }}
            >
                {/* Tiles */}
                {mounted &&
                    tiles.map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "tile min-h-[1px] min-w-[1px] border border-[#1e3457]/80 bg-transparent transition-all duration-[1500ms] hover:duration-0",
                                hoverColors[i % hoverColors.length]
                            )}
                        />
                    ))}
            </div>

            {/* Radial Gradient Mask (Overlay) */}
            {showOverlay && (
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        background: `radial-gradient(circle, transparent 25%, var(--fade-stop) ${fadeRadius}%)`,
                    }}
                />
            )}
        </div>
    );
}

export default PerspectiveGrid;
