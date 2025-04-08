import { Chart } from "../../Chart";
import { DataIterator, OHLC } from "../../types";

export const render = <T extends DataIterator<OHLC>>(chart: Chart, iterator: T) => {
  for (const ohlc of iterator) {
    chart.ctx.fillStyle = ohlc.color;
    chart.ctx.strokeStyle = ohlc.color;
    chart.ctx.lineWidth = 1;

    chart.ctx.fillRect(ohlc.rect[0], ohlc.rect[1], ohlc.rect[2], ohlc.rect[3]);

    chart.ctx.beginPath();
    chart.ctx.moveTo(ohlc.line.p0[0], ohlc.line.p0[1]);
    chart.ctx.lineTo(ohlc.line.p1[0], ohlc.line.p1[1]);
    chart.ctx.closePath();
    chart.ctx.stroke();
  }
};
