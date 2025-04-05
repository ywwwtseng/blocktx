import { useRef, useEffect } from "react";
import dayjs from "dayjs";
import { useWindowSize } from "@/contexts/WindowSizeContext";
import { Chart } from "@/libs/chart";
import { Kline, KlineAttributes } from "@/types";

interface KlineChartProps {
  data: Kline[] | undefined;
}

export function KlineChart({ data }: KlineChartProps) {
  const scale = 1;
  const chartRef = useRef<Chart>(null);
  const { width } = useWindowSize();
  const canvasWidth = width ?? 0;
  const canvasHeight = canvasWidth * 0.5625;

  useEffect(() => {
    if (data && chartRef.current) {
      chartRef.current.data.add(data);
    }
  }, [data]);

  return (
    <canvas
      className="border-t border-b border-[#2B3139]"
      style={{
        width: canvasWidth,
        height: canvasHeight,
      }}
      width={canvasWidth * scale}
      height={canvasHeight * scale}
      ref={(ref) => {
        if (ref) {
          const ctx = ref.getContext("2d")!;

          chartRef.current = new Chart(ctx, {
            type: "line",
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
        }
      }}
    />
  );
}