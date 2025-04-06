import { useMemo } from "react";
import numbro from "numbro";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { Socket } from '../libs/socket';
import { URLUtils } from "../utils/URLUtils";
import {
  TradingPairSymbol,
  MiniTicker24hr,
  Kline,
  RawKline,
  KlineAttributes,
  BinanceSocketEventMessage,
  SocketRawKline,
  Interval,
} from "../types";

export const events = {
  miniTicker: "!miniTicker@arr@1000ms",
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
    selected: TradingPairSymbol;
    miniTicker: Partial<Record<TradingPairSymbol, MiniTicker24hr>>;
    klines: Partial<Record<Interval, Kline[]>>;
  };
  socket: Socket<BinanceSocketEventMessage> | null;
  klines: {
    history: (interval: Interval) => Promise<void>;
  },
  products: {
    receive: () => Promise<void>;
  },
  init: () => () => void;
};

export const useBinanceService = create<BinanceServiceState>((set, get) => ({
  data: {
    selected: TradingPairSymbol.BTCUSDT,
    miniTicker: {},
    klines: {},
  },
  socket: null,
  products: {
    receive: async () => {
      const response = await fetch("https://www.binance.com/bapi/asset/v2/public/asset-service/product/get-products");
      const data = await response.json();

      return data;
    },
  },
  klines: {
    history: async (interval: Interval) => {
      const response = await fetch(
        URLUtils.stringifyUrl(
          "https://www.binance.com/api/v3/uiKlines",
          {
            symbol: get().data.selected,
            interval,
            limit: 1000,
          }
        )
      );

      const data = await response.json();

      // https://developers.binance.com/docs/zh-CN/binance-spot-api-docs/rest-api/market-data-endpoints#k%E7%BA%BF%E6%95%B0%E6%8D%AE
      // [
      //   [
      //     1499040000000,      // 开盘时间
      //     "0.01634790",       // 开盘价
      //     "0.80000000",       // 最高价
      //     "0.01575800",       // 最低价
      //     "0.01577100",       // 收盘价(当前K线未结束的即为最新价)
      //     "148976.11427815",  // 成交量
      //     1499644799999,      // 收盘时间
      //     "2434.19055334",    // 成交额
      //     308,                // 成交笔数
      //     "1756.87402397",    // 主动买入成交量
      //     "28.46694368",      // 主动买入成交额
      //     "17928899.62484339" // 请忽略该参数
      //   ]
      // ]
  
      // set({ data: { ...data, [symbol]: data } });
      // 只更新特定 symbol，不覆蓋整個 data
      set((state) => ({
        data: {
          ...state.data,
          klines: {
            ...state.data.klines,
            [interval]: data.map((item: RawKline) => ({
              [KlineAttributes.Timestamp]: Number(item[0]),
              [KlineAttributes.Open]: Number(item[1]),
              [KlineAttributes.High]: Number(item[2]),
              [KlineAttributes.Low]: Number(item[3]),
              [KlineAttributes.Close]: Number(item[4]),
              [KlineAttributes.Volume]: Number(item[5]),
              [KlineAttributes.Quantity]: Number(item[7]),
            })),
          },
        },
      }));
    }
  },
  init: () => {
    const socket = new Socket<BinanceSocketEventMessage>({
      url: "wss://stream.binance.com/stream",
    });

    get().products.receive();

    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "hidden") {
        get().products.receive();
      }
    });

    socket.onOpen = async () => {
      set({ socket });

      await Promise.all([
        get().klines.history("1m"),
        get().klines.history("4h"),
      ]);

      socket.send({
        method: "SUBSCRIBE",
        params: [
          events.miniTicker,
          events.btcusdt.aggTrade,
          events.usdtusdt.aggTrade,
          events.btcusdt.depth,
          events.btcusdt.kline["1m"],
          events.btcusdt.kline["4h"],
        ],
        id: 1
      });

      socket.onMessage = (message: BinanceSocketEventMessage) => {
        if (message.stream === events.miniTicker) {
          const data = message.data as MiniTicker24hr[];

          set((state) => ({
            data: {
              ...state.data,
              miniTicker: {
                ...state.data.miniTicker,
                ...Object.values(TradingPairSymbol).reduce((acc, symbol) => ({
                  ...acc,
                  [symbol]: {
                    ...state.data.miniTicker[symbol],
                    ...data.find((item) => item.s === symbol),
                  },
                }), {}),
              },
            },
          }));

          return;
        }

        const intervals = Object.keys(events.btcusdt.kline) as Interval[];

        for (const interval of intervals) {
          if (message.stream === events.btcusdt.kline[interval]) {
            const data = message.data as SocketRawKline;

            set((state) => ({
              data: {
                ...state.data,
                klines: {
                  ...state.data.klines,
                  [interval]: [
                    ...(state.data.klines[interval] || [])
                      .filter((item) => item[KlineAttributes.Timestamp] !== data.k[KlineAttributes.Timestamp]),
                    {
                      [KlineAttributes.Timestamp]: Number(data.k[KlineAttributes.Timestamp]),
                      [KlineAttributes.Open]: Number(data.k[KlineAttributes.Open]),
                      [KlineAttributes.High]: Number(data.k[KlineAttributes.High]),
                      [KlineAttributes.Low]: Number(data.k[KlineAttributes.Low]),
                      [KlineAttributes.Close]: Number(data.k[KlineAttributes.Close]),
                      [KlineAttributes.Volume]: Number(data.k[KlineAttributes.Volume]),
                      [KlineAttributes.Quantity]: Number(data.k[KlineAttributes.Quantity]),
                    },
                  ],
                },
              },
            }));
          }
        }
      }
    };

    socket.connect();

    return () => {
      // if (socket.isConnected) {
      //   socket.send({
      //     method: "UNSUBSCRIBE",
      //     params: [
      //     events.miniTicker,
      //     events.btcusdt.aggTrade,
      //     events.usdtusdt.aggTrade,
      //     events.btcusdt.depth,
      //     events.btcusdt.kline["1s"],
      //   ],
      //   id: 1
      //   });
      // }
      // socket.disconnect();

      // set({ socket: null });
    }
  },
}));

export const useBinanceKline = (interval: Interval) => {
  return useBinanceService(useShallow((state) => state.data.klines[interval]));
};

export const useBinanceKlineVolume = () => {
  const kline1m = useBinanceKline("1m");
  const kline4h = useBinanceKline("4h");


  return useMemo(() => {
    const numbroVolume = (value: number) => numbro(value).format({
      thousandSeparated: true,
      spaceSeparated: true,
      average: true,
      mantissa: 2
    });

    return {
      "1m": kline1m
        ? numbroVolume(kline1m[kline1m.length - 1][KlineAttributes.Quantity])
        : "-",
      "1h": kline1m
        ? numbroVolume(kline1m.slice(-60).reduce((acc, item) => acc + item[KlineAttributes.Quantity], 0))
        : "-",
      "4h": kline4h
        ? numbroVolume(kline4h[kline4h.length - 1][KlineAttributes.Quantity])
        : "-",
    }
  }, [kline1m, kline4h]);
};

export const useBinanceMiniTicker = () => {
  return useBinanceService(useShallow((state) => state.data.miniTicker));
};
