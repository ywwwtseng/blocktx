import { Chart } from "../../Chart";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const render = (chart: Chart, dataset: any, settings: { color?: string }) => {
  for (const item of dataset) {
    chart.ctx.fillStyle = settings.color || "#FCD435";
    chart.ctx.fillRect(item[0], item[1], item[2], item[3]);
  }
};