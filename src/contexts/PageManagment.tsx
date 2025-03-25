"use client";
import { createContext, useState, useContext } from "react";

interface PageManagmentContext {
  pathname: string;
  push: (pathname: string) => void;
}

export const PageManagment = createContext<PageManagmentContext>({
  pathname: "",
  push: () => {},
});

export const PageManagmentProvider = ({ children }: { children: React.ReactNode }) => {
  const [pathname, setPathname] = useState(sessionStorage.getItem("pathname") || "/");

  const push = (pathname: string) => {
    setPathname(pathname);
    sessionStorage.setItem("pathname", pathname);
  };

  return <PageManagment.Provider value={{ pathname, push }}>{children}</PageManagment.Provider>;
};

export const usePageManagment = () => {
  const context = useContext(PageManagment);

  if (!context) {
    throw new Error("usePageManagment must be used within a PageManagmentProvider");
  }

  return context;
};

export const usePagename = () => {
  const { pathname } = usePageManagment();

  return pathname;
};