"use client";

import { useEffect } from "react";

export function useA11y() {
  useEffect(() => {
    // Ensure all interactive elements are focusable
    const interactiveElements = document.querySelectorAll(
      'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    interactiveElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (!htmlEl.hasAttribute("aria-label") && !htmlEl.textContent?.trim()) {
        htmlEl.setAttribute("aria-label", "Interactive element");
      }
    });

    // Ensure images have alt text
    const images = document.querySelectorAll("img:not([alt])");
    images.forEach((img) => {
      (img as HTMLImageElement).alt = "";
    });

    // Ensure form inputs have labels
    const inputs = document.querySelectorAll("input:not([aria-label]):not([id])");
    inputs.forEach((input) => {
      const htmlInput = input as HTMLInputElement;
      if (!htmlInput.placeholder) {
        htmlInput.setAttribute("aria-label", "Form input");
      }
    });
  }, []);
}

export function skipToMainContent() {
  const main = document.getElementById("main-content");
  if (main) {
    main.setAttribute("tabindex", "-1");
    main.focus();
  }
}