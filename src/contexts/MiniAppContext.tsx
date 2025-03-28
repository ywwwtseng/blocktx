"use client";

import {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode
} from "react";
import { init, postEvent, User, Platform } from "@telegram-apps/sdk-react";
import { TonConnect, MockTonConnectUI, TonConnectUI, ConnectedWallet } from "@/libs/ton-connect";
import { useTMA } from "@/hooks/useTMA";
import { useForceUpdate } from "@/hooks/useForceUpdate";

type OnConnect = ((wallet: ConnectedWallet) => void) | null;

export interface MiniAppContextState {
  user: User | undefined;
  platform: Platform | undefined;
  tonConnect: TonConnect | undefined;
  initDataRaw: string | null | undefined;
  avatar: HTMLImageElement | null;
}

export interface MiniAppProviderProps {
  children: ReactNode;
}

const MiniAppContext = createContext<MiniAppContextState | undefined>(undefined);

export function MiniAppProvider({ children }: MiniAppProviderProps) {
  const onConnectRef = useRef<OnConnect>(null);
  const [avatar, setAvatar] = useState<HTMLImageElement | null>(null);
  const forceUpdate = useForceUpdate();
  const { launchParams, initDataRaw } = useTMA();
  const user = launchParams?.tgWebAppData?.user;
  const platform = launchParams?.tgWebAppPlatform;

  const tonConnect = TonConnect.getInstance({
    TonConnectUI: process.env.NODE_ENV === "development"
      ? MockTonConnectUI
      : TonConnectUI,
    onStatusChange: (wallet) => {
      forceUpdate();
      if (wallet) {
        onConnectRef.current?.(wallet);
      }
    },
  });

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && launchParams) {
      init();
      postEvent("web_app_set_header_color", { color: "#000000" });
      postEvent("web_app_set_bottom_bar_color", { color: "#000000" });
      postEvent("web_app_set_background_color", { color: "#000000" });
    }
  }, [launchParams]);

  useEffect(() => {
    if (user?.photo_url) {
      const image = new Image();
      
      image.onload = () => {
        setAvatar(image);
      };
      image.src = user.photo_url;
    }
  }, [user]);
  
  const value: MiniAppContextState = {
    user,
    platform,
    tonConnect,
    initDataRaw,
    avatar,
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
