import { CanvasUtils} from "../utils/CanvasUtils";
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
  tickInterval!: number;
  tickCount: number;
  spacing: number;
  
  constructor(chart: Chart, settings: T) {
    super("axis_right", chart, settings);
    this.tickCount = settings.tickCount ?? 4;
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

  get tickSize(): number {
    return Math.abs(Math.floor((this.benchmark.point() - this.top - this.spacing * 2) / this.tickCount));
  }

  y(value: number): number {
    return Math.min(
      this.benchmark.point() + ((this.benchmark.value! - value) / this.tickInterval) * this.tickSize,
      this.chart.innerBottom - 1,
    );
  }

  draw(): void {
    this.chart.ctx.clearRect(this.left - 1, this.top, this.width + 1, this.height);

    const lowHigh = ArrayUtils.lowHigh(
      this.chart.data.values,
      this.chart.settings.type === "kline" ? ["l", "h"] : this.chart.data.key.y
    );

    const grid = 20;

    const low = Math.floor(lowHigh[0] / grid) * grid;
    const high = Math.ceil(lowHigh[1] / grid) * grid;

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

    if (this.chart.settings.type === "bar" || low === 0) {
      this.benchmark.point = () =>this.chart.axisBottom.top;
      this.benchmark.value = 0;
    } else {
      this.benchmark.value = low;
    }

    this.tickInterval = Math.ceil((high - low) / this.tickCount);
    
    const ticks: Tick[] = [];

    for (let index = 0; index <= this.tickCount; index++) {
      const value = low + this.tickInterval * index;
      const tick: Tick = {
        label: value,
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
