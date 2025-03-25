import { Chart } from "./Chart";
import { AxisBottom, AxisBottomSettings } from "./axes/AxisBottom";
import { AxisRight, AxisRightSettings } from "./axes/AxisRight";

export class Grid {
  private chart: Chart;
  private left: number = 0;
  private top: number = 0;
  private width: number = 0;
  private height: number = 0;

  constructor(chart: Chart) {
    this.chart = chart;
  }

  draw(axisBottom: AxisBottom<AxisBottomSettings>, axisRight: AxisRight<AxisRightSettings>) {
    this.left = this.chart.innerLeft;
    this.top = 0;
    this.width = this.chart.width - axisRight.width - this.left;
    this.height = this.chart.innerBottom;

    this.chart.ctx.clearRect(this.left, this.top, this.width - 1, this.height - 1);

    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    ctx.beginPath();
    ctx.strokeStyle = "#2B3139";
    ctx.lineWidth = 1;

    axisBottom.ticks.forEach((tick) => {
      if (tick.x > axisRight.left) {
        return;
      }
      ctx.moveTo(tick.x, this.top);
      ctx.lineTo(tick.x, this.height);
    });

    ctx.stroke();

    axisRight.ticks.forEach((tick) => {
      if (tick.y >= this.chart.innerBottom - 2) {
        return;
      }

      const yStart = tick.y - ctx.lineWidth / 2;
      const lineHeight = ctx.lineWidth;
      ctx.clearRect(this.left, yStart, this.width, lineHeight);

      ctx.beginPath();
      ctx.moveTo(this.left + ctx.lineWidth, tick.y);
      ctx.lineTo(this.width + this.left, tick.y);
      ctx.stroke();
    });

    this.chart.ctx.drawImage(canvas, this.left, this.top, this.width, this.height);
  }
}
