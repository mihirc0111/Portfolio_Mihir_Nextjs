"use client";

import { useState, useRef, useEffect } from "react";

export default function ReadMore({ text, maxLines = 2 }: { text: string; maxLines?: number }) {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, []);

  return (
    <div>
      <p
        ref={textRef}
        className="text-sm text-muted mb-4"
        style={
          !expanded
            ? { display: "-webkit-box", WebkitLineClamp: maxLines, WebkitBoxOrient: "vertical", overflow: "hidden" }
            : undefined
        }
      >
        {text}
      </p>
      {isTruncated && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-primary hover:underline font-medium"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}