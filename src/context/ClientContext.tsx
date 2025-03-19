"use client";

import { createContext, useContext, ReactNode } from "react";
import { useLaunchParams } from "@/hooks/useLaunchParams";
import type { User } from "@telegram-apps/sdk";

export interface ClientContextValue {
  user: User | undefined;
}

export interface ClientProviderProps {
  children: ReactNode;
}

const ClientContext = createContext<ClientContextValue | undefined>(undefined);

export function ClientProvider({ children }: ClientProviderProps) {
  const launchParams = useLaunchParams();
  const user = launchParams?.tgWebAppData?.user;

  return (
    <ClientContext.Provider value={{ user }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  
  if (context === undefined) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
}
