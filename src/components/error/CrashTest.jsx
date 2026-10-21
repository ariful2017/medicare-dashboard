// src/components/error/CrashTest.jsx

import { useState } from "react";

export default function CrashTest() {
  const [shouldCrash, setShouldCrash] = useState(false);

  // The button changes state; the next render deliberately throws.
  // This lets the Error Boundary demonstrate its fallback UI.
  if (shouldCrash) {
    throw new Error("Intentional Crash Test from the dashboard header.");
  }

  return (
    <button
      type="button"
      className="button button--secondary"
      onClick={() => setShouldCrash(true)}
    >
      Crash Test
    </button>
  );
}