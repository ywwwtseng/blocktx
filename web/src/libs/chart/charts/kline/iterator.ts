import { Chart } from "../../Chart";
import { DataIterator, OHLC, Transform, RawData } from "../../types";

export const iterator = (chart: Chart, _: string, transform: Transform): DataIterator<OHLC> => {
  const data = chart.data.values;

  const transfer = (item: RawData) => {
    const x0 = transform.x(item.start as number);
    const y0 = transform.y(item.open as number);
    const w = transform.x(item.end as number) - x0;
    const h = transform.y(item.close as number) - y0;

    const x = transform.x(item._time as number);

    return {
      rect: [
        x0,
        y0,
        w,
        h,
      ],
      line: {
        p0: [x, transform.y(item.low as number)],
        p1: [x, transform.y(item.high as number)],
      },
      color: h > 0 ? "#F6465D" : "#2DBC85",
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