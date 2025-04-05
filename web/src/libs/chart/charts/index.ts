import * as line from "./line";
import * as bar from "./bar";
import * as kline from "./kline";
import { Chart } from "../Chart";
import { Transform } from "../types";

export type ChartType = "line" | "bar" | "kline";

export const render = (type: ChartType, chart: Chart, key: string, transform: Transform) => {
  if (type === "line") {
    line.render(chart, line.iterator(chart, key, transform!));
  } else if (type === "bar") {
    bar.render(chart, bar.iterator(chart, key, transform!));
  } else if (type === "kline") {
    kline.render(chart, kline.iterator(chart, key, transform!));
  }
};
