"use client";

import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "visit_source";

interface SourceContextType {
  source: string | null;
}

const SourceContext = createContext<SourceContextType>({
  source: null,
});

export function SourceProvider({ children }: { children: React.ReactNode }) {
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSource = params.get("source");

    if (urlSource) {
      localStorage.setItem(STORAGE_KEY, urlSource);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSource(urlSource);
    } else {
      const stored = localStorage.getItem(STORAGE_KEY);
      setSource(stored);
    }
  }, []);

  return (
    <SourceContext.Provider value={{ source }}>
      {children}
    </SourceContext.Provider>
  );
}

export function useSource() {
  return useContext(SourceContext);
}
