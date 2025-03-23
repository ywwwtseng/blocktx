"use client";

import { useEffect } from "react";
import { useBinanceService } from "@/hooks/useBinanceService";
import { useIsMounted } from "@/hooks/useIsMounted";
import { MiniAppProvider } from "@/contexts/MiniAppContext";
import { I18nProvider } from "@/contexts/I18nContext";
import { WindowSizeProvider } from "@/contexts/WindowSizeContext/dynamic";
import { ClientProvider } from "@/contexts/ClientContext";
import { Layout } from "@/components/common/Layout";

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
          </WindowSizeProvider>
        </I18nProvider>
      </ClientProvider>
    </MiniAppProvider>
  );
}
