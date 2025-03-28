"use client";
import { createContext, useState, useContext } from "react";

interface PageManagementContext {
  pathname: string;
  push: (pathname: string) => void;
}

export const PageManagement = createContext<PageManagementContext>({
  pathname: "",
  push: () => {},
});

export const PageManagementProvider = ({ children }: { children: React.ReactNode }) => {
  const [pathname, setPathname] = useState(sessionStorage.getItem("pathname") || "/");

  const push = (pathname: string) => {
    setPathname(pathname);
    sessionStorage.setItem("pathname", pathname);
  };

  return <PageManagement.Provider value={{ pathname, push }}>{children}</PageManagement.Provider>;
};

export const usePageManagement = () => {
  const context = useContext(PageManagement);

  if (!context) {
    throw new Error("usePageManagment must be used within a PageManagmentProvider");
  }

  return context;
};

export const usePagename = () => {
  const { pathname } = usePageManagement();

  return pathname;
};