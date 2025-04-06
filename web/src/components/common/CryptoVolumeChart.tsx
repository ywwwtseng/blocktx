import { useRef, useEffect, useState } from "react";
import clsx from 'clsx';
import dayjs from "dayjs";
import { useBinanceKline } from "@/hooks/useBinanceService";
import { TimeUtils } from "@/utils/TimeUtils";
import { Chart, RawData } from "@/libs/chart";
import { Interval, KlineAttributes } from "@/types";

interface CryptoVolumeChartProps {
  className?: string;
  timeFormat?: string;
  interval: Interval;
  width: number;
  height: number;
}

export function CryptoVolumeChart({
  interval,
  className,
  timeFormat = "HH:mm",
  width,
  height,
}: CryptoVolumeChartProps) {
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
            type: "bar",
            width,
            height,
            color: (item: RawData) => item.c > item.o ? "#2EBD85" : "#F6465D",
            axisRight: {
              key: KlineAttributes.Volume,
              tickCount: 2,
            },
            axisBottom: {
              key: KlineAttributes.Timestamp,
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