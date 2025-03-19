"use client";

import { ClientProvider } from "@/context/ClientContext";
import { Avatar } from "@/components/Avatar/Avatar";

export default function MiniAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
