import { Chart } from "../Chart";

export type Range = [number | "auto", number | "auto"];

export type AxisSettings<T = Record<string, unknown>> = T & {
  key: string;
  range?: Range;
};

export class Axis<T extends AxisSettings = AxisSettings> {
  type: string;
  chart: Chart;
  settings: T;

  constructor(type: string, chart: Chart, settings: T) {
    this.type = type;
    this.chart = chart;
    this.settings = settings;
  }

  get key(): string {
    return this.settings.key;
  }

  get range(): Range {
    return this.settings.range || ["auto", "auto"];
  }

  low(value: number): number {
    if (typeof this.range[0] === "number") {
      return this.range[0];
    }

    return value;
  }

  high(value: number): number {
    if (typeof this.range[1] === "number") {
      return this.range[1];
    }

    return value;
  }
}
