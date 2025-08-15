import { Chart } from "../../Chart";
import { TimeUtils } from "../../utils/TimeUtils";
import { DataIterator, Transform, RawData, Bar } from "../../types";

export const iterator = (chart: Chart, key: string, data: RawData[], transform: Transform): DataIterator<Bar> => {
  const transfer = (item: RawData) => {
    const {
      axisBottom: axisBottomSettings,
      axisBottom: { interval, tickIntervalCount }
    } = chart.settings;
    const value = item[key] as number;
    const { start, end } = TimeUtils.slot(item[axisBottomSettings.key] as number, interval / tickIntervalCount);
    
    const x = transform.x(start) + 1;
    const h = transform.y(value);
    const dx = transform.x(end) - x - 1;
    const dy = chart.innerBottom - h;

    return {
      x,
      h,
      dx,
      dy,
      color: chart.settings.color?.(item) || "#2EBD85",
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