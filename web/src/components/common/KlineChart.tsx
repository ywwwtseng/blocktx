import { useRef, useEffect, useState } from "react";
import { useBinanceKline } from "@/hooks/useBinanceService";
import clsx from 'clsx';
import dayjs from "dayjs";
import { useWindowSize } from "../../contexts/WindowSizeContext";
import { Chart } from "../../libs/chart";
import { TradingPairSymbol, KlineAttributes } from "../../types";

interface KlineChartProps {
  symbol: TradingPairSymbol;
}

export function KlineChart({ symbol }: KlineChartProps) {
  const data = useBinanceKline(symbol);
  const [drawEnd, setDrawEnd] = useState(false);
  const chartRef = useRef<Chart>(null);
  const { width } = useWindowSize();
  const canvasWidth = width ?? 0;
  const canvasHeight = Math.floor(canvasWidth * 0.5625);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.size(canvasWidth, canvasHeight);
      chart.draw();
    }
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart && data) {
      chart.data.add(data);
    }
  }, [data]);

  return (
    <canvas
      className={clsx("border-t border-b border-[#2B3139]", {
        "opacity-0": !drawEnd,
      })}
      ref={(canvas) => {
        if (canvas && !chartRef.current) {
          const ctx = canvas.getContext("2d")!;

          chartRef.current = new Chart(ctx, {
            type: "line",
            width: canvasWidth,
            height: canvasHeight,
            axisRight: {
              key: KlineAttributes.Close,
            },
            axisBottom: {
              key: KlineAttributes.Timestamp,
              interval: 15 * 60 * 1000,
              tickIntervalCount: 15,
              label: (value: Date) => dayjs(value).format("HH:mm"),
            },
          });

          chartRef.current.onDrawEnd = () => {
            setDrawEnd(true);
          };
        }
      }}
    />
  );
}