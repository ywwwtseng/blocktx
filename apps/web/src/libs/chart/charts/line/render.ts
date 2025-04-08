import { Chart } from "../../Chart";
import { DataIterator, Line } from "../../types";

export const render = <T extends DataIterator<Line>>(chart: Chart, iterator: T) => {
  const color = "#FCD435";

  // gradient
  const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.innerBottom);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, `${color}00`);

  chart.ctx.beginPath();

  let moveTo;
  for (const point of iterator) {
    if (!moveTo) {
      chart.ctx.moveTo(point.current.x, point.current.y);
      moveTo = point.current;
    } else {
      chart.ctx.lineTo(point.current.x, point.current.y);
    }
  }

  chart.ctx.lineTo(iterator.end.current.x, chart.innerBottom);
  chart.ctx.lineTo(iterator.start.current.x, chart.innerBottom);

  chart.ctx.closePath();

  chart.ctx.fillStyle = gradient;
  chart.ctx.fill();

  // stroke
  chart.ctx.strokeStyle = color;
  chart.ctx.lineWidth = 1;

  chart.ctx.beginPath();
  for (const point of iterator) {
    const next = point.next();

    if (next) {
      chart.ctx.moveTo(point.current.x, point.current.y);
      chart.ctx.lineTo(next.x, next.y);
    }
  }

  chart.ctx.lineCap = "round";
  chart.ctx.lineJoin = "round";
  
  chart.ctx.closePath();
  chart.ctx.stroke();
};