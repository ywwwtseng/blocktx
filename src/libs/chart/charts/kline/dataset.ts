import { Chart } from "../../Chart";

export const dataset = (chart: Chart, _: string, transform: { x: (value: number) => number; y: (value: number) => number }) => {
  const data = chart.data;

  const transfer = (item: { [key: string]: number }) => {
    const x0 = transform.x(item.start);
    const y0 = transform.y(item.open);
    const w = transform.x(item.end) - x0;
    const h = transform.y(item.close) - y0;

    const x = transform.x(item._time);

    return {
      rect: [
        x0,
        y0,
        w,
        h,
      ],
      line: {
        p0: [x, transform.y(item.low)],
        p1: [x, transform.y(item.high)],
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