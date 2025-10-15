'use client'

import Image from "next/image";
import { useEffect, useRef, useState} from "react";
import Hero from "../components/hero.jsx";
import AboutUs from "../components/aboutus.jsx";
import Services from "../components/services.jsx";
import Projects from "../components/projects.jsx";
import Reviews from "../components/reviews.jsx";
import ContactUs from "../components/contactus.jsx";
import Navbar from "../components/navbar.jsx";
import { useRouter } from "next/navigation";
import Background from "@/components/Background.jsx";
import FAQPage from "@/components/faq.jsx";

import Lenis from 'lenis';
import { motion, useScroll, useTransform } from "framer-motion";
import { FaQq } from "react-icons/fa";




export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* <Background /> */}
      <div className="relative z-10">
        <Hero />
        <Services />
        <Reviews />
        <FAQPage />

      
      </div>
    </div>
  );
}
