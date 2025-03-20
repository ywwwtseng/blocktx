"use client";

import { useEffect } from "react";

import { MiniAppProvider } from "@/contexts/MiniAppContext";
import { useBinanceService } from "@/hooks/useBinanceService";
import Layout from "@/components/common/Layout";

export default function MiniAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { init } = useBinanceService();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <MiniAppProvider>
      <Layout>
        {children}
      </Layout>
    </MiniAppProvider>
  );
}
