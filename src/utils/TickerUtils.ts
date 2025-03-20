import { TradingPairSymbol, Ticker24hr } from "@/hooks/useBinanceService";

export const name = (ticker: Ticker24hr) => {
  switch (ticker.s) {
    case TradingPairSymbol.BTCUSDT:
      return "BTC/USDT";
    case TradingPairSymbol.ETHUSDT:
      return "ETH/USDT";
    case TradingPairSymbol.SOLUSDT:
      return "SOL/USDT";
    case TradingPairSymbol.SUIUSDT:
      return "SUI/USDT";
    case TradingPairSymbol.TONUSDT:
      return "TON/USDT";
    default:
      return;
  }
};

export const price = (ticker: Ticker24hr) => {
  const lastPrice = Number(ticker.c);
  const lastPriceString = lastPrice.toFixed(lastPrice > 10 ? 2 : 4);
  const fixedWidth = `${(lastPriceString.length - 1) * 8 + 2}px`;

  return {
    value: lastPriceString,
    fixedWidth,
  };
};


export const change = (ticker: Ticker24hr) => {
  const percentage = ticker.P;
  const sign = Number(percentage) >= 0 ? "+" : "-";
  const value = Math.abs(Number(percentage)).toFixed(2);
  const label = `${sign}${value}%`;
  const fixedWidth = `${(value.length + 1) * 8 + 4}px`;

  return {
    sign,
    value,
    label,
    fixedWidth,
    color: sign === "+" ? "#2DBC85" : "#F6465D",
  }
};