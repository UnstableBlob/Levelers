import { motion, useScroll, useTransform } from "framer-motion";

const BackgroundStatic = () => {


  return (
    <div>
      <motion.div
        className="fixed  top-[-1000] left-0 w-screen h-screen flex justify-center items-center pointer-events-none z-0"
        style={{ scale: 1.5 }}
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
        className="fixed top-[1000] left-0 w-screen h-screen flex justify-center items-center pointer-events-none z-0"
        style={{scale:1.5}}
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

export default BackgroundStatic;
