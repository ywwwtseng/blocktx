"use client";

import { useEffect } from "react";

import { useBinanceService } from "@/hooks/useBinanceService";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Layout } from "@/components/common/Layout";
import { MiniAppProvider } from "@/contexts/MiniAppContext";

export default function MiniAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();
  const { init } = useBinanceService();

  useEffect(() => {
    init();
  }, [init]);

  if (!isMounted) {
    return null;
  }

  return (
    <MiniAppProvider>
      <Layout>
        {children}
      </Layout>
    </MiniAppProvider>
  );
}
