"use client";

import { useState, useEffect } from "react";
/** `true` when the viewport width is ≤ `breakpoint` (default = 768 px) */
export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Bail out on the server
    if (typeof window === "undefined") return;

    const update = () => setIsMobile(window.innerWidth <= breakpoint);
    update(); // run once on mount
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);

  return isMobile;
}
