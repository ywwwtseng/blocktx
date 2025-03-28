"use client";

import { usePageManagement } from "@/contexts/PageManagementContext";
import { useBinanceService } from "@/hooks/useBinanceService";
import { useClientOnce } from "@/hooks/useClientOnce";
import Analysis from "../_pages/Analysis";
import TradeAI from "../_pages/TradeAI";
import News from "../_pages/News";
import Account from "../_pages/Account";
export default function MiniApp() {
  const { pathname } = usePageManagement();
  const { init } = useBinanceService();

  useClientOnce(() => {
    init();
  });

  return (
    <div className="flex flex-col items-center justify-center py-4 h-full">
      {pathname === "/" && <Analysis />}
      {pathname === "/news" && <News />}
      {pathname === "/trade-ai" && <TradeAI />}
      {pathname === "/account" && <Account />}
    </div>
  );
}
