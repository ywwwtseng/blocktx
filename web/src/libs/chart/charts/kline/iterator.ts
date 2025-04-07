import { Chart } from "../../Chart";
import { TimeUtils } from "../../utils/TimeUtils";
import { CanvasUtils } from "../../utils/CanvasUtils";
import { DataIterator, OHLC, Transform, RawData } from "../../types";

export const iterator = (chart: Chart, _: string, data: RawData[], transform: Transform): DataIterator<OHLC> => {
  const transfer = (item: RawData) => {
    const {
      color,
      axisBottom: axisBottomSettings,
      axisBottom: { interval, tickIntervalCount }
    } = chart.settings;
    const { start, end } = TimeUtils.slot(item[axisBottomSettings.key] as number, interval / tickIntervalCount);
    const x0 = transform.x(start) + 0.5;
    const y0 = transform.y(item.o as number);
    const w = transform.x(end) - x0 - 0.5;
    const h = CanvasUtils.adjust(transform.y(item.c as number) - y0);

    return {
      rect: [
        x0,
        y0,
        w,
        h,
      ],
      line: {
        p0: [x0 + w / 2, transform.y(item.l as number)],
        p1: [x0 + w / 2, transform.y(item.h as number)],
      },
      color: color?.(item) || "#2EBD85",
    }
  };

  return {
    get start() {
      return transfer(data[0]);
    },
    get end() {
      return transfer(data[data.length - 1]);
    },
    [Symbol.iterator]() {
      let i = 0;

      return {
        next() {
          const item = data[i++];
          if (!item) return { done: true, value: null };
          return { 
            done: false,
            value: transfer(item)
          };
        }
      };
    }
  };
};