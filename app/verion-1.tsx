// Version 1


"use client"; // needed because we use hooks + framer-motion

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  ExternalLink,
  Instagram,
  Facebook,
} from "lucide-react";

// ==============================
// DATA
// ==============================

const skills = [
  "Product Management|90%",
  "QA & Automation|95%",
  "UX Understanding|80%",
  "Project Coordination|60%",
  "Data Analysis & Reporting|85%",
  "Market Research & Analysis|80%",
  "Product Documentation|80%",
  "Roadmapping & Prioritization|88%",
];

const projects = [
  {
    name: "Vepaar",
    tag: "Commerce Suite",
    desc: "No-code store & CRM for small businesses.",
    logoSrc: "/images/logos/vepaar.png",
    liveLink: "https://vepaar.com/",
    type: "Product",
  },
  {
    name: "Livvy",
    tag: "Ticketing Platform",
    desc: "Event tickets and passes with live analytics.",
    logoSrc: "/images/logos/livvy.png",
    liveLink: "https://www.livvy.social/",
    type: "Project",
  },
  {
    name: "Pagemaker",
    tag: "No-code Builder",
    desc: "Visual website builder for creators.",
    logoSrc: "/images/logos/pagemaker.png",
    liveLink: "https://pagemaker.io/",
    type: "Product",
  },
  {
    name: "DateDish",
    tag: "Social Dining",
    desc: "Curated date-night food experiences.",
    logoSrc: "/images/logos/datedish.png",
    liveLink: "#",
    type: "Project",
  },
  {
    name: "Voliz",
    tag: "Polls & Surveys",
    desc: "One-tap WhatsApp polls for fast feedback.",
    logoSrc: "/images/logos/voliz.png",
    liveLink: "https://voliz.com/",
    type: "Product",
  },
  {
    name: "Dimboo",
    tag: "Marketing SaaS",
    desc: "Social media campaign automation.",
    // make sure this image actually exists
    logoSrc: "/images/logos/dimboo.png",
    liveLink: "https://dimboo.io/en",
    type: "Project",
  },
];

const glass =
  "rounded-[26px] border border-white/25 bg-white/70 backdrop-blur-2xl shadow-[0_24px_80px_rgba(15,23,42,0.35)] dark:border-white/5 dark:bg-slate-800/80 dark:shadow-[0_24px_80px_rgba(0,0,0,0.7)]";

// ==============================
// UTILITIES
// ==============================

// Follow system theme
function useSystemTheme() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("theme");

    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      document.documentElement.classList.toggle("dark", mq.matches);
    };

    updateTheme();
    mq.addEventListener("change", updateTheme);
    return () => mq.removeEventListener("change", updateTheme);
  }, []);
}

// Typing animation
function TypingTitle({ roles }: { roles: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    let index = 0;
    const current = roles[roleIndex];

    // ✅ works in browser + Node typings
    let typingInterval: ReturnType<typeof setInterval>;
    let pauseTimeout: ReturnType<typeof setTimeout> | undefined;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        if (index < current.length) {
          setDisplayed(current.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);

          pauseTimeout = setTimeout(() => {
            setDisplayed("");
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }, 1200);
        }
      }, 80);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
  }, [roleIndex, roles]);

  return (
    <p className="text-lg font-medium text-teal-700 min-h-[28px]">
      {displayed}
      <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-teal-600" />
    </p>
  );
}

function parseSkill(item: string) {
  const [label, value = ""] = item.split("|");
  return { label, value };
}

interface MotionSocialLinkProps {
  href: string;
  Icon: React.ElementType;
}

const MotionSocialLink: React.FC<MotionSocialLinkProps> = ({ href, Icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -4, scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-slate-700 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 dark:text-white"
  >
    <Icon className="h-3.5 w-3.5" />
  </motion.a>
);

// ==============================
// MAIN PORTFOLIO COMPONENT
// ==============================

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const [toastMessage, setToastMessage] = useState<{
    content: string;
    type: "success" | "error" | "";
  }>({ content: "", type: "" });

  useSystemTheme();

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  // Contact form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return; // Prevent double submission/hang if already loading

    // --- Validation Checks ---
    if (!name.trim()) {
      setToastMessage({ content: "Please enter your name.", type: "error" });
      setTimeout(() => setToastMessage({ content: "", type: "" }), 3000);
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setToastMessage({
        content: "Please enter a valid email address.",
        type: "error",
      });
      setTimeout(() => setToastMessage({ content: "", type: "" }), 3000);
      return;
    }
    if (!message.trim()) {
      setToastMessage({ content: "Please enter a message.", type: "error" });
      setTimeout(() => setToastMessage({ content: "", type: "" }), 3000);
      return;
    }
    // -------------------------

    setIsLoading(true); // Start loading

    const endpoint = "/api/contact";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const isSuccess = response.ok;
      const responseData = await response.json();

      if (isSuccess) {
        setToastMessage({
          content:
            responseData.message ||
            "Message sent! I'll get back to you soon.",
          type: "success",
        });
        // Clear data on successful submission
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setToastMessage({
          content:
            responseData.message || "Failed to send message. Server error.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setToastMessage({
        content: "An network error occurred during submission.",
        type: "error",
      });
    } finally {
      setIsLoading(false); // Stop loading regardless of success/fail
      setTimeout(() => {
        setToastMessage({ content: "", type: "" });
      }, 3000);
    }
  };

  // Track active section while scrolling
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = ["hero", "about", "experience", "projects", "contact"];
    const sectionElements = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0.01,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      {/* ⚠️ NOTE: For the animations to work, you must add 
          the following custom animation to your tailwind.config.js:
          
          extend: {
            keyframes: {
              'pulse-slow': {
                '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
                '50%': { opacity: '0.0', transform: 'scale(1.1)' },
              },
              // spin-slow is useful if you want to fall back to a spinner
            },
            animation: {
              'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
          },
      */}

      {/* TOAST */}
      {toastMessage.content && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-lg shadow-2xl text-sm font-medium ${
            toastMessage.type === "success"
              ? "bg-emerald-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toastMessage.content}
        </motion.div>
      )}

      {/* COLORFUL BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.22),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(244,114,182,0.3),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.1),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(244,114,182,0.15),_transparent_55%)]" />
      </div>

      {/* GRID BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:120px_120px] opacity-30 dark:opacity-10 dark:bg-[linear-gradient(to_right,rgba(203,213,225,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(203,213,225,0.05)_1px,transparent_1px)]" />

      {/* HEADER */}
      <header className="sticky top-4 z-50 mx-auto w-full px-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/40 bg-white/60 px-6 py-3 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:border-slate-800/50 dark:bg-slate-900/60 dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "hero")}
            className="mr-4 flex items-center gap-3 cursor-pointer"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-500 text-[11px] font-bold text-white shadow-lg">
              KB
            </div>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Krunal Baldha
            </span>
          </a>

          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-6 text-xs font-medium text-slate-700 dark:text-slate-300">
              {[
                { label: "About", id: "about" },
                { label: "Experience", id: "experience" },
                { label: "Portfolio", id: "projects" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`rounded-full px-3 py-1.5 transition-all ${
                    activeSection === item.id
                      ? "bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-white"
                      : "hover:bg-white hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative mx-auto mt-6 flex max-w-6xl flex-col gap-14 px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        {/* HERO */}
        <section
          id="hero"
          className="min-h-[calc(100vh-96px)] grid items-center gap-12 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-x tracking-widest text-slate-500 dark:text-slate-400">
              I'M
            </p>

            <h1 className="text-5xl font-extrabold text-slate-900 sm:text-6xl md:text-7xl dark:text-white">
              Krunal Baldha
            </h1>

            <TypingTitle
              roles={["Product Manager", "Quality Engineer", "Problem Solver"]}
            />

            <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              I create impactful digital products that solve real problems and
              drive measurable results. I build user-focused digital products
              through strategy, research, and quality engineering.
            </p>

            <div className="flex gap-4 pt-2">
              <a
                href="#contact"
                className="relative rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-lg 
                         before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-teal-500 before:animate-pulse-slow before:opacity-0 hover:before:opacity-30 before:transition-opacity before:duration-500"
              >
                Contact Me
              </a>
              <motion.a 
                href="#projects"
                onClick={(e) => scrollToSection(e, "projects")} 
                whileHover={{ x: 5, transition: { type: "spring", stiffness: 400, damping: 20 } }} 
                className="rounded-full border border-slate-300 px-6 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                View Portfolio
              </motion.a>
            </div>

            {/* Tags - MODIFIED FOR ANIMATION */}
            <div className="flex flex-wrap gap-2 pt-4">
              {[
                "Product Strategy",
                "User Research",
                "QA Automation",
                "Python",
                "Roadmapping",
                "Feature Prioritization",
                "Quality-focused execution",
              ].map((tag, index) => (
                <motion.span // Changed span to motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.9 + index * 0.08, // Staggered delay for sequential appearance
                    ease: "easeOut" 
                  }}
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }} // Subtle lift and shadow on hover
                  className="rounded-full border border-slate-200/60 bg-white/60 px-4 py-1 text-xs text-slate-700 dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-300 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <div className="relative pl-6">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-teal-400 to-cyan-300 blur-2xl opacity-50" />
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-8 border-white shadow-xl md:h-80 md:w-80 dark:border-slate-800">
                <img
                  src="/images/krunal.png"
                  alt="Krunal Baldha"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
        >
          <div className={`${glass} p-6`}>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-400 text-white font-bold">
                KB
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Krunal Baldha
                </h3>
                <p className="text-sm text-teal-500">Product Manager</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              I transform ideas into meaningful, user-centered solutions,
              focused on delivering clarity, alignment, and impact across teams.
            </p>

            <div className="mt-4 text-sm">
              <p className="text-xs text-slate-400">Email</p>
              <p className="font-medium text-slate-800 dark:text-slate-100">
                krunalbaldha1@gmail.com
              </p>
            </div>

            <div className="mt-3 text-sm">
              <p className="text-xs text-slate-400">Location</p>
              <p className="font-medium text-slate-800 dark:text-slate-100">
                Ahmedabad, India
              </p>
            </div>
          </div>

          <div className={`${glass} p-6`}>
            <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
              About Me
            </h2>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              I’m a Product Manager with a strong technical background,
              passionate about building products that are intuitive, scalable,
              and genuinely helpful.
            </p>
            

            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Over the last few years, I’ve worked on SaaS products, automation
              systems, and internal tools, always with the goal of improving
              user experience and product quality.
            </p>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">
                  Tools & Tech
                </h4>
                <div className="flex flex-wrap gap-2 text-sm">
                  {[
                    "Product & Design Tools",
                    "Python",
                    "Project & Team Tools",
                    "Analytics Tools",
                    "G-Suite",
                    "MS Office",
                    "QA & Automation",
                  ].map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-slate-300 bg-white/70 px-3 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">
                  Highlights
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>Delivered features across multiple SaaS releases</li>
                  <li>Built QA automation to reduce regressions</li>
                  <li>Improved user activation through research</li>
                  <li>Strengthened collaboration across teams</li>
                  <li>Optimized UX flows for higher satisfaction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE + SKILLS + SERVICES */}
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          Experience
        </div>

        <section
          id="experience"
          className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
        >
          {/* Timeline */}
          <div className="space-y-10 border-l border-slate-200 pl-6 dark:border-slate-700">
            <div className="relative pl-6">
              <span className="absolute left-0 top-[6px] h-3 w-3 rounded-full bg-teal-500" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Jan 2024 – Present
              </p>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Associate Product Manager
              </h3>
              <p className="text-sm text-teal-600 dark:text-teal-400">7Span</p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-slate-600 dark:text-slate-300">
                <li>Owned roadmap for core features</li>
                <li>Coordinated cross-team releases</li>
                <li>Strong in strategy & research</li>
                <li>Built intuitive, user-first solutions</li>
                <li>Data-driven decision making</li>
                <li>Delivered real business impact</li>
              </ul>
            </div>
            

            <div className="relative pl-6">
              <span className="absolute left-0 top-[6px] h-3 w-3 rounded-full bg-teal-500" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Jan 2023 – Oct 2023
              </p>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Placement & Training Coordinator – Volunteer
              </h3>
              <p className="text-sm text-teal-600 dark:text-teal-400">
                LJ University
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-slate-600 dark:text-slate-300">
                <li>Led end-to-end placement drives</li>
                <li>Liaison between students & recruiters</li>
                <li>Improved scheduling & workflows</li>
                <li>Provided pre-placement support</li>
                <li>Organized career events</li>
              </ul>
            </div>

            <div className="relative pl-6">
              <span className="absolute left-0 top-[6px] h-3 w-3 rounded-full bg-teal-500" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Jan 2021 – Jun 2022
              </p>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Software Engineer (Python Developer)
              </h3>
              <p className="text-sm text-teal-600 dark:text-teal-400">
                Identiq InfoTech
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-slate-600 dark:text-slate-300">
                <li>Hands-on with Python & REST APIs</li>
                <li>Built scalable applications</li>
                <li>Wrote clean, maintainable code</li>
                <li>Optimized system performance</li>
                <li>Solved complex engineering problems</li>
              </ul>
            </div>
            
          </div>

          {/* Skills + Services */}
          <div className="space-y-8">
            <div id="skills" className={`${glass} p-6`}>
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                Skills
              </h2>
              <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-700 dark:text-slate-300">
                {skills.map((item) => {
                  const { label, value } = parseSkill(item);
                  return (
                    <div key={label}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: value }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                          className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div id="services" className={`${glass} p-6`}>
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                Services
              </h2>
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                {[
                  "Product Management|Roadmaps, metrics, prioritization",
                  "QA & Automation|CI automation & test strategies",
                  "UI/UX Optimization|Data-driven UI improvements",
                  "Market & User Research|User behavior analysis",
                  "Web Development|Fast, responsive products",
                  "Digital Marketing|Drives traffic & growth",
                ].map((service) => {
                  const [title, desc] = service.split("|");
                  return (
                    <div
                      key={title}
                      className="rounded-xl border border-slate-200 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/60"
                    >
                      <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">
                        {title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </div>
              
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Selected Work
              </h2>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                A mix of shipped products, experiments, and side projects.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.name}
                className="rounded-[26px] border border-white/25 bg-white/80 backdrop-blur-2xl shadow-[0_24px_80px_rgba(15,23,42,0.35)] dark:border-white/5 dark:bg-slate-800/80 dark:shadow-[0_24px_80px_rgba(0,0,0,0.7)] group relative flex cursor-pointer flex-col justify-between p-4 sm:p-5"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ y: -14, rotateX: 4, rotateY: -4 }}
              >
                <div className="relative h-28 overflow-hidden rounded-2xl bg-slate-900 dark:bg-slate-950 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.6),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(244,114,182,0.6),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(74,222,128,0.55),transparent_55%)] opacity-80 transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.2),transparent,rgba(15,23,42,0.35))]" />
                  <img
                    src={project.logoSrc}
                    alt={`${project.name} logo`}
                    className="h-80 w-96 object-contain z-10"
                    loading="lazy"
                  />
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    {project.tag}
                  </p>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    {project.desc}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-cyan-600">
                  <span className="inline-flex items-center gap-1">
                    View case study
                    <ExternalLink className="h-3 w-3" />
                  </span>

                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/80 px-2 py-1 text-[10px] text-slate-700 dark:bg-slate-900/50 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    {project.type} · Open
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="grid gap-6 pt-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]"
        >
          <motion.div
            className={`${glass} p-6 sm:p-7`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
          >
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Let’s build something vivid
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
              I’m open to freelance, consulting, and full-time roles. Share a
              little about the product or team, and I’ll reply with ideas and
              next steps.
            </p>

            <div className="mt-4 space-y-1 text-[15px] text-slate-700 dark:text-slate-300">
              <p>
                Email:{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  krunalbaldha1@gmail.com
                </span>
              </p>
              <p>Location: Ahmedabad, India (IST)</p>
            </div>

            <div className="mt-4 flex gap-3 text-xs text-slate-700">
              <MotionSocialLink
                href="https://github.com/krunalbaldha"
                Icon={Github}
              />
              <MotionSocialLink
                href="https://www.linkedin.com/in/krunalbaldha"
                Icon={Linkedin}
              />
              <MotionSocialLink
                href="https://www.instagram.com/krunal.baldha?igsh=MWpxb2tqeWY2Z2hiMg=="
                Icon={Instagram}
              />
              <MotionSocialLink
                href="https://www.facebook.com/share/1G2Mi92Mhw/"
                Icon={Facebook}
              />
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className={`${glass} space-y-3 p-6 sm:p-7`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.12, duration: 0.7, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{ y: -8, rotateX: -3, rotateY: 3 }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1 text-[11px]">
                <label
                  htmlFor="name"
                  className="text-slate-600 dark:text-slate-400"
                >
                  Your name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-white/60 bg-white/80 px-3 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-400 dark:border-slate-700/60 dark:bg-slate-900/80 dark:text-white"
                  placeholder="Jane Doe"
                  disabled={isLoading} 
                />
              </div>
              <div className="space-y-1 text-[11px]">
                <label
                  htmlFor="email"
                  className="text-slate-600 dark:text-slate-400"
                >
                  Your email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/60 bg-white/80 px-3 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-400 dark:border-slate-700/60 dark:bg-slate-900/80 dark:text-white"
                  placeholder="you@example.com"
                  disabled={isLoading} 
                />
              </div>
            </div>

            <div className="space-y-1 text-[11px]">
              <label
                htmlFor="message"
                className="text-slate-600 dark:text-slate-400"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-2xl border border-white/60 bg-white/80 px-3 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-400 dark:border-slate-700/60 dark:bg-slate-900/80 dark:text-white scrollbar-hide h-32"
                placeholder="Tell me about your product, idea, or role."
                disabled={isLoading} 
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              // Added relative, overflow-hidden, and fixed height for the animation wrapper
              className={`
                mt-2 inline-flex w-full items-center justify-center rounded-full relative overflow-hidden
                px-5 py-2 text-xs font-semibold shadow-[0_18px_45px_rgba(236,72,153,0.65)] transition
                h-[40px] // Fixed height for consistent look
                ${
                    isLoading
                        ? 'cursor-not-allowed bg-slate-800 text-white' // Solid dark background when liquid effect is active
                        : 'bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 hover:translate-y-0.5 hover:brightness-110 text-slate-950 dark:text-slate-900'
                }
            `}
            >
              {isLoading ? (
                <>
                  {/* The Liquid/Morphing Blob Background */}
                  <motion.div
                      initial={{ scale: 1, x: '-50%', y: '-50%' }}
                      animate={{ 
                          scale: [1.1, 1.3, 1.1, 1.3],
                          // Morphing effect by cycling arbitrary border radius values
                          borderRadius: ["60% 40% 30% 70% / 60% 40% 70% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%", "60% 40% 30% 70% / 60% 40% 70% 30%"]
                      }}
                      transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                      }}
                      // Large, blurred gradient that creates the liquid color effect
                      className="absolute top-1/2 left-1/2 w-[150%] h-[150%] bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 opacity-60 filter blur-lg"
                  />
                  <span className="relative z-10 font-semibold text-white">Sending...</span>
                </>
              ) : (
                'Send message'
              )}
            </button>
          </motion.form>
        </section>

        {/* FOOTER */}
        <footer className="mt-2 flex flex-col items-center justify-between gap-2 border-t border-white/60 pt-4 text-[14px] text-slate-500 sm:flex-row dark:border-slate-700/60 dark:text-slate-400">
          <span>© {new Date().getFullYear()} krunal.live</span>
        </footer>
      </main>
    </div>
  );
}
