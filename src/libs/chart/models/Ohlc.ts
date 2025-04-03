import { TimeUtils } from "../utils/TimeUtils";
import { Chart } from "../Chart";


export class Ohlc {
  chart: Chart;
  onChange: (data: { [key: string]: number | string }[]) => void;
  _data: Map<number, { [key: string]: number | string }>;

  constructor(chart: Chart, { onChange = () => {}}: { onChange: (data: { [key: string]: number | string }[]) => void }) {
    this.chart = chart;

    this.onChange = onChange;
    this._data = new Map();
  }

  get tickIntervalUnit() {
    return this.chart.axisBottom.tickInterval / this.chart.axisBottom.tickIntervalCount;
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

  add(data: { [key: string]: number | string }[]) {
    data = Array.isArray(data) ? data : [data];

    for (let index = 0; index < data.length; index++) {
      this.format(data[index]);
    }

    this.onChange(this.data);
  }

  format(item: { [key: string]: number | string }) {
    const keyX = this.key.x;
    const keyY = this.key.y;
    
    const { time, start, end } = TimeUtils.slot(item[keyX] as number, this.tickIntervalUnit);
    let ohlc = this._data.get(time);

    if (!ohlc) {
      const open = this.latest ? this.latest.close : item[keyY];
      ohlc = {
        _time: time,
        start,
        end,
        open,
        close: open,
        low: open,
        high: open,
      };
    } else {
      if (item[keyY] < ohlc.low) {
        ohlc.low = item[keyY];
      } else if (item[keyY] > ohlc.high) {
        ohlc.high = item[keyY];
      }

      ohlc.close = item[keyY];
    }

    this._data.set(ohlc._time as number, ohlc);
  }

  get oldest() {
    return this.data[0];
  }

  get latest() {
    return this.data[this.data.length - 1];
  }

  get helpers() {
    return {
      lowHigh(data: { [key: string]: number | string }[]) {
        return data.reduce((acc: number[], item: { [key: string]: number | string }) => {
          if (acc[0] === undefined || item.low as number < acc[0]) {
            acc[0] = item.low as number;
          }
      
          if (acc[1] === undefined || item.high as number > acc[1]) {
            acc[1] = item.high as number;
          }
          return acc;
        }, []);
      },
    }
  }
}
