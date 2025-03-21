"use client";

import { useBinanceKlineData, TradingPairSymbol } from "@/hooks/useBinanceService";
import { KlineChart } from "@/components/common/KlineChart";

export default function Home() {
  const data = useBinanceKlineData(TradingPairSymbol.BTCUSDT);

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <KlineChart data={data} />
    </div>
  );
}
