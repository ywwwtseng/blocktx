import { Chart } from "../Chart";
import { AxisVertical, AxisVerticalSettings } from "./AxisVertical";

export interface AxisRightSettings extends AxisVerticalSettings {
  key: string;
}

export class AxisRight<T extends AxisRightSettings> extends AxisVertical<T> {
  constructor(chart: Chart, settings: T) {
    super(
      "axis_right",
      chart,
      {
        top: chart.padding.top,
        width: settings.width || 40,
        left: chart.innerLeft + chart.innerWidth,
        height: chart.height - chart.padding.bottom,
      },
      settings
    );
  }
}