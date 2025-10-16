import { motion, useScroll, useTransform } from "framer-motion";

const Background = () => {
  const { scrollYProgress } = useScroll();

  // Revolution radius for the circular motion
  const revRadius = 400;

  // For the first circle: Angular movement from 0 to 0.2 scroll progress
  const angleY1 = useTransform(scrollYProgress, [0, 0.2], [Math.PI / 2, 0]);
  const angleX1 = useTransform(scrollYProgress, [0, 0.2], [Math.PI / 2, 0]);

  // Reverse rotation for the first circle from 0.4 to 0.6 (reverse of above)
  const angleY1Reverse = useTransform(scrollYProgress, [0.4, 0.6], [0, Math.PI / 2]);
  const angleX1Reverse = useTransform(scrollYProgress, [0.4, 0.6], [0, Math.PI / 2]);

  // For the second circle: Angular movement from 0 to 0.2 scroll progress
  const angleX2 = useTransform(scrollYProgress, [0, 0.2], [-Math.PI / 2, 0]);
  const angleY2 = useTransform(scrollYProgress, [0, 0.2], [-Math.PI / 2, 0]);

  // Reverse rotation for the second circle from 0.4 to 0.6 (reverse of above)
  const angleX2Reverse = useTransform(scrollYProgress, [0.4, 0.6], [0, -Math.PI / 2]);
  const angleY2Reverse = useTransform(scrollYProgress, [0.4, 0.6], [0, -Math.PI / 2]);

  // Position calculation for first circle
  const posX1 = useTransform(
    [scrollYProgress, angleX1, angleY1, angleX1Reverse, angleY1Reverse],
    ([latestProgress, latestAngleX, latestAngleY, latestAngleXRev, latestAngleYRev]) => {
      if (latestProgress <= 0.2) {
        // Angular movement from initial position to center
        return Math.cos(latestAngleX) * 400;
      } else if (latestProgress <= 0.4) {
        // Revolution around center
        const angleRad = ((latestProgress - 0.2) / 0.2) * -2 * Math.PI;
        return Math.cos(angleRad) * revRadius;
      } else if (latestProgress <= 0.6) {
        // Reverse angular movement from center back to initial
        return Math.cos(latestAngleXRev) * 400;
      } else if (latestProgress <= 0.8) {
        // Stay at the 0.6 position
        return Math.cos(Math.PI / 2) * 400;
      } else {
        // Transition from 0.6 position to final position
        const progress = (latestProgress - 0.8) / 0.2;
        const startX = Math.cos(Math.PI / 2) * 400;
        const endX = Math.sin(progress * Math.PI / 2) * 1000;
        return startX + (endX - startX) * progress;
      }
    }
  );

  const posY1 = useTransform(
    [scrollYProgress, angleX1, angleY1, angleX1Reverse, angleY1Reverse],
    ([latestProgress, latestAngleX, latestAngleY, latestAngleXRev, latestAngleYRev]) => {
      if (latestProgress <= 0.2) {
        // Angular movement from initial position to center
        return -Math.sin(latestAngleY) * 1000;
      } else if (latestProgress <= 0.4) {
        // Revolution around center
        const angleRad = ((latestProgress - 0.2) / 0.2) * -2 * Math.PI;
        return -Math.sin(angleRad) * revRadius;
      } else if (latestProgress <= 0.6) {
        // Reverse angular movement from center back to initial
        return -Math.sin(latestAngleYRev) * - 1000 ;
      } else if (latestProgress <= 0.8) {
        // Stay at the 0.6 position
        return -Math.sin(Math.PI / 2) * -1000;
      } else {
        // Transition from 0.6 position to final position
        const progress = (latestProgress - 0.8) / 0.2;
        const startY = -Math.sin(Math.PI / 2) * -1000;
        const endY = Math.cos(progress * Math.PI / 2) * 1000;
        return startY + (endY - startY) * progress;
      }
    }
  );

  // Position calculation for second circle
  const posX2 = useTransform(
    [scrollYProgress, angleX2, angleY2, angleX2Reverse, angleY2Reverse],
    ([latestProgress, latestAngleX, latestAngleY, latestAngleXRev, latestAngleYRev]) => {
      if (latestProgress <= 0.2) {
        // Angular movement from initial position to center
        return -Math.cos(latestAngleX) * 400;
      } else if (latestProgress <= 0.4) {
        // Revolution around center
        const angleRad = ((latestProgress - 0.2) / 0.2) * -2 * Math.PI;
        return -Math.cos(angleRad) * revRadius;
      } else if (latestProgress <= 0.6) {
        // Reverse angular movement from center back to initial
        return -Math.cos(latestAngleXRev) * 400;
      } else if (latestProgress <= 0.8) {
        // Rotate and move to position of first circle
        const progress = (latestProgress - 0.6) / 0.2;
        const startX = -Math.cos(Math.PI / 2) * 400;
        const endX = Math.cos(Math.PI / 2) * 400; // Position of first circle
        return startX + (endX - startX) * progress;
      } else {
        // Transition from first circle position to final position
        const progress = (latestProgress - 0.8) / 0.2;
        const startX = Math.cos(Math.PI / 2) * 400;
        const endX = Math.sin(progress * -Math.PI / 2) * 1000;
        return startX + (endX - startX) * progress;
      }
    }
  );

  const posY2 = useTransform(
    [scrollYProgress, angleX2, angleY2, angleX2Reverse, angleY2Reverse],
    ([latestProgress, latestAngleX, latestAngleY, latestAngleXRev, latestAngleYRev]) => {
      if (latestProgress <= 0.2) {
        // Angular movement from initial position to center
        return -Math.sin(latestAngleY) * 1000;
      } else if (latestProgress <= 0.4) {
        // Revolution around center
        const angleRad = ((latestProgress - 0.2) / 0.2) * -2 * Math.PI;
        return Math.sin(angleRad) * revRadius;
      } else if (latestProgress <= 0.6) {
        // Reverse angular movement from center back to initial
        return Math.sin(latestAngleYRev) * 1000;
      } else if (latestProgress <= 0.8) {
        // Rotate and move to position of first circle
        const progress = (latestProgress - 0.6) / 0.2;
        const startY = Math.sin(Math.PI / 2) * 1000;
        const endY = -Math.sin(Math.PI / 2) * -1000; // Position of first circle
        return startY + (endY - startY) * progress;
      } else {
        // Transition from first circle position to final position
        const progress = (latestProgress - 0.8) / 0.2;
        const startY = -Math.sin(Math.PI / 2) * -1000;
        const endY = Math.cos(progress * -Math.PI / 2) * 1000;
        return startY + (endY - startY) * progress;
      }
    }
  );

  return (
    <div>
      <motion.div
        className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center pointer-events-none z-0"
        style={{
          scale: useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [1.5, 0.5, 0.5, 1.5]),
          translateX: posX1,
          translateY: posY1,
          rotate: useTransform(scrollYProgress, [0,0.2,0.4,0.6],["0deg","90deg","450deg","540deg"]),
          height: "80vw",
          maxHeight: "100vh",
        }}
      >
        <div
          style={{
            width: "80vw",
            height: "80vw",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "4px solid rgba(255, 255, 255, 0.33)",
              filter: "blur(3px)",
              background: "transparent",
              boxSizing: "border-box",
              position: "absolute",
              top: 0,
              left: 0,
              boxShadow: `
                inset 0 -60px 120px 0 rgba(255, 255, 255, 0.25),
                0 0 100px 8px rgba(255, 255, 255, 0.5)
              `,
            }}
          />
        </div>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center pointer-events-none z-0"
        style={{
          scale: useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8], [1.5, 0.5, 0.5, 1.5, 1.5]),
          translateX: posX2,
          translateY: posY2,
          rotate: useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8], ["0deg", "90deg", "450deg", "540deg", "720deg"]),
          height: "80vw",
          maxHeight: "100vh",
        }}
      >
        <div
          style={{
            width: "80vw",
            height: "80vw",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "4px solid rgba(255, 255, 255, 0.16)",
              filter: "blur(3px)",
              background: "transparent",
              boxSizing: "border-box",
              position: "absolute",
              top: 0,
              left: 0,
              boxShadow: `
                inset 0 60px 60px 0 rgba(255, 255, 255, 0.16),
                0 0 100px 8px rgba(255, 255, 255, 0.5)
              `,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Background;
