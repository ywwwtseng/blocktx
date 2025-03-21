"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useBinanceService } from "@/hooks/useBinanceService";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Layout } from "@/components/common/Layout";
import { MiniAppProvider } from "@/contexts/MiniAppContext";

const WindowSizeProvider = dynamic(() => import("@/contexts/WindowSizeContext").then(mod => mod.WindowSizeProvider), { ssr: false });

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
      <WindowSizeProvider>
        <Layout>
          {children}
        </Layout>
      </WindowSizeProvider>
    </MiniAppProvider>
  );
}
