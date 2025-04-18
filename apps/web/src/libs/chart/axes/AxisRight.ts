import { CanvasUtils } from "../utils/CanvasUtils";
import { ArrayUtils } from "../utils/ArrayUtils";
import { Chart } from "../Chart";
import { Axis, AxisSettings } from "./Axis";
import { Tick } from "../types";

export type AxisRightSettings<T = Record<string, unknown>> = AxisSettings<T & {
  key: string;
  unit?: string;
  width?: number;
  tickCount?: number;
  spacing?: number;
}>;

export class AxisRight<T extends AxisRightSettings = AxisRightSettings> extends Axis<T> {
  benchmark: { point: () => number; value: number | null };
  ticks: Tick[];
  tickCount: number;
  spacing: number;
  
  constructor(chart: Chart, settings: T) {
    super("axis_right", chart, settings);
    this.tickCount = settings.tickCount ?? 5;
    this.spacing = settings.spacing ?? 10;
    this.benchmark = {
      point: () => this.chart.innerBottom - this.spacing,
      value: null,
    };
    
    this.ticks = [];
  }

  get top() {
    return this.chart.padding.top;
  }

  get width() {
    return  this.settings.width ?? 40;
  }

  get left() {
    return this.chart.innerLeft + this.chart.innerWidth;
  }

  get height() {
    return this.chart.height - this.chart.padding.bottom;
  }

  get lowHigh(): number[] {
    return ArrayUtils.lowHigh(
      this.chart.data.values,
      this.chart.settings.type === "kline" ? ["l", "h"] : this.chart.data.key.y
    );
  }

  get grid(): number {
    const diff = this.lowHigh[1] - this.lowHigh[0];

    return diff / this.tickCount;
  }

  get low(): number {
    if (this.chart.settings.type === "bar") {
      return 0;
    }

    return Math.floor(this.lowHigh[0] / this.grid) * this.grid;
  }

  get high(): number {
    return Math.ceil(this.lowHigh[1] / this.grid) * this.grid;
  }

  get tickSize(): number {
    return Math.abs(Math.floor((this.benchmark.point() - this.top - this.spacing * 2) / (this.tickCount - 1)));
  }

  get tickInterval(): number {
    if (this.grid > 1) {
      return Math.ceil((this.high - this.low) / (this.tickCount - 1));
    }

    return (this.high - this.low) / (this.tickCount - 1);
  }
  

  y(value: number): number {
    return Math.min(
      this.benchmark.point() + ((this.benchmark.value! - value) / this.tickInterval) * this.tickSize,
      this.chart.innerBottom - 1,
    );
  }

  draw(): void {
    this.chart.ctx.clearRect(this.left - 1, this.top, this.width + 1, this.height);

    this.chart.ctx.beginPath();
    this.chart.ctx.beginPath();
    this.chart.ctx.strokeStyle = "#2B3139";
    this.chart.ctx.lineWidth = 1;

    this.chart.ctx.moveTo(this.left, this.top);
    this.chart.ctx.lineTo(this.left, this.height - this.chart.axisBottom.height - 1);
    this.chart.ctx.moveTo(this.left, this.height - this.chart.axisBottom.height);
    this.chart.ctx.lineTo(this.left, this.height);

    // if (low !== 0) {
    //   this.chart.ctx.moveTo(this.left, this.chart.axisBottom.top);
    //   this.chart.ctx.lineTo(this.chart.width, this.chart.axisBottom.top);
    // }
    
    this.chart.ctx.stroke();

    if (this.settings.unit) {
      CanvasUtils.text(this.chart.ctx)(
        `(${this.settings.unit})`,
        this.left + this.width / 2,
        this.top + 10,
        this.chart.theme.text
      );
    }

    if (this.chart.settings.type === "bar" || this.low === 0) {
      this.benchmark.point = () =>this.chart.axisBottom.top;
      this.benchmark.value = 0;
    } else {
      this.benchmark.value = this.low;
    }
    
    const ticks: Tick[] = [];

    for (let index = 0; index < this.tickCount; index++) {
      const value = this.grid > 1 
        ? Math.floor(this.benchmark.value + this.tickInterval * index)
        : this.benchmark.value + this.tickInterval * index;

      const tick: Tick = {
        label: CanvasUtils.numeric(value),
        value,
        x: this.left + this.width / 2,
        y: this.y(value),
      };
      
      ticks.push(tick);
      CanvasUtils.text(this.chart.ctx)(tick.label.toString(), tick.x, tick.y, this.chart.theme.text);   
    }
    
    this.ticks = ticks;
  }
}
