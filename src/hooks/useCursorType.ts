import { useState, useEffect } from "react";
import { CURSOR_CONFIG } from "../config/cursorConfig";

export type CursorType = "default" | "hover" | "redirect";

export interface CursorState {
  cursorType: CursorType;
  inSection: boolean;
}

export const useCursorType = (): CursorState => {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [inSection, setInSection] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // pointerover fires once per element entered, instead of on every pixel moved.
    const handlePointerOver = (e: PointerEvent) => {
      const element = e.target instanceof Element ? e.target : null;

      const hasRedirect = !!element?.closest(CURSOR_CONFIG.SELECTORS.REDIRECT);
      const hasScale = !!element?.closest('[data-cursor-scale="true"]');
      setInSection(hasRedirect && hasScale);

      if (hasRedirect) {
        setCursorType("redirect");
      } else if (element?.closest(CURSOR_CONFIG.SELECTORS.INTERACTIVE)) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    document.addEventListener("pointerover", handlePointerOver, {
      passive: true,
    });
    return () => document.removeEventListener("pointerover", handlePointerOver);
  }, []);

  return { cursorType, inSection };
};
