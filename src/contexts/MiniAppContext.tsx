"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { postEvent, on, User, Platform } from '@telegram-apps/sdk';

import { useLaunchParams } from "@/hooks/useLaunchParams";

export interface SafeArea {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface MiniAppContextValue {
  user: User | undefined;
  platform: Platform | undefined;
  safeArea: SafeArea | undefined;
}

export interface MiniAppProviderProps {
  children: ReactNode;
}

const MiniAppContext = createContext<MiniAppContextValue | undefined>(undefined);

export function MiniAppProvider({ children }: MiniAppProviderProps) {
  const launchParams = useLaunchParams();
  const user = launchParams?.tgWebAppData?.user;
  const platform = launchParams?.tgWebAppPlatform;

  const [safeArea, setSafeArea] = useState<SafeArea | undefined>(undefined);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && launchParams) {
      postEvent("web_app_set_header_color", { color: "#000000" });
      postEvent("web_app_set_bottom_bar_color", { color: "#000000" });
      postEvent("web_app_set_background_color", { color: "#000000" });

      const safeArea = sessionStorage.getItem("blocktx:safearea");
      if (safeArea) {
        setSafeArea(JSON.parse(safeArea));
      }

      if (["ios", "android"].includes(launchParams.tgWebAppPlatform)) {
        on("safe_area_changed", (safeArea) => {
          setSafeArea(safeArea);
          sessionStorage.setItem("blocktx:safearea", JSON.stringify(safeArea));
        });
      } else {
        setSafeArea({
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        });
      }
    }
  }, [launchParams]);

  return (
    <MiniAppContext.Provider value={{ user, platform, safeArea }}>
      {children}
    </MiniAppContext.Provider>
  );
}

export function useMiniApp() {
  const context = useContext(MiniAppContext);
  
  if (context === undefined) {
    throw new Error("useMiniApp must be used within a MiniAppProvider");
  }
  return context;
}
