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
    this.chart.ctx.beginPath();
    this.chart.ctx.strokeStyle = "#2B3139";
    this.chart.ctx.lineWidth = 1;

    axisBottom.ticks.forEach((tick) => {
      if (tick.x > axisRight.left) {
        return;
      }
      this.chart.ctx.moveTo(tick.x, this.top);
      this.chart.ctx.lineTo(tick.x, this.height);
    });

    axisRight.ticks.forEach((tick) => {
      if (tick.y >= this.chart.innerBottom - 2) {
        return;
      }

      this.chart.ctx.moveTo(this.left + this.chart.ctx.lineWidth, tick.y);
      this.chart.ctx.lineTo(this.width + this.left, tick.y);
    });
    this.chart.ctx.stroke();
  }
}
