import Background from "@app/components/background/Background.tsx";
import React from "react";
import { createRoot } from "react-dom/client";
import getOrCreateElement from "@app/utils/dom/getOrCreateElement.ts";

const setBackground = (() => {
  let root: ReturnType<typeof createRoot> | null = null;

  return () => {
    const container = document.body;
    if (!container) return;
    const bgDiv = getOrCreateElement("div", "glassify-bg", container, true);
    bgDiv.classList.add("glassify-bg");
    root = createRoot(bgDiv);
    root.render(<Background />);
  };
})();

export default setBackground;
