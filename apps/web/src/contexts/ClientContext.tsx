"use client";

import { createContext, useMemo, useState, useCallback, ReactNode, useContext } from "react";
import { useMiniApp } from "./MiniAppContext";
import { useClientOnce } from "../hooks/useClientOnce";
import { Client } from "../libs/client/Client";
import { User } from "@prisma/client";

interface ClientContextState {
  request: {
    get: <T>(url: string, options?: RequestInit) => Promise<T>;
    post: <T, U>(url: string, body?: U, options?: RequestInit) => Promise<T>;
    put: <T, U>(url: string, body?: U, options?: RequestInit) => Promise<T>;
    delete: <T, U>(url: string, body?: U, options?: RequestInit) => Promise<T>;
  };
  authorized: boolean;
  languageCode: string;
  setLanguageCode: (languageCode: string) => void;
  user: User | undefined;
}

const ClientContext = createContext<ClientContextState | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const { initDataRaw } = useMiniApp();
  const [authorized, setAuthorized] = useState(false);
  const [languageCode, setLanguageCode] = useState<string>("en");
  const [user, setUser] = useState<User | undefined>(undefined);
  const client = useMemo(() => {
    const headers: Record<string, string> = {};

    if (initDataRaw) {
      headers["Authorization"] = `tma ${initDataRaw}`;
    }

    return new Client({
      baseUrl: "/api",
      headers,
    });
  }, [initDataRaw]);

  const auth = useCallback(async () => {
    setAuthorized(false);
    
    client
      .post<{ data: User }>("/auth")
      .then((res) => {
        setUser(res.data);
        setLanguageCode(res.data.language_code || "en");
        setAuthorized(true);
      })
      .catch((err) => {
        console.error(err);
        setAuthorized(false);
      });
  }, [client]);

  useClientOnce(() => {
    auth();
  });

  const value: ClientContextState = {
    request: {
      get: client.get.bind(client),
      post: client.post.bind(client),
      put: client.put.bind(client),
      delete: client.delete.bind(client),
    },
    authorized,
    languageCode,
    setLanguageCode,
    user,
  };
  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
};

export function useClient() {
  const context = useContext(ClientContext);

  if (context === undefined) {
    throw new Error("useClient must be used within a ClientProvider");
  }

  return context;
}