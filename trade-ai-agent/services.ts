import { env } from "bun";
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
      price: close,
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

export async function bot_send({
  message,
}: {
  message: string;
}) {
  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendPhoto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: "5699547696",
      photo: "https://blocktx.vercel.app/photo.png",
      caption: message,
      parse_mode: "Markdown",
    }),
  });

  const data = await res.json();

  return data;
}
