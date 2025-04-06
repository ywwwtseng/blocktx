import { MiniTicker24hr } from "../types";

export class MiniTickerUtils {
  static format(miniTicker: MiniTicker24hr | undefined) {
    if (!miniTicker) {
      return null;
    }

    const percentage = ((Number(miniTicker.c) - Number(miniTicker.o)) / Number(miniTicker.o)) * 100;
    const sign = percentage > 0 ? "+" : "-";

    return {
      symbol: miniTicker.s,
      price: Number(miniTicker.c).toFixed(2),
      percentage,
      change: `${sign}${Math.abs(percentage).toFixed(2)}%`,
    }
  }
}

export default MiniTickerUtils;