"use client";

const STORAGE_PREFIX = "portfolio_";

export function useStorage() {
  const savePreference = (key: string, value: unknown) => {
    try {
      localStorage.setItem(
        STORAGE_PREFIX + key,
        JSON.stringify(value)
      );
    } catch {
      // localStorage might be full or unavailable
    }
  };

  const getPreference = (key: string) => {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  };

  const saveSessionData = (key: string, value: unknown) => {
    try {
      sessionStorage.setItem(
        "session_" + key,
        JSON.stringify(value)
      );
    } catch {
      // sessionStorage might be unavailable
    }
  };

  const getSessionData = (key: string) => {
    try {
      const item = sessionStorage.getItem("session_" + key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  };

  const saveCookie = (
    name: string,
    value: string,
    days: number
  ) => {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict`;
  };

  const getCookie = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(name + "="));
    return cookie ? cookie.split("=")[1] : null;
  };

  const removePreference = (key: string) => {
    localStorage.removeItem(STORAGE_PREFIX + key);
  };

  const removeSessionData = (key: string) => {
    sessionStorage.removeItem("session_" + key);
  };

  return {
    savePreference,
    getPreference,
    saveSessionData,
    getSessionData,
    saveCookie,
    getCookie,
    removePreference,
    removeSessionData,
  };
}