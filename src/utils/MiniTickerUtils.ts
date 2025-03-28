import { MiniTicker24hr } from "@/hooks/useBinanceService";

export class MiniTickerUtils {
  static format(miniTicker: MiniTicker24hr) {
    return {
      symbol: miniTicker.s,
      price: Number(miniTicker.c).toFixed(2),
    }
  }
}

export default MiniTickerUtils;