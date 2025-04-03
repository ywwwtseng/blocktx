import { render } from "./render";
import { dataset, DatasetIterator } from "./dataset";
import { Ohlc } from "../../models/Ohlc";
import { Chart } from "../../Chart";

class KLine {
  _settings: { color?: string };
  type: string;
  render: (
    chart: Chart,
    dataset: DatasetIterator,
    settings: { color?: string }
  ) => void;
  dataset: (
    chart: Chart,
    key: string,
    transform: { x: (value: number) => number; y: (value: number) => number }
  ) => DatasetIterator;
  Model: typeof Ohlc;

  constructor() {
    this._settings = {};
    this.type = "kline";
    this.render = render;
    this.dataset = dataset;
    this.Model = Ohlc;
  }

  settings(settings: { color?: string }) {
    const kline = new KLine();
    kline._settings = settings;
    return kline;
  }
}

const kline = new KLine();

export { kline };