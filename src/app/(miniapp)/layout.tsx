"use client";

import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useIsMounted } from "@/hooks/useIsMounted";
import { MiniAppProvider } from "@/contexts/MiniAppContext";
import { I18nProvider } from "@/contexts/I18nContext";
import { WindowSizeProvider } from "@/contexts/WindowSizeContext/dynamic";
import { ClientProvider } from "@/contexts/ClientContext";
import { PageManagementProvider } from "@/contexts/PageManagementContext";
import { Layout } from "@/components/common/Layout/dynamic";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function MiniAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <MiniAppProvider>
      <PageManagementProvider>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </PageManagementProvider>
    </MiniAppProvider>
  );
}
