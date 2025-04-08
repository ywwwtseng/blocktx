import { RawData } from "./types";

export const kines = async (
  symbol: "BTCUSDT",
  interval: "1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "1d",
  limit = 1000
) => {
  const response = await fetch(
    `https://www.binance.com/api/v3/uiKlines?symbol=${symbol}&interval=${interval}&limit=${limit}`
  );

  const data = await response.json();

  return data.map((kine: RawData) => {
    const [openTime, open, high, low, close, volume, closeTime, quoteVolume, trades, takerBuyBaseVolume, takerBuyQuoteVolume, ignore] = kine;
    return {
      symbol,
      open_time: openTime,
      close_time: closeTime,
      change_percentage: Number(((Number(close) - Number(open)) / Number(close)).toFixed(4)) * 100,
      volume: Number(volume),
    };
  });
};

export const fng = async () => {
  const response = await fetch("https://api.alternative.me/fng/");
  const data = await response.json();
  return data.data[0].value;
};
