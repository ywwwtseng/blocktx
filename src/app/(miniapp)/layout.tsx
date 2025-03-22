"use client";

import { useEffect } from "react";
import { useBinanceService } from "@/hooks/useBinanceService";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Layout } from "@/components/common/Layout";
import { MiniAppProvider } from "@/contexts/MiniAppContext";
import { I18nProvider } from "@/contexts/I18nContext";
import { WindowSizeProvider } from "@/contexts/WindowSizeContext/dynamic";

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
      <I18nProvider>
        <WindowSizeProvider>
          <Layout>
            {children}
          </Layout>
        </WindowSizeProvider>
      </I18nProvider>
    </MiniAppProvider>
  );
}
