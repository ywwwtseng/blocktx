"use client";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useBinanceService } from "@/hooks/useBinanceService";
import { useIsMounted } from "@/hooks/useIsMounted";
import { MiniAppProvider } from "@/contexts/MiniAppContext";
import { I18nProvider } from "@/contexts/I18nContext";
import { WindowSizeProvider } from "@/contexts/WindowSizeContext/dynamic";
import { ClientProvider } from "@/contexts/ClientContext";
import { Layout } from "@/components/common/Layout";

import "react-toastify/dist/ReactToastify.css";

export default function MiniAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();
  const { init } = useBinanceService();

  useEffect(() => {
    const destroy = init();

    return () => {
      destroy();
    }
  }, [init]);

  if (!isMounted) {
    return null;
  }

  return (
    <MiniAppProvider>
      <ClientProvider>
        <I18nProvider>
          <WindowSizeProvider>
            <Layout>
              {children}
            </Layout>
            <ToastContainer
              closeOnClick
              theme="dark"
              closeButton={false}
              autoClose={2400}
              hideProgressBar
              position="top-center"
              style={{
                marginTop: "70px",
                height: "20px",
              }}
              toastStyle={{
                borderRadius: "9999px",
                maxWidth: "90vw",
                margin: "0 auto",
                padding: "4px 20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}
            />
          </WindowSizeProvider>
        </I18nProvider>
      </ClientProvider>
    </MiniAppProvider>
  );
}
