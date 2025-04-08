import { useRef, useEffect } from "react";
import clsx from 'clsx';
import dayjs from "dayjs";
import { useBinanceKline } from "@/hooks/useBinanceService";
import { TimeUtils } from "@/utils/TimeUtils";
import { Chart, RawData } from "@/libs/chart";
import { Interval, KlineAttributes } from "@/types";

interface CryptoPriceChartProps {
  className?: string;
  hidden?: boolean;
  timeFormat?: string;
  type?: "kline" | "line";
  interval: Interval;
  width: number;
  height: number;
  hideBottomAxis?: boolean;
  onDrawEnd?: () => void;
}

export function CryptoPriceChart({
  interval,
  hidden = false,
  className,
  type = "line",
  timeFormat = "HH:mm",
  width,
  height,
  hideBottomAxis = false,
  onDrawEnd,
}: CryptoPriceChartProps) {
  const data = useBinanceKline(interval);
  const chartRef = useRef<Chart>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.size(width, height);
      chart.draw();
    }
  }, [width, height]);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart && data) {
      chart.data.add(data);
    }
  }, [data]);

  return (
    <canvas
      className={clsx("transition-opacity duration-230", className, {
        "opacity-0": hidden,
      })}
      ref={(canvas) => {
        if (canvas && !chartRef.current) {
          const ctx = canvas.getContext("2d")!;

          chartRef.current = new Chart(ctx, {
            type,
            width,
            height,
            color: (item: RawData) => item.c > item.o ? "#2EBD85" : "#F6465D",
            axisRight: {
              key: KlineAttributes.Close,
            },
            axisBottom: {
              key: KlineAttributes.StartTime,
              height: hideBottomAxis ? 0 : 20,
              interval: 15 * TimeUtils.ms(interval),
              tickIntervalCount: 15,
              label: (value: Date) => dayjs(value).format(timeFormat),
            },
          });

          chartRef.current.onDrawEnd = () => {
            onDrawEnd?.();
          };
        }
      }}
    />
  );
}