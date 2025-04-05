import { Chart } from "../../Chart";
import { DataIterator } from "../../types";

export const render = <T extends DataIterator<number[]>>(
  chart: Chart,
  iterator: T
) => {
  for (const item of iterator) {
    chart.ctx.fillStyle = "#FCD435";
    chart.ctx.fillRect(item[0], item[1], item[2], item[3]);
  }
};