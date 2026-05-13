"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Starfield = dynamic(() => import("./Starfield"), { ssr: false });

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#030014]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Starfield />
        </Suspense>
      </Canvas>
    </div>
  );
}
