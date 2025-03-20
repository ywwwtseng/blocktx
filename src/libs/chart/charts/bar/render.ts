import { Chart } from "../Chart";

export const render = (chart: Chart, dataset: any, settings: { color: string }) => {
  for (const item of dataset) {
    chart.ctx.fillStyle = settings.color;
    chart.ctx.fillRect(item[0], item[1], item[2], item[3]);
  }
};