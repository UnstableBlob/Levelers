'use client'

import Image from "next/image";
import { useEffect,useRef,targetRef} from "react";
import React from "react";
import Hero from "../components/hero.jsx";
import Services from "../components/services.jsx";
import Projects from "../components/projects.jsx";
import Footer from "../components/footer.jsx";
import Lenis from 'lenis';
import TopImage from '../images/Top glass.svg';
import BottomImage from '../images/Bottom glass.svg';
import framer, { easeIn } from "framer-motion";
import {motion,useScroll,useTransform} from "framer-motion"



const Background = () => {

  // Reference for the scrolling container (you can use null for full-page scroll)
  const ref = useRef(null);

  // Get normalized scroll progress (0 - top, 1 - bottom of page)
  const { scrollYProgress } = useScroll({target:targetRef,});

 //for bottom image

  





  return (
    <>
      <div   >
      <motion.div
        ref={targetRef}
        style={{scale:useTransform( scrollYProgress, [0, 1], [1.2, 0.5]),
                translateX: useTransform( scrollYProgress, [0, 1], [0, +800]),
                translateY: useTransform( scrollYProgress, [0, 1], [-1500, 0]),
                rotate: useTransform( scrollYProgress, [0,1], ["0deg", "0deg"]),
          }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <Image
          src={TopImage}
          alt="TopGlass logo"
          fill
          className="w-full h-full z-0"
          priority
        />
      </motion.div>
            <motion.div
        style={{
            scale: useTransform( scrollYProgress, [0, 1], [1.5, 0.5]),
            translateX: useTransform( scrollYProgress, [0, 1], [0, -800]),
            translateY: useTransform( scrollYProgress, [0, 1], [900, 800]),
            rotate: useTransform( scrollYProgress, [0,1], ["0deg", "90deg"]),
        }}
        className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
      >
        <Image
          src={BottomImage}
          alt="BottomGlass logo"
          fill
          className="w-full h-full z-0"
          priority
        />
      </motion.div>



    </div>
    </>
  );
};



export default function Home() {

  // SMOOTH SCROLLING
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background images */}
      <Background></Background>


      {/* Content OVER overlapped images */}
      <div className="relative z-10">
        <Hero />
        <Services />
      </div>
    </div>
  );
}
