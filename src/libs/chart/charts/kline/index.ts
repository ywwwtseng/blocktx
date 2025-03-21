import { render } from "./render";
import { dataset } from "./dataset";
import { Ohlc } from "../../models/Ohlc";

class KLine {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _settings: any;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataset: any;
  Model: typeof Ohlc;

  constructor() {
    this._settings = {};
    this.type = "kline";
    this.render = render;
    this.dataset = dataset;
    this.Model = Ohlc;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings(settings: any) {
    const kline = new KLine();
    kline._settings = settings;
    return kline;
  }
}

const kline = new KLine();

export { kline };