import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { Socket } from '@/libs/socket';
import { URLUtils } from "@/utils/URLUtils";

export enum TradingPairSymbol {
  BTCUSDT = "BTCUSDT",
  TONUSDT = "TONUSDT",
  SOLUSDT = "SOLUSDT",
  ETHUSDT = "ETHUSDT",
  SUIUSDT = "SUIUSDT",
}

export enum KlineAttributes {
  Timestamp = "t",
  Open = "o",
  High = "h",
  Low = "l",
  Close = "c",
  Volume = "v",
  End = "x",
}

export type RawKline = (string | number)[];

export type SocketRawKline = {
  e: string;
  k: {
    [KlineAttributes.Timestamp]: number;
    [KlineAttributes.Open]: number;
    [KlineAttributes.High]: number;
    [KlineAttributes.Low]: number;
    [KlineAttributes.Close]: number;
    [KlineAttributes.Volume]: number;
    [KlineAttributes.End]: boolean;
  };
}

export type Kline = {
  [KlineAttributes.Timestamp]: number;
  [KlineAttributes.Open]: number;
  [KlineAttributes.High]: number;
  [KlineAttributes.Low]: number;
  [KlineAttributes.Close]: number;
  [KlineAttributes.Volume]: number;
}

export interface Ticker24hr {
  e: "24hrTicker";      // 事件类型
  E: number;            // 事件时间
  s: TradingPairSymbol; // 交易对
  p: string;            // 24小时价格变化
  P: string;            // 24小时价格变化（百分比）
  w: string;            // 平均价格
  x: string;            // 整整24小时之前，向前数的最后一次成交价格
  c: string;            // 最新成交价格
  Q: string;            // 最新成交交易的成交量
  b: string;            // 目前最高买单价
  B: string;            // 目前最高买单价的挂单量
  a: string;            // 目前最低卖单价
  A: string;            // 目前最低卖单价的挂单量
  o: string;            // 整整24小时前，向后数的第一次成交价格
  h: string;            // 24小时内最高成交价
  l: string;            // 24小时内最低成交加
  v: string;            // 24小时内成交量
  q: string;            // 24小时内成交额
  O: number;            // 统计开始时间
  C: number;            // 统计结束时间
  F: number;            // 24小时内第一笔成交交易ID
  L: number;            // 24小时内最后一笔成交交易ID
  n: number;            // 24小时内成交数
}

export enum StreamType {
  TickerArr = '!ticker@arr',
}

export interface Stream {
  stream: StreamType;
  data: Ticker24hr[];
}

export interface BinanceSocketMessage {
  method: string;
  params: string[];
  id: number;
}

export interface BinanceSocketEventMessage {
  stream: string;
  data: SocketRawKline;
}

export const endpoints = {
  klines: "/v3/uiKlines",
}

export const events = {
  miniTicker: "!miniTicker@arr@3000ms",
  usdtusdt: {
    aggTrade: "usdtusdt@aggTrade",
  },
  btcusdt: {
    aggTrade: "btcusdt@aggTrade",
    depth: "btcusdt@depth",
    kline: {
      "1s": "btcusdt@kline_1s",
      "1m": "btcusdt@kline_1m",
      "5m": "btcusdt@kline_5m",
      "15m": "btcusdt@kline_15m",
      "30m": "btcusdt@kline_30m",
      "1h": "btcusdt@kline_1h",
      "4h": "btcusdt@kline_4h",
      "1d": "btcusdt@kline_1d",
    },
  }
}

type BinanceServiceState = {
  data: {
    klines: Partial<Record<TradingPairSymbol, Kline[]>>;
  };
  socket: Socket<BinanceSocketEventMessage> | null;
  klines: {
    history: (symbol: TradingPairSymbol) => Promise<void>;
  },
  init: () => () => void;
};

export const useBinanceService = create<BinanceServiceState>((set, get) => ({
  data: {
    klines: {},
  },
  socket: null,
  klines: {
    history: async (symbol: TradingPairSymbol) => {
      const endpoint = URLUtils.stringifyUrl(
        endpoints.klines,
        {
          symbol,
          interval: "1s",
          limit: 1000,
        });

      const response = await fetch(`${process.env.NEXT_PUBLIC_BINANCE_API_URL!}${endpoint}`);
      const data = await response.json();
  
      // set({ data: { ...data, [symbol]: data } });
      // 只更新特定 symbol，不覆蓋整個 data
      set((state) => ({
        data: {
          ...state.data,
          klines: {
            ...state.data.klines,
            [symbol]: data.map((item: RawKline) => ({
              [KlineAttributes.Timestamp]: Number(item[0]),
              [KlineAttributes.Open]: Number(item[1]),
              [KlineAttributes.High]: Number(item[2]),
              [KlineAttributes.Low]: Number(item[3]),
              [KlineAttributes.Close]: Number(item[4]),
              [KlineAttributes.Volume]: Number(item[5]),
            })),
          },
        },
      }));
    }
  },
  init: () => {
    const socket = new Socket<BinanceSocketEventMessage>({
      url: process.env.NEXT_PUBLIC_BINANCE_WS_URL!,
    });

    socket.onOpen = async () => {
      set({ socket });

      await get().klines.history(TradingPairSymbol.BTCUSDT);

      // socket.send({
      //   method: "SUBSCRIBE",
      //   params: [
      //     events.miniTicker,
      //     events.btcusdt.aggTrade,
      //     events.usdtusdt.aggTrade,
      //     events.btcusdt.depth,
      //     events.btcusdt.kline["1s"],
      //   ],
      //   id: 1
      // });
      socket.onMessage = (message: BinanceSocketEventMessage) => {
        if (message.stream === "btcusdt@kline_1s") {
          set((state) => ({
            data: {
              ...state.data,
              klines: {
                ...state.data.klines,
                [TradingPairSymbol.BTCUSDT]: [
                  ...(state.data.klines[TradingPairSymbol.BTCUSDT] || []),
                  {
                    [KlineAttributes.Timestamp]: message.data.k[KlineAttributes.Timestamp],
                    [KlineAttributes.Open]: message.data.k[KlineAttributes.Open],
                    [KlineAttributes.High]: message.data.k[KlineAttributes.High],
                    [KlineAttributes.Low]: message.data.k[KlineAttributes.Low],
                    [KlineAttributes.Close]: message.data.k[KlineAttributes.Close],
                    [KlineAttributes.Volume]: message.data.k[KlineAttributes.Volume],
                  },
                ],
              },
            },
          }));
        }
      }
    };

    socket.connect();

    return () => {
      socket.disconnect();
    }
  },
}));

export const useBinanceKlineData = (symbol: TradingPairSymbol) => {
  return useBinanceService(useShallow((state) => state.data.klines[symbol]));
};
