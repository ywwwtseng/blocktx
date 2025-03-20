import { Chart } from "../charts/Chart";
import { AxisVertical, AxisVerticalSettings } from "./AxisVertical";

export interface AxisLeftSettings extends AxisVerticalSettings {
  keys: string[];
}

export class AxisLeft<T extends AxisLeftSettings> extends AxisVertical<T> {
  constructor(chart: Chart, settings: T) {
    super(
      "axis_left",
      chart,
      {
        top: chart.padding.top,
        width: settings.width || 50,
        left: chart.padding.left,
        height: chart.height - chart.padding.bottom,
      },
      settings
    );
  }
}