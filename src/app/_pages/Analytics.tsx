import {
  useBinanceKlineData,
  TradingPairSymbol,
} from "@/hooks/useBinanceService";
import { KlineChart } from "@/components/common/KlineChart";

export default function Analytics() {
  const data = useBinanceKlineData(TradingPairSymbol.BTCUSDT);

  return (
    <div className="flex-1 animate-fade-in">
      <KlineChart data={data} />
    </div>
  );
}