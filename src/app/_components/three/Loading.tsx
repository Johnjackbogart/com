import React from "react";
import { Html, useProgress } from "@react-three/drei";

function CustomLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-grow items-center">
        <div style={{ width: `${progress}%` }}></div>
        <p>{progress.toFixed(2)}% loaded</p>
      </div>
    </Html>
  );
}

export default function Loading() {
  return <CustomLoader />;
}
