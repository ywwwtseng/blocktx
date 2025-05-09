import { Chart } from "../Chart";

export type Range = [number | "auto", number | "auto"];

export type AxisSettings<T = Record<string, unknown>> = T & {
  key: string;
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
}
