import { CanvasUtils} from "../utils/CanvasUtils";
import { Chart } from "../Chart";
import { Axis, AxisSettings } from "./Axis";
import { Bounds, Tick, RawData } from "../types";

export type AxisVerticalSettings<T = Record<string, unknown>> = AxisSettings<T & {
  unit?: string;
  width?: number;
}>;

export class AxisVertical<T extends AxisVerticalSettings = AxisVerticalSettings> extends Axis<T> {
  benchmark: { point: () => number; value: number | null };
  ticks: Tick[];
  tickInterval!: number;
  bounds: Bounds;
  
  constructor(type: string, chart: Chart, bounds: Bounds, settings: T) {
    super(type, chart, settings);
    this.bounds = bounds;
    
    this.benchmark = {
      point: () => this.chart.innerBottom - 10,
      value: null,
    };
    
    this.ticks = [];
  }

  get top() {
    return this.bounds.top();
  }

  get left() {
    return this.bounds.left();
  }

  get width() {
    return this.bounds.width();
  }

  get height() {
    return this.bounds.height();
  }
  get tickSize(): number {
    return Math.abs(Math.floor((this.benchmark.point() - this.top - 24) / 4));
  }

  y(value: number): number {
    return Math.min(
      this.benchmark.point() + ((this.benchmark.value! - value) / this.tickInterval) * this.tickSize,
      this.chart.innerBottom - 1,
    );
  }

  draw(data: RawData[]): void {
    this.chart.ctx.clearRect(this.left - 1, this.top, this.width + 1, this.height);

    const lowHigh = this.chart.data.helpers.lowHigh(data);
    const low = Math.floor(lowHigh[0] / 20) * 20;
    const high = Math.ceil(lowHigh[1] / 20) * 20;

    this.chart.ctx.beginPath();
    this.chart.ctx.strokeStyle = "#2B3139";
    this.chart.ctx.lineWidth = 1;

    if (this.type === "axis_left") {
      this.chart.ctx.moveTo(this.left + this.width, this.top);
      this.chart.ctx.lineTo(this.left + this.width, this.height);
    } else {
      this.chart.ctx.moveTo(this.left, this.top);
      this.chart.ctx.lineTo(this.left, this.height - this.chart.axisBottom.height - 1);
      this.chart.ctx.moveTo(this.left, this.height + this.chart.axisBottom.height + 1);
      this.chart.ctx.lineTo(this.left, this.height - 1);
    }

    if (low !== 0) {
      this.chart.ctx.moveTo(this.left, this.chart.axisBottom.top);
      this.chart.ctx.lineTo(this.chart.width, this.chart.axisBottom.top);
    }
    
    this.chart.ctx.stroke();

    if (this.settings.unit) {
      CanvasUtils.text(this.chart.ctx)(
        `(${this.settings.unit})`,
        this.left + this.width / 2,
        this.top + 10,
        this.chart.theme.text
      );
    }

    if (low === 0) {
      this.benchmark.point = () =>this.chart.axisBottom.top;
      this.benchmark.value = 0;
    } else {
      this.benchmark.value = low;
    }

    this.tickInterval = Math.ceil((high - low) / 4);
    
    const ticks: Tick[] = [];
    let x: number;

    if (this.type === "axis_left") {
      x = this.chart.padding.left + this.width / 2;
    } else {
      x = this.left + this.width / 2;
    }

    for (let index = 0; index < 5; index++) {
      const value = low + this.tickInterval * index;
      const tick: Tick = {
        label: value,
        value,
        x,
        y: this.y(value),
      };
      
      ticks.push(tick);
      CanvasUtils.text(this.chart.ctx)(tick.label.toString(), tick.x, tick.y, this.chart.theme.text);   
    }
    
    this.ticks = ticks;
  }
}
