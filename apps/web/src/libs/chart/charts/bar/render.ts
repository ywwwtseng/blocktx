import { Chart } from "../../Chart";
import { DataIterator, Bar } from "../../types";

export const render = <T extends DataIterator<Bar>>(
  chart: Chart,
  iterator: T
) => {
  for (const item of iterator) {
    chart.ctx.fillStyle = item.color;
    chart.ctx.fillRect(item.x, item.h, item.dx, item.dy);
  }
};