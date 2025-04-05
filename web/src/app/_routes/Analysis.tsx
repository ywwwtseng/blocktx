import {
  useBinanceKline,
  // useBinanceMiniTicker,
} from "../../hooks/useBinanceService";
import { KlineChart } from "../../components/common/KlineChart";
import { TradingPairSymbol } from "../../types";

export default function Analysis() {
  // const miniTicker = useBinanceMiniTicker();
  const data = useBinanceKline(TradingPairSymbol.BTCUSDT);

  return (
    <div className="animate-fade-in h-full px-4 pb-2 flex flex-col">
      <KlineChart data={data} />
    </div>
  );
}