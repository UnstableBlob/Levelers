"use client";
import React from "react";
import { motion } from "framer-motion";

/* ========= Animation Variants ========= */
const heightVariant = {
  initial: { height: 0 },
  enter: (i) => ({
    height: "100%",
    transition: {
      duration: 0.5,
      delay: 0.05 * i,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
  exit: (i) => ({
    height: 0,
    transition: {
      duration: 0.3,
      delay: 0.05 * i,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

const backgroundVariant = {
  initial: { opacity: 0 },
  enter: {
    opacity: 0.5,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

const opacityVariant = {
  initial: { opacity: 0 },
  enter: (i) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      delay: i,
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

const slideLeftVariant = {
  initial: { x: 150 },
  enter: {
    x: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    x: 150,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

const rotateXVariant = {
  initial: { rotateX: 90, opacity: 0 },
  enter: (i) => ({
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.3 + i * 0.05,
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

/* Universal mountAnim config */
const mountAnim = { initial: "initial", animate: "enter", exit: "exit" };

/* ========= Stairs Component ========= */
export default function Stairs() {
  const styles = {
    stairs: {
      top: 0,
      left: 0,
      position: "fixed",
      zIndex: 2,
      height: "100vh",
      width: "100%",
      display: "flex",
      pointerEvents: "none",
      transition: "all 1s ease",
    },
    stair: {
      width: "20vw",
      height: "100%",
      backgroundColor: "black",
    },
    background: {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "#ffffff00",
    },
  };

  return (
    <motion.div style={styles.stairs}>
      {/* 5 animated vertical stairs */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          variants={heightVariant}
          {...mountAnim}
          custom={4 - index}
          style={styles.stair}
        />
      ))}

      {/* Background overlay */}
      <motion.div
        variants={backgroundVariant}
        {...mountAnim}
        style={styles.background}
      />
    </motion.div>
  );
}
