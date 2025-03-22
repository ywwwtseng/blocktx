"use client";

import { createContext, useState, useEffect, useContext } from "react";

const WindowSizeContext = createContext<{
  width: number;
  height: number;
}>({ width: window.innerWidth, height: window.innerHeight });

export function WindowSizeProvider({ children }: { children: React.ReactNode }) {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <WindowSizeContext.Provider value={size}>{children}</WindowSizeContext.Provider>;
}



export function useWindowSize() {
  return useContext(WindowSizeContext);
}