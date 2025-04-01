import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { Socket } from '@/libs/socket';
import { URLUtils } from "@/utils/URLUtils";
import {
  TradingPairSymbol,
  MiniTicker24hr,
  Kline,
  RawKline,
  KlineAttributes,
  BinanceSocketEventMessage,
  SocketRawKline
} from "@/types";

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
    miniTicker: Partial<Record<TradingPairSymbol, MiniTicker24hr>>;
    klines: Partial<Record<TradingPairSymbol, Kline[]>>;
  };
  socket: Socket<BinanceSocketEventMessage> | null;
  klines: {
    history: (symbol: TradingPairSymbol) => Promise<void>;
  },
  products: {
    receive: () => Promise<void>;
  },
  init: () => () => void;
};

export const useBinanceService = create<BinanceServiceState>((set, get) => ({
  data: {
    miniTicker: {},
    klines: {},
  },
  socket: null,
  products: {
    receive: async () => {
      const response = await fetch("https://www.binance.com/bapi/asset/v2/public/asset-service/product/get-products");
      const data = await response.json();

      console.log(data, 'data')

      return data;
    },
  },
  klines: {
    history: async (symbol: TradingPairSymbol) => {
      const response = await fetch(
        URLUtils.stringifyUrl(
          "https://www.binance.com/api/v3/uiKlines",
          {
            symbol,
            interval: "1s",
            limit: 1000,
          }
        )
      );

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

      await get().klines.history(TradingPairSymbol.BTCUSDT);

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

      socket.onMessage = (message: BinanceSocketEventMessage) => {
        if (message.stream === events.btcusdt.kline["1s"]) {
          const data = message.data as SocketRawKline;

          set((state) => ({
            data: {
              ...state.data,
              klines: {
                ...state.data.klines,
                [TradingPairSymbol.BTCUSDT]: [
                  ...(state.data.klines[TradingPairSymbol.BTCUSDT] || []).slice(-500),
                  {
                    [KlineAttributes.Timestamp]: data.k[KlineAttributes.Timestamp],
                    [KlineAttributes.Open]: data.k[KlineAttributes.Open],
                    [KlineAttributes.High]: data.k[KlineAttributes.High],
                    [KlineAttributes.Low]: data.k[KlineAttributes.Low],
                    [KlineAttributes.Close]: data.k[KlineAttributes.Close],
                    [KlineAttributes.Volume]: data.k[KlineAttributes.Volume],
                  },
                ],
              },
            },
          }));
        } else if (message.stream === events.miniTicker) {
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

export const useBinanceKline = (symbol: TradingPairSymbol) => {
  return useBinanceService(useShallow((state) => state.data.klines[symbol]));
};

export const useBinanceMiniTicker = () => {
  return useBinanceService(useShallow((state) => state.data.miniTicker));
};
