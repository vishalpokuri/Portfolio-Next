"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ResumeCard = () => {
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setShowPreview((prev) => !prev), 2500);
    return () => clearInterval(interval);
  }, []);

  const transition = { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const };
  const variants = {
    hidden: { filter: "blur(10px)", transform: "translateY(10%)", opacity: 0 },
    visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
  };

  return (
    <div className="h-full">
      <div className="flex flex-col items-center justify-center h-full">
        <AnimatePresence mode="wait">
          {showPreview ? (
            <motion.div
              key="preview"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants}
              transition={transition}
              className="w-full max-w-[150px] rounded-md border border-[#3a3a3a] bg-[#232323] p-3 space-y-2"
            >
              <div className="mx-auto h-2 w-1/2 rounded-sm bg-gray-500/60" />
              <div className="mx-auto h-1 w-2/3 rounded-sm bg-gray-600/50" />
              <div className="pt-1 space-y-1.5">
                <div className="h-1.5 w-1/3 rounded-sm bg-gray-500/50" />
                <div className="h-1 w-full rounded-sm bg-gray-600/40" />
                <div className="h-1 w-5/6 rounded-sm bg-gray-600/40" />
                <div className="h-1 w-11/12 rounded-sm bg-gray-600/40" />
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-1/4 rounded-sm bg-gray-500/50" />
                <div className="h-1 w-full rounded-sm bg-gray-600/40" />
                <div className="h-1 w-3/4 rounded-sm bg-gray-600/40" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="text"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants}
              transition={transition}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl text-gray-300 font-deb leading-tight">
                My Resume
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeCard;
