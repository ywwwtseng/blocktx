import { useBinanceMiniTicker } from "./useBinanceService";
import { MiniTickerUtils } from "@/utils/MiniTickerUtils";
import { TradingPairSymbol } from "@/types";

export function useCrypto(symbol: TradingPairSymbol) {
  const miniTicker = useBinanceMiniTicker();
  return MiniTickerUtils.format(miniTicker[symbol]);
};
