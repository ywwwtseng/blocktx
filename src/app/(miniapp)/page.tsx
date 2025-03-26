"use client";

import { usePageManagment } from "@/contexts/PageManagment";
import { useBinanceService } from "@/hooks/useBinanceService";
import { useClientOnce } from "@/hooks/useClientOnce";
import Analytics from "../_pages/Analytics";
import Earn from "../_pages/Earn";
import TradeAI from "../_pages/TradeAI";

export default function MiniApp() {
  const { pathname } = usePageManagment();
  const { init } = useBinanceService();

  useClientOnce(() => {
    init();
  });

  return (
    <div className="flex flex-col items-center justify-center py-4 h-full">
      {pathname === "/" && <Analytics />}
      {pathname === "/earn" && <Earn />}
      {pathname === "/trade-ai" && <TradeAI />}
    </div>
  );
}
