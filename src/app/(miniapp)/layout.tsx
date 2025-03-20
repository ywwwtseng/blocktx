"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

import { ClientProvider } from "@/contexts/ClientContext";
import { useBinanceService } from "@/hooks/useBinanceService";

const Avatar = dynamic(() => import("@/components/Avatar/Avatar"), { ssr: false });

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
    <ClientProvider>
      <main>
        <nav className="flex items-center justify-end p-2">
          <Avatar />
        </nav>
        {children}
      </main>
    </ClientProvider>
  );
}
