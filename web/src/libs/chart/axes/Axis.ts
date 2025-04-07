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
}
