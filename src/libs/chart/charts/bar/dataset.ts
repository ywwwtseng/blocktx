import { Chart } from "../../Chart";
import { TimeUtils} from "../../utils/TimeUtils";

export const dataset = (chart: Chart, key: string, transform: { x: (value: number) => number; y: (value: number) => number }) => {
  const data = chart.data;

  const transfer = (item: { [key: string]: number }) => {
    const {
      axisBottom: axisBottomSettings,
      axisBottom: { interval, tickIntervalCount }
    } = chart.settings;
    const value = item[key];
    const { start, end } = TimeUtils.slot(item[axisBottomSettings.key], interval / tickIntervalCount);
    
    const x = transform.x(start);
    const h = transform.y(value);
    const dx = transform.x(end) - x;
    const dy = chart.innerBottom - h

    return [
      x,
      h,
      dx,
      dy,
    ]
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