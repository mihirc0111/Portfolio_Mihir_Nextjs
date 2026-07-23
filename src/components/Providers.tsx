"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "@/store/store";
import { useAnalytics, initGA } from "@/lib/analytics";
import { useWebVitals } from "@/lib/webVitals";

function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useAnalytics();
  useWebVitals();

  useEffect(() => {
    initGA();
  }, []);

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </Provider>
    </SessionProvider>
  );
}
