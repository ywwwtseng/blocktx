"use client";

import { useEffect } from "react";
import { 
  useBinanceKlineData,
  useBinanceService,
  TradingPairSymbol,
  events,
} from "@/hooks/useBinanceService";

export default function Home() {
  const { klines, socket } = useBinanceService();
  const data = useBinanceKlineData(TradingPairSymbol.BTCUSDT);

  useEffect(() => {
    if (socket) {
      klines.history(TradingPairSymbol.BTCUSDT);
      socket.send({
        method: "SUBSCRIBE",
        params: [
          events.miniTicker,
          events.btcusdt.aggTrade,
          events.usdtusdt.aggTrade,
          events.btcusdt.depth,
          events.btcusdt.kline["1s"],
        ],
        id: 1
      });
    }
  }, [socket, klines]);

  return (
    <div>
      {data?.map((kline) => (
        <div key={kline.t}>{kline.t}</div>
      ))}
    </div>
  );
}
