"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // Use MotionValues for performance
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring physics for smooth movement
    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Default position
            let targetX = e.clientX;
            let targetY = e.clientY;

            // Check for magnetic elements
            const target = e.target as HTMLElement;
            const magneticElement = target.closest('[data-magnetic="true"]') as HTMLElement;

            if (magneticElement) {
                const rect = magneticElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Magnetic pull strength (0.3 means cursor moves 30% towards center)
                targetX = e.clientX + (centerX - e.clientX) * 0.3;
                targetY = e.clientY + (centerY - e.clientY) * 0.3;
            }

            cursorX.set(targetX);
            cursorY.set(targetY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.closest('[data-magnetic="true"]') ||
                target.classList.contains("cursor-pointer")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main Dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                }}
            />

            {/* Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isClicking ? 1.2 : isHovering ? 2.5 : 1,
                    opacity: isClicking ? 0.5 : 1
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                }}
            />
        </>
    );
}
