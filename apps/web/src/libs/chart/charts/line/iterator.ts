import { Chart } from "../../Chart";
import { DataIterator, Point, Transform, RawData } from "../../types";

export const iterator = (chart: Chart, key: string, data: RawData[], transform: Transform): DataIterator<Point> => {
  const {
    axisBottom: axisBottomSettings,
  } = chart.settings;
  // const maxTickUnit = (axisBottomSettings.interval / axisBottomSettings.tickIntervalCount) * 1.2;

  const transfer = (item: RawData) => ({
    x: Math.floor(transform.x(Number(item[axisBottomSettings.key]))),
    y: Math.floor(transform.y(Number(item[key]))),
  });

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