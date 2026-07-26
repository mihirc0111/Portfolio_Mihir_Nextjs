"use client";

import { Suspense } from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SourceProvider } from "@/contexts/SourceContext";
import { store } from "@/store/store";
import { useAnalytics } from "@/lib/analytics";
import { useWebVitals } from "@/lib/webVitals";
import { useA11y, skipToMainContent } from "@/lib/a11y";

function AnalyticsContent({ children }: { children: React.ReactNode }) {
  useAnalytics();
  useWebVitals();

  return <>{children}</>;
}

function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent>{children}</AnalyticsContent>
    </Suspense>
  );
}

function A11yContent({ children }: { children: React.ReactNode }) {
  useA11y();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
        onClick={(e) => {
          e.preventDefault();
          skipToMainContent();
        }}
      >
        Skip to main content
      </a>
      {children}
    </>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider>
          <SourceProvider>
            <AnalyticsProvider>
              <A11yContent>{children}</A11yContent>
            </AnalyticsProvider>
          </SourceProvider>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
