import { Chart } from "../../Chart";
import { DataIterator, Line, Transform, RawData } from "../../types";

export const iterator = (chart: Chart, key: string, data: RawData[], transform: Transform): DataIterator<Line> => {
  const {
    axisBottom: axisBottomSettings,
  } = chart.settings;
  // const maxTickUnit = (axisBottomSettings.interval / axisBottomSettings.tickIntervalCount) * 1.2;

  const transfer = (item: RawData) => ({
    x: Number(transform.x(item[axisBottomSettings.key] as number).toFixed(2)),
    y: Number(transform.y(item[key] as number).toFixed(2)),
  });

  return {
    get start() {
      return {
        current: transfer(data[0]),
        next: () => {
          const nextPoint = data[1];
          if (!nextPoint) return null;
          return transfer(nextPoint);
        }
      };
    },
    get end() {
      return {
        current: transfer(data[data.length - 1]),
        next: () => null,
      };
    },
    [Symbol.iterator]() {
      let i = 0;

      return {
        next() {
          const item = data[i++];
          if (!item) return { done: true, value: null };

          return { 
            done: false,
            value: {
              current: transfer(item),
              next: () => {
                const nextPoint = data[i];
                if (!nextPoint) return null;
                // if (nextPoint[axisBottomSettings.key] - item[axisBottomSettings.key] >= maxTickUnit) {
                //   return;
                // }
                return transfer(nextPoint);
              } 
            }
          };
        }
      };
    }
  };
};