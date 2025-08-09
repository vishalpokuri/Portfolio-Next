"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const greetings = [
  "Hey",
  "नमस्ते",
  "¡Hola",
  "Bonjour",
  "নমস্কার",
  "Hallo",
  "こんにちは",
  "നമസ്കാരം",
  "ನಮಸ್ಕಾರ",
  "నమస్కారం",
  "வணக்கம்",
];

export default function LoaderPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"greetings" | "final" | "done">(
    "greetings"
  );

  // Greeting cycle
  useEffect(() => {
    if (phase === "greetings" && currentIndex < greetings.length) {
      const t = setTimeout(() => {
        setCurrentIndex((i) => i + 1);
      }, 150);
      return () => clearTimeout(t);
    }
    if (phase === "greetings" && currentIndex >= greetings.length) {
      // Delay mount of final text by one frame
      requestAnimationFrame(() => setPhase("final"));
    }
  }, [phase, currentIndex]);

  // Final text timer
  useEffect(() => {
    if (phase === "final") {
      const t = setTimeout(() => setPhase("done"), 800); // short display
      return () => clearTimeout(t);
    }
  }, [phase]);

  const greetingVariants = {
    initial: { y: 50, opacity: 0, filter: "blur(10px)" },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.15 },
    },
    exit: {
      y: -50,
      opacity: 0,
      filter: "blur(2px)",
      transition: { duration: 0 },
    },
  };

  const finalTextVariants = {
    initial: { y: 50, opacity: 0, filter: "blur(10px)" },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.3 },
    },
    exit: {
      y: -50,
      opacity: 0,
      filter: "blur(10px)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="fixed inset-0 bg-[#171717] flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        {phase === "greetings" && currentIndex < greetings.length && (
          <motion.div
            key={`greet-${currentIndex}`}
            variants={greetingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-6xl md:text-6xl font-bold font-raleway text-white"
          >
            {greetings[currentIndex]}
          </motion.div>
        )}

        {phase === "final" && (
          <motion.div
            key="final-text"
            variants={finalTextVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-center"
          >
            <div className="text-2xl text-gray-400 mb-2 font-bold font-raleway text-left">
              I&apos;m
            </div>
            <div className="text-6xl md:text-8xl font-bold font-raleway text-white">
              Vishal Pokuri
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
