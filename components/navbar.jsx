
'use client'
import React, { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { FaHome, FaUser, FaCode, FaTools } from "react-icons/fa";
import { IoCall, IoColorFill, IoReorderThreeOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { easeIn, easeInOut, motion, AnimatePresence } from 'framer-motion';
import { FaMoon } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";



const DURATION = 0.3;
const STAGGER = 0.03;




/*magnetic icons*/
const Magnetic = ({children}) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({x:0,y:0});

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const {height, width, left, top} = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width/2)
        const middleY = clientY - (top + height/2)
        setPosition({x: middleX, y: middleY})
    }

    const reset = () => {
        setPosition({x:0, y:0})
    }

    const { x, y } = position;
    return (
        <motion.div
            style={{position: "relative"}}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{x, y}}
            transition={{type: "spring", stiffness: 100, damping: 10, mass: 0.1}}
        >
            {children}
        </motion.div>
    )
}

const Navbar = () => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Pages where navbar should be hidden
    const excludedPages = [
        '/commission',
        '/auth',
        '/login',
        '/signup'
    ];
    
    // Don't render navbar on excluded pages
    if (excludedPages.includes(pathname)) {
        return null;
    }

    useEffect(() => {
        const onScroll = () => {
            const triggerHeight = window.innerHeight * 0.05;
            const shouldScroll = window.scrollY > triggerHeight;
            if (scrolled !== shouldScroll) {
                setScrolled(shouldScroll);
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [scrolled]);


    const NavList = [
        { heading: "Home", icons: <FaHome />, id: "home" },
        { heading: "About", icons: <FaUser />, id: "about" },
        { heading: "Projects", icons: <FaCode size={25} />, id: "projects" },
        { heading: "Services", icons: <FaTools />, id: "services" }
    ];

    /*stagger on hover*/
const FlipLink = ({ children, href }) => {

  return (

    <motion.a

      initial="initial"

      whileHover="hovered"

      href={href}

      className="relative block overflow-hidden whitespace-nowrap font-black uppercase text-2xl"


      style={{

        lineHeight: 0.8,

      }}

    >

      <div>

        {children.split("").map((l, i) => (

          <motion.span

            variants={{

              initial: {

                y: 0,

              },

              hovered: {

                y: "-100%",

              },

            }}

            transition={{

              duration: DURATION,

              ease: "easeInOut",

              delay: STAGGER * i,

            }}

            className="inline-block"

            key={i}

          >

            {l}

          </motion.span>

        ))}

      </div>

      <div className="absolute inset-0">

        {children.split("").map((l, i) => (

          <motion.span

            variants={{

              initial: {

                y: "100%",

              },

              hovered: {

                y: 0,

              },

            }}

            transition={{

              duration: DURATION,

              ease: "easeInOut",

              delay: STAGGER * i,

            }}

            className="inline-block"

            key={i}

          >

            {l}

          </motion.span>

        ))}

      </div>

    </motion.a>

  );

};

    return (
        <motion.nav 
        initial={{y:-100,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:0.7,ease:easeInOut}}

        className='fixed w-full mx-auto z-50 mt-5'>
            
                <div className={`
                ${scrolled 
                    ? "w-[90%] md:w-[50%] bg-white/7 backdrop-blur-2xl md:px-10 rounded-full" 
                    : "md:w-[95%] w-full"} 
                mx-auto p-3 py-4  transition-all duration-500 ease-in flex justify-between items-center
                `}>                
                <FlipLink className = 'text-2xl'>lvlrs</FlipLink>
                <ul className='md:flex hidden gap-10 text-xl'>
                    {NavList.map((item, index) => 
                        <li key={index} className='flex items-center gap-2 cursor-pointer'>
                            {!scrolled && <FlipLink href={`#${item.id}`}>{item.heading}</FlipLink>}
                            {scrolled && <Magnetic><a href={`#${item.id}`}>{item.icons}</a></Magnetic>}
                        </li>

                    )}
                </ul>

                <div className='hidden md:flex gap-3'>
                    {!scrolled && <FlipLink>CONTACT</FlipLink>}
                    {scrolled && <Magnetic><IoCall/></Magnetic>}
                </div>

                <div className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <IoMdClose size={40} /> : <IoReorderThreeOutline size={45} />}
                </div>
            </div>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "opacity-100" : "max-h-0 opacity-0"} w-full`}>
                <div className="p-4">
                    {NavList.map((item, i) => (
                        <a key={i} href={`#${item.id}`} className='flex gap-3 items-center my-5 hover:bg-white/20 p-3 rounded-2xl cursor-pointer'>
                            <div className='text-2xl'>{item.icons}</div>
                            <div className='text-2xl'>{item.heading}</div>
                        </a>
                    ))}
                    <button className='w-full h-10 mt-4 bg-white rounded-xl'></button>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar
