"use client";

import CustomCursor from "../components/CustomCursor";

import { useState, useEffect } from "react";
import Home from "../pages/Home";
import Container from "../components/cards/Container";
import RecentWork from "../pages/RecentWork";
import Experience from "../pages/Experience";
import { AnimatePresence } from "framer-motion";
import Loader from "../pages/Loader";
type Tab = "recentWork" | "home" | "blogs" | "experience";

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <div className="min-h-screen py-8">
      <CustomCursor />
      <Container>
        {showLoader ? (
          <Loader onComplete={handleLoaderComplete} />
        ) : (
          <AnimatePresence mode="wait">
            {(() => {
              switch (tab) {
                case "home":
                  return <Home key="home" setTab={setTab} />;
                case "recentWork":
                  return <RecentWork key="recentWork" setTab={setTab} />;
                case "experience":
                  return <Experience key="experience" setTab={setTab} />;
              }
            })()}
          </AnimatePresence>
        )}
      </Container>
    </div>
  );
}
