import {
  useBinanceKline,
  useBinanceMiniTicker,
} from "@/hooks/useBinanceService";
import { KlineChart } from "@/components/common/KlineChart";
import { TradingPairSymbol } from "@/types";
export default function Analysis() {
  const miniTicker = useBinanceMiniTicker();
  const data = useBinanceKline(TradingPairSymbol.BTCUSDT);

  console.log(miniTicker, 'miniTicker')

  return (
    <div className="flex-1 animate-fade-in">
      <KlineChart data={data} />
    </div>
  );
}