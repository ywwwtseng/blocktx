import * as TimeUtils from "../utils/TimeUtils";
import * as CanvasUtils from "../utils/CanvasUtils";

import { Chart } from "../Chart";
import { Axis, AxisSettings } from "./Axis";

export interface AxisBottomSettings extends AxisSettings {
  height?: number;
  interval: number;
  tickIntervalCount: number;
  label: (date: Date) => string;
}

export class AxisBottom<T extends AxisBottomSettings> extends Axis<T> {
  left: number;
  height: number;
  top: number;
  width: number;
  benchmark: { point: number; value: number | null };
  tickInterval: number;
  tickIntervalCount: number;
  tickSizeUnit: number;
  tickCount: number;
  tickSize: number;
  ticks: { label: string; value: number; x: number; y: number }[];

  constructor(chart: Chart, settings: T) {
    super("axis_bottom", chart, settings);

    this.left = this.chart.innerLeft;
    this.height = settings.height || 20;
    this.top = this.chart.innerBottom;
    this.width = this.chart.innerLeft + this.chart.innerWidth;

    this.benchmark = {
      point: this.chart.innerLeft + this.chart.innerWidth - 20,
      value: null,
    };

    this.tickInterval = settings.interval || TimeUtils.ms("15m");
    this.tickIntervalCount = settings.tickIntervalCount;
    this.tickSizeUnit = 6;
    this.tickCount = Math.ceil(this.chart.innerWidth / (this.tickIntervalCount * this.tickSizeUnit));
    this.tickSize = this.tickIntervalCount * this.tickSizeUnit;

    this.ticks = [];
  }

  x(value: number): number {
    return this.benchmark.point + ((value - (this.benchmark.value ?? 0)) / this.tickInterval) * this.tickSize;
  }

  value(x: number): number {
    return Math.floor(((x - this.benchmark.point) / this.tickSize) * this.tickInterval + (this.benchmark.value ?? 0));
  }

  draw(data: { oldest?: { [key: string]: number }; latest?: { [key: string]: number } }): void {
    this.chart.ctx.clearRect(this.left, this.top, this.width, this.height);

    let oldest = data.oldest?.[this.key];
    let latest = data.latest?.[this.key];

    if (!oldest || !latest) {
      const now = Date.now();

      if (!oldest) {
        oldest = now;
      }

      if (!latest) {
        latest = now;
      }
    }

    const range = {
      start: TimeUtils.slot(oldest, this.tickInterval).start,
      end: TimeUtils.slot(latest, this.tickInterval).end
    };

    const values: number[] = [range.end];

    while (values[0] - this.tickInterval >= range.start && values.length <= this.tickCount) {
      values.unshift(values[0] - this.tickInterval);
    }

    while (values.length <= this.tickCount) {
      values.push(values[values.length - 1] + this.tickInterval);
    }

    this.benchmark.value = values[values.length - 2];

    if (this.x(latest) > this.benchmark.point) {
      this.benchmark.value = latest;
    }

    this.chart.ctx.beginPath();
    this.chart.ctx.strokeStyle = "#2B3139";
    this.chart.ctx.lineWidth = 1;
    this.chart.ctx.moveTo(this.left, this.top);
    this.chart.ctx.lineTo(this.width, this.top);
    this.chart.ctx.stroke();

    this.ticks = values.map((value) => {
      const date = new Date(value);
      return {
        label: this.settings.label(date),
        value: date.getTime(),
        x: this.x(value),
        y: this.top + this.height / 2,
      };
    });

    this.ticks.forEach((tick) => {
      CanvasUtils.text(this.chart.ctx)(tick.label, tick.x, tick.y, this.chart.theme.text);
    });
  }
}

