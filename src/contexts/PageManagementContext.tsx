"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
} from "react";
import { routes, Route } from "@/app/_routes";

interface PageManagementContext {
  pathname: string;
  push: (pathname: string) => void;
  back: () => void;
  route: Route;
}

export const PageManagement = createContext<PageManagementContext>({
  pathname: "",
  push: () => {},
  back: () => {},
  route: routes[0],
});

export const PageManagementProvider = ({ children }: { children: React.ReactNode }) => {
  const lastPathnameRef = useRef<string | null>(null);
  const [pathname, setPathname] = useState(sessionStorage.getItem("pathname") || "/");
  const route = routes.find(route => route.path === pathname)!;

  const push = (pathname: string) => {
    lastPathnameRef.current = sessionStorage.getItem("pathname") || "/";
    setPathname(pathname);
    sessionStorage.setItem("pathname", pathname);
  };

  const back = () => {
    setPathname(lastPathnameRef.current || "/");
    sessionStorage.setItem("pathname", lastPathnameRef.current || "/");
  };

  return <PageManagement.Provider value={{ pathname, push, back, route }}>{children}</PageManagement.Provider>;
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
