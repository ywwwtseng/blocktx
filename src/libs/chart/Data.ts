
import { Chart } from "./Chart";
import { ArrayUtils } from "./utils/ArrayUtils";
import { RawData } from "./types";

export class Data {
  chart: Chart;
  onChange: (data: RawData[]) => void;
  _data: Map<string, RawData>;

  constructor(chart: Chart, { onChange = () => {} }: { onChange: (data: RawData[]) => void }) {
    this.chart = chart;
    this.onChange = onChange;
    this._data = new Map();
  }

  get key() {
    return {
      x: this.chart.axisBottom.key,
      y: this.chart.axisRight.key,
    };
  }

  get data() {
    return [...this._data.values()];
  }

  add(data: RawData[]) {
    data = Array.isArray(data) ? data : [data];

    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      this._data.set(item[this.key.x] as string, item);
    }

    this.onChange(this.data);
  }

  get oldest() {
    return this.data[0];
  }

  get latest() {
    return this.data[this.data.length - 1];
  }

  get helpers() {
    const keyY = this.key.y;

    return {
      lowHigh(data: RawData[]) {
        return data.reduce((acc: number[], item: RawData) => {
          if (acc[0] === undefined || item[keyY] as number < acc[0]) {
            acc[0] = item[keyY] as number;
          }
          if (acc[1] === undefined || item[keyY] as number > acc[1]) {
            acc[1] = item[keyY] as number;
          }
          return acc;
        }, []);
      },
    }
  }

  get values() {
    const startIndex = ArrayUtils.binarySearch(
      this.data,
      this.chart.axisBottom.value(this.chart.innerLeft - 10),
      this.chart.settings.axisBottom.key
    );
    return this.data.slice(startIndex);
  }
}