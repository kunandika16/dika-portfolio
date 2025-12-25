import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
  Code2,
  Terminal,
  Cpu,
  Globe,
  Database,
  Layout,
  Palette,
  Video,
  Server,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from "../supabase";

// --- Components ---

const CuteRobot = memo(() => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate position relative to center (range -1 to 1)
      const x = (clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (clientY - innerHeight / 2) / (innerHeight / 2);

      // Limit eye movement range
      setEyePosition({
        x: x * 10, // Max 10px movement
        y: y * 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center animate-float">
      {/* Robot Head Container */}
      <div className="relative w-24 h-20 bg-gradient-to-b from-gray-200 to-gray-400 rounded-[1.25rem] shadow-[0_10px_25px_rgba(0,0,0,0.3)] border-2 border-white/50 backdrop-blur-sm z-10">
        {/* Antennas */}
        <div className="absolute -top-6 left-4 w-1 h-8 bg-gray-400 rounded-full -rotate-12 origin-bottom">
          <div className="absolute -top-1.5 -left-0.5 w-2.5 h-2.5 bg-sky-500 rounded-full animate-pulse shadow-[0_0_10px_#0ea5e9]" />
        </div>
        <div className="absolute -top-6 right-4 w-1 h-8 bg-gray-400 rounded-full rotate-12 origin-bottom">
          <div className="absolute -top-1.5 -left-0.5 w-2.5 h-2.5 bg-sky-500 rounded-full animate-pulse shadow-[0_0_10px_#0ea5e9] delay-75" />
        </div>

        {/* Face Screen */}
        <div className="absolute inset-2 bg-[#1a1a1a] rounded-[1rem] shadow-inner overflow-hidden border border-white/10">
          {/* Eyes Container */}
          <div className="absolute inset-0 flex items-center justify-center gap-4">
            {/* Left Eye */}
            <div className="relative w-6 h-6 bg-[#0a0a0a] rounded-full border border-sky-500/50 shadow-[0_0_10px_rgba(14,165,233,0.3)]">
              <div
                className="absolute w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_5px_#38bdf8]"
                style={{
                  top: `calc(50% - 4px + ${eyePosition.y * 0.5}px)`,
                  left: `calc(50% - 4px + ${eyePosition.x * 0.5}px)`,
                  transition: "all 0.1s ease-out",
                }}
              />
            </div>
            {/* Right Eye */}
            <div className="relative w-6 h-6 bg-[#0a0a0a] rounded-full border border-sky-500/50 shadow-[0_0_10px_rgba(14,165,233,0.3)]">
              <div
                className="absolute w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_5px_#38bdf8]"
                style={{
                  top: `calc(50% - 4px + ${eyePosition.y * 0.5}px)`,
                  left: `calc(50% - 4px + ${eyePosition.x * 0.5}px)`,
                  transition: "all 0.1s ease-out",
                }}
              />
            </div>
          </div>

          {/* Screen Glare */}
          <div className="absolute top-1 right-2 w-6 h-12 bg-white/5 skew-x-12 rounded-full blur-sm" />
        </div>
      </div>

      {/* Hand Left */}
      <div className="absolute top-1/2 -left-6 w-8 h-8 bg-gray-300 rounded-full border-2 border-white/20 shadow-lg animate-[wave_3s_ease-in-out_infinite] origin-right flex items-center justify-center">
        <div className="w-4 h-4 bg-[#1a1a1a] rounded-full shadow-inner" />
      </div>

      {/* Hand Right */}
      <div className="absolute top-1/2 -right-6 w-8 h-8 bg-gray-300 rounded-full border-2 border-white/20 shadow-lg animate-[float_4s_ease-in-out_infinite_reverse] flex items-center justify-center">
        <div className="w-4 h-4 bg-[#1a1a1a] rounded-full shadow-inner" />
      </div>
    </div>
  );
});

const TechMarquee = memo(({ techStack }) => {
  // Common icons mapping
  const iconMap = {
    React: Code2,
    Javascript: Terminal,
    "Node.js": Server,
    Tailwind: Palette,
    Canva: Layout,
    "Adobe Animate": Video,
    "Adobe Photoshop": Palette,
    Capcut: Video,
    Figma: Layout,
    Default: Cpu,
  };

  return (
    <div className="w-full overflow-hidden bg-white/5 border-y border-white/5 backdrop-blur-sm py-4 mt-12">
      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-marquee whitespace-nowrap gap-12 group-hover:[animation-play-state:paused]">
          {[...techStack, ...techStack].map((tech, index) => {
            const Icon = iconMap[tech] || iconMap["Default"];
            return (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-400 hover:text-sky-400 transition-colors cursor-default"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  {tech}
                </span>
              </div>
            );
          })}
        </div>
        <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap gap-12 group-hover:[animation-play-state:paused] ml-12">
          {[...techStack, ...techStack].map((tech, index) => {
            const Icon = iconMap[tech] || iconMap["Default"];
            return (
              <div
                key={`dup-${index}`}
                className="flex items-center gap-3 text-gray-400 hover:text-sky-400 transition-colors cursor-default"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  {tech}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [profileData, setProfileData] = useState({
    title: "Digital Freelancer",
    roles: [
      "Fullstack Developer",
      "Front-end Developer",
      "Backend Developer",
      "UI/UX Designer",
      "Graphic Designer",
      "Video Editor",
    ],
    description:
      "A creative digital professional transforming ideas into exceptional visual and functional experiences.",
    tech_stack: [
      "React",
      "Javascript",
      "Node.js",
      "Tailwind",
      "Figma",
      "Adobe Photoshop",
    ],
    cv_link: "#",
  });

  const TYPING_SPEED = 100;
  const ERASING_SPEED = 50;
  const PAUSE_DURATION = 2000;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!supabase) return;
      try {
        const { data } = await supabase
          .from("profile_settings")
          .select("*")
          .single();
        if (data) {
          setProfileData((prev) => ({
            ...prev,
            description: data.description || prev.description,
            tech_stack: data.tech_stack || prev.tech_stack,
            cv_link: data.cv_link || "#",
          }));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
    AOS.init({ once: true, duration: 1000 });
  }, []);

  // Typewriter Logic
  const handleTyping = useCallback(() => {
    const currentRole = profileData.roles[wordIndex];
    if (isTyping) {
      if (charIndex < currentRole.length) {
        setText((prev) => prev + currentRole[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % profileData.roles.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex, profileData.roles]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden flex flex-col"
      id="Home"
    >
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center relative pt-20 pb-12 px-6">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[100px] -z-10" />

        {/* 1. 3D Object / Character */}
        <div className="mb-4" data-aos="fade-down">
          <CuteRobot />
        </div>

        {/* 2. Main Title */}
        <div
          className="text-center mb-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase relative z-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
              Digital
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500">
              Freelancer
            </span>
          </h1>
        </div>

        {/* 3. Subtitle (Typewriter) */}
        <div
          className="h-8 mb-6 text-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <span className="text-xl md:text-2xl font-light text-gray-300 tracking-wide">
            I am a <span className="font-semibold text-sky-400">{text}</span>
            <span className="animate-blink">|</span>
          </span>
        </div>

        {/* 4. Description */}
        <p
          className="max-w-2xl text-center text-gray-400 text-base md:text-lg leading-relaxed mb-10"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          {profileData.description}
        </p>

        {/* 5. Buttons */}
        <div
          className="flex flex-wrap justify-center gap-4"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <a
            href={profileData.cv_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            My Resume
          </a>
          <a
            href="#Contact"
            className="px-8 py-3 rounded-full bg-transparent border border-white/20 text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
