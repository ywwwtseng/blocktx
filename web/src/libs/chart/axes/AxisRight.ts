import { Chart } from "../Chart";
import { AxisVertical, AxisVerticalSettings } from "./AxisVertical";

export type AxisRightSettings = AxisVerticalSettings<{
  key: string;
}>;

export class AxisRight extends AxisVertical<AxisRightSettings> {
  constructor(chart: Chart, settings: AxisRightSettings) {
    super(
      "axis_right",
      chart,
      {
        top: () => chart.padding.top,
        width: () => settings.width || 40,
        left: () => chart.innerLeft + chart.innerWidth,
        height: () => chart.height - chart.padding.bottom,
      },
      settings
    );
  }
}