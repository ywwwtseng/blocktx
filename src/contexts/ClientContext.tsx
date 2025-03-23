import { createContext, useMemo, useState, useEffect, useCallback, ReactNode, useContext } from "react";
import { useMiniApp } from "@/contexts/MiniAppContext";
import { Client } from '@/libs/client/Client';

interface ClientContextState {
  request: {
    get: <T>(url: string, options?: RequestInit) => Promise<T>;
    post: <T, U>(url: string, body?: U, options?: RequestInit) => Promise<T>;
    put: <T, U>(url: string, body?: U, options?: RequestInit) => Promise<T>;
    delete: <T, U>(url: string, body?: U, options?: RequestInit) => Promise<T>;
  };
  authorized: boolean;
  languageCode: string;
}

const ClientContext = createContext<ClientContextState | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const { initDataRaw, user } = useMiniApp();
  const [authorized, setAuthorized] = useState(false);
  const [languageCode, setLanguageCode] = useState<string>("en");
  const client = useMemo(() => {
    const headers: Record<string, string> = {};

    if (initDataRaw) {
      headers["Authorization"] = `tma ${initDataRaw}`;
    }

    return new Client({ headers });
  }, [initDataRaw]);

  const auth = useCallback(async () => {
    setAuthorized(false);
    
    client
      .post<{ data: { telegram_id: string; language_code: string; } }, { language_code: string; }>("/api/auth", {
        language_code: user?.language_code || "en",
      })
      .then((res) => {
        setLanguageCode(res.data.language_code);
        setAuthorized(true);
      });
  }, [client, user]);

  useEffect(() => {
    auth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: ClientContextState = {
    request: {
      get: client.get,
      post: client.post,
      put: client.put,
      delete: client.delete,
    },
    authorized,
    languageCode,
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