import { Chart } from "../Chart";
import { AxisVertical, AxisVerticalSettings } from "./AxisVertical";

export type AxisLeftSettings = AxisVerticalSettings<{
  keys: string[];
}>;

export class AxisLeft extends AxisVertical<AxisLeftSettings> {
  constructor(chart: Chart, settings: AxisLeftSettings) {
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