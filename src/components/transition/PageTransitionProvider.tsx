"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import RocketTransition from "./RocketTransition";

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (targetUrl: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");
  const router = useRouter();

  const startTransition = useCallback((url: string) => {
    setTargetUrl(url);
    setIsTransitioning(true);
    
    // Timing: 
    // 1. Launch & Warp (0-1.5s)
    // 2. Navigation (1.5s)
    // 3. Reveal (2s+)
    setTimeout(() => {
      router.push(url);
    }, 1500);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 3000);
  }, [router]);

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
      <RocketTransition isActive={isTransitioning} />
    </TransitionContext.Provider>
  );
}

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a PageTransitionProvider");
  }
  return context;
};
