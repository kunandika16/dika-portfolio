import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, Globe, User, Cpu, Network } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const TypewriterEffect = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayText("");
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[#0a0a0a]" />
    <div
      className="absolute inset-0 opacity-40"
      style={{
        background:
          "radial-gradient(circle at center, rgba(14,165,233,0.15), transparent 70%)",
      }}
    />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
  </div>
);

const IconButton = ({ Icon, label, delay }) => (
  <div
    className="relative group animate-float"
    style={{ animationDelay: delay }}
  >
    <div className="absolute -inset-2 bg-gradient-to-r from-sky-600/20 to-cyan-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
    <div className="relative flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/20 to-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-5 h-5 text-sky-300" />
      </span>
      <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">
        {label}
      </span>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-sky-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-sky-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </div>
);

// Neural Network / Constellation Animation
const NetworkAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
      {/* Generating random nodes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-sky-500 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0.2,
          }}
          animate={{
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* SVG Lines connecting approximate regions - Purely decorative effect */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient
            id="line-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(14, 165, 233, 0)" />
            <stop offset="50%" stopColor="rgba(14, 165, 233, 0.2)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="50%"
          cy="50%"
          r="20%"
          stroke="url(#line-gradient)"
          strokeWidth="1"
          fill="none"
          animate={{ rotate: 360, scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="35%"
          stroke="url(#line-gradient)"
          strokeWidth="1"
          fill="none"
          style={{ strokeDasharray: "10 20" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
};

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const loadingDuration = 3000;

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Timer to finish loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => onLoadingComplete?.(), 1000); // Wait for exit animation
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <BackgroundEffect />
          <NetworkAnimation />

          {/* Main Content Container - Central Hub */}
          <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center justify-center text-center">
            {/* Top Status Pills */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[0.6rem] uppercase tracking-[0.2em] text-gray-400 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Andika Rian Ansari
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[0.6rem] uppercase tracking-[0.2em] text-gray-400 backdrop-blur-sm">
                <Cpu className="w-3 h-3 text-sky-400" />
                Freelancer
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative mb-8"
            >
              <div className="absolute -inset-10 bg-sky-500/20 blur-[50px] rounded-full opacity-50 animate-pulse" />
              <h1 className="relative text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400">
                  Wellcome to My Portfolio
                </span>
              </h1>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-sky-500 to-transparent rounded-full" />
            </motion.div>

            {/* Typewriter Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-12"
            >
              <div className="text-xl md:text-2xl font-light text-gray-300 font-mono">
                <span className="text-sky-500">{">"}</span>{" "}
                <TypewriterEffect
                  text="Initializing Creative Portfolio..."
                  speed={50}
                />
              </div>
            </motion.div>

            {/* Action Buttons / Grid */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl px-4"
            >
              <IconButton Icon={Code2} label="Projects" delay="0s" />
              <IconButton Icon={User} label="About" delay="0.1s" />
              <IconButton Icon={Github} label="Github" delay="0.2s" />
              <IconButton Icon={Globe} label="Contact" delay="0.3s" />
            </motion.div>
          </div>

          {/* Corner Stats */}
          <div className="absolute bottom-6 left-6 hidden md:block">
            <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-gray-500 font-mono">
              <Network className="w-3 h-3" />
              <span>Neural Link: Connected</span>
            </div>
          </div>
          <div className="absolute bottom-6 right-6 hidden md:block">
            <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-gray-500 font-mono">
              <span className="animate-ping w-1 h-1 bg-green-500 rounded-full" />
              <span>Latency: 12ms</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
