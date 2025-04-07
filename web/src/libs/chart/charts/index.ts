import * as line from "./line";
import * as bar from "./bar";
import * as kline from "./kline";
import { Chart } from "../Chart";
import { Transform, RawData } from "../types";

export type ChartType = "line" | "bar" | "kline";

export const render = (type: ChartType, chart: Chart, key: string, data: RawData[], transform: Transform) => {
  if (type === "line") {
    line.render(chart, line.iterator(chart, key, data, transform!));
  } else if (type === "bar") {
    bar.render(chart, bar.iterator(chart, key, data, transform!));
  } else if (type === "kline") {
    kline.render(chart, kline.iterator(chart, key, data, transform!));
  }
};
