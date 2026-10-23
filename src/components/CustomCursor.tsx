"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useMousePosition } from "../hooks/useMousePosition";
import { useMouseState } from "../hooks/useMouseState";
import { useCursorType } from "../hooks/useCursorType";
import { RedirectCursor } from "./cursor/RedirectCursor";
import { NormalCursor } from "./cursor/NormalCursor";
import { CURSOR_CONFIG } from "../config/cursorConfig";

const CustomCursor = () => {
  const mousePosition = useMousePosition();
  const { isMouseDown } = useMouseState();
  const { cursorType, inSection } = useCursorType();

  const x = useSpring(
    useTransform(mousePosition.x, (value) => value - CURSOR_CONFIG.OFFSET.x),
    CURSOR_CONFIG.ANIMATION.MAIN
  );
  const y = useSpring(
    useTransform(mousePosition.y, (value) => value - CURSOR_CONFIG.OFFSET.y),
    CURSOR_CONFIG.ANIMATION.MAIN
  );

  const isRedirect = cursorType === "redirect";
  const isHovering = cursorType === "hover";

  const getScale = (): number => {
    if (!inSection) return CURSOR_CONFIG.SCALE.DEFAULT;
    return isMouseDown
      ? CURSOR_CONFIG.SCALE.MOUSE_DOWN
      : CURSOR_CONFIG.SCALE.IN_SECTION;
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 hidden md:pointer-fine:block"
      style={{ x, y }}
      animate={{ scale: getScale() }}
      transition={{
        type: "spring",
        ...CURSOR_CONFIG.ANIMATION.MAIN,
      }}
    >
      <RedirectCursor isVisible={isRedirect} />
      <NormalCursor isVisible={!isRedirect} isHovering={isHovering} />
    </motion.div>
  );
};

export default CustomCursor;
