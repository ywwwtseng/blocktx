import { Chart } from "../../Chart";

interface Point {
  x: number;
  y: number;
}

export interface DatasetIterator {
  start: Point;
  end: Point;
  [Symbol.iterator](): Iterator<{ current: Point; next: () => Point | null }>;
}

export const dataset = (chart: Chart, key: string, transform: { x: (value: number) => number; y: (value: number) => number }): DatasetIterator => {
  const {
    axisBottom: axisBottomSettings,
  } = chart.settings;
  // const maxTickUnit = (axisBottomSettings.interval / axisBottomSettings.tickIntervalCount) * 1.2;
  const data = chart.data;

  const transfer = (item: { [key: string]: number | string }) => ({
    x: transform.x(item[axisBottomSettings.key] as number),
    y: transform.y(item[key] as number),
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