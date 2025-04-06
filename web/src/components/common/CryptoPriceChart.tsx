import { useRef, useEffect, useState } from "react";
import clsx from 'clsx';
import dayjs from "dayjs";
import { useBinanceKline } from "@/hooks/useBinanceService";
import { TimeUtils } from "@/utils/TimeUtils";
import { Chart, RawData } from "@/libs/chart";
import { Interval, KlineAttributes } from "@/types";

interface CryptoPriceChartProps {
  className?: string;
  timeFormat?: string;
  type?: "kline" | "line";
  interval: Interval;
  width: number;
  height: number;
  hideBottomAxis?: boolean;
}

export function CryptoPriceChart({
  interval,
  className,
  type = "line",
  timeFormat = "HH:mm",
  width,
  height,
  hideBottomAxis = false,
}: CryptoPriceChartProps) {
  const data = useBinanceKline(interval);
  const [drawEnd, setDrawEnd] = useState(false);
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
      className={clsx(className, {
        "opacity-0": !drawEnd,
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
              key: KlineAttributes.Timestamp,
              height: hideBottomAxis ? 0 : 20,
              interval: 15 * TimeUtils.ms(interval),
              tickIntervalCount: 15,
              label: (value: Date) => dayjs(value).format(timeFormat),
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