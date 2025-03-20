import { Chart } from "../Chart";

const DEFAULT_SETTINGS = { gradient: true, color: "#FCD435", lineWidth: 1 };

const gradient = (chart: Chart, dataset: any, color: string) => {
  const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.innerBottom);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, `${color}00`);

  chart.ctx.beginPath();

  let moveTo;
  for (const point of dataset) {
    if (!moveTo) {
      chart.ctx.moveTo(point.current.x, point.current.y);
      moveTo = point.current;
    } else {
      chart.ctx.lineTo(point.current.x, point.current.y);
    }
  }

  chart.ctx.lineTo(dataset.end.x, chart.innerBottom);
  chart.ctx.lineTo(dataset.start.x, chart.innerBottom);

  chart.ctx.closePath();

  chart.ctx.fillStyle = gradient;
  chart.ctx.fill();
};

export const render = (chart: Chart, dataset: any, settings: any = {}) => {
  settings = settings || DEFAULT_SETTINGS;
  const color = settings.color || DEFAULT_SETTINGS.color;
  const lineWidth =  settings.lineWidth || DEFAULT_SETTINGS.lineWidth;

  if (settings.gradient) {
    gradient(chart, dataset, color);
  }

  chart.ctx.strokeStyle = color;
  chart.ctx.lineWidth = lineWidth;

  chart.ctx.beginPath();
  for (const point of dataset) {

    const next = point.next();
    if (next) {
      chart.ctx.moveTo(point.current.x, point.current.y);
      chart.ctx.lineTo(next.x, next.y);
    }
  }
  
  chart.ctx.closePath();
  chart.ctx.stroke();
};