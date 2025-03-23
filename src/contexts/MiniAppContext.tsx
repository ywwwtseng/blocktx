"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { postEvent, User, Platform } from "@telegram-apps/sdk-react";
import { TonConnect, MockTonConnectUI, TonConnectUI } from "@/libs/ton-connect";
import { useTMA } from "@/hooks/useTMA";
import { useForceUpdate } from "@/hooks/useForceUpdate";

export interface MiniAppContextState {
  user: User | undefined;
  platform: Platform | undefined;
  tonConnect: TonConnect | undefined;
  initDataRaw: string | null | undefined;
}

export interface MiniAppProviderProps {
  children: ReactNode;
}

const MiniAppContext = createContext<MiniAppContextState | undefined>(undefined);

export function MiniAppProvider({ children }: MiniAppProviderProps) {
  const forceUpdate = useForceUpdate();
  const { launchParams, initDataRaw } = useTMA();
  const user = launchParams?.tgWebAppData?.user;
  const platform = launchParams?.tgWebAppPlatform;
  const tonConnect = TonConnect.getInstance({
    TonConnectUI: process.env.NODE_ENV === "development"
      ? MockTonConnectUI
      : TonConnectUI,
    onStatusChange: () => {
      forceUpdate();
    }
  });

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && launchParams) {
      postEvent("web_app_set_header_color", { color: "#000000" });
      postEvent("web_app_set_bottom_bar_color", { color: "#000000" });
      postEvent("web_app_set_background_color", { color: "#000000" });
    }
  }, [launchParams]);
  
  const value: MiniAppContextState = {
    user,
    platform,
    tonConnect,
    initDataRaw,
  };

  return (
    <MiniAppContext.Provider value={value}>
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
