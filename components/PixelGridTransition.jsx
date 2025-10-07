"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const PixelGridTransition = ({ onAnimationComplete }) => {
  const controls = useAnimation();
  const gridSize = 10; // 10x10 grid
  const pixels = Array.from({ length: gridSize * gridSize });

  useEffect(() => {
    controls.start(i => ({
      opacity: 0,
      transition: {
        delay: Math.random() * 0.5 + i * 0.02,
        duration: 0.4,
        ease: "easeInOut",
      },
    })).then(() => {
      if (onAnimationComplete) onAnimationComplete();
    });
  }, [controls, onAnimationComplete]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {pixels.map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          initial={{ opacity: 1 }}
          animate={controls}
          style={{
            backgroundColor: "#000",
            width: "100%",
            height: "100%",
          }}
        />
      ))}
    </div>
  );
};

export default PixelGridTransition;
