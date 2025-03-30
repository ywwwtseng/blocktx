import { MiniTicker24hr } from "@/hooks/useBinanceService";

export class MiniTickerUtils {
  static format(miniTicker: MiniTicker24hr) {
    const percentage = ((Number(miniTicker.c) - Number(miniTicker.o)) / Number(miniTicker.o)) * 100;
    const sign = percentage > 0 ? "+" : "-";

    return {
      symbol: miniTicker.s,
      price: Number(miniTicker.c).toFixed(2),
      percentage,
      label: `${sign}${Math.abs(percentage).toFixed(2)}%`,
      color: sign === "+" ? "#2DBC85" : "#F6465D",
    }
  }
}

export default MiniTickerUtils;