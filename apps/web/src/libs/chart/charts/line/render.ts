import { Chart } from "../../Chart";
import { CanvasUtils } from "../../utils/CanvasUtils";
import { DataIterator, Point } from "../../types";

export const render = <T extends DataIterator<Point>>(chart: Chart, iterator: T) => {
  const color = "#FCD435";

  // gradient
  const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.innerBottom);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, `${color}00`);

  chart.ctx.beginPath();

  let moveTo;
  for (const point of iterator) {
    if (!moveTo) {
      chart.ctx.moveTo(point.x, point.y);
      moveTo = point;
    } else {
      chart.ctx.lineTo(point.x, point.y);
    }
  }

  chart.ctx.lineTo(iterator.end.x, chart.innerBottom);
  chart.ctx.lineTo(iterator.start.x, chart.innerBottom);

  chart.ctx.closePath();

  chart.ctx.fillStyle = gradient;
  chart.ctx.fill();


  chart.ctx.strokeStyle = color;
  chart.ctx.lineWidth = 2;
  CanvasUtils.strokeInPixel(chart.ctx, () => {
    chart.ctx.beginPath();

    let moveTo;

    for (const point of iterator) {
      if (!moveTo) {
        chart.ctx.moveTo(point.x, point.y);
        moveTo = point;
      } else {
        chart.ctx.lineTo(point.x, point.y);
      }
    }

    chart.ctx.stroke();
  })

  
  
  {
    
  }

  

  
};