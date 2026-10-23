import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

/**
 * Pointer position as motion values, so tracking the mouse never re-renders React.
 * Starts off-screen so nothing shows before the first move.
 */
export const useMousePosition = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const updateMousePosition = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("pointermove", updateMousePosition, {
      passive: true,
    });
    return () => window.removeEventListener("pointermove", updateMousePosition);
  }, [x, y]);

  return { x, y };
};
