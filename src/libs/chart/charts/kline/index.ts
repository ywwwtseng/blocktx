import { render } from "./render";
import { dataset } from "./dataset";
import { Ohlc } from "../../models/Ohlc";

class KLine {
  _settings: any;
  type: string;
  render: any;
  dataset: any;
  Model: typeof Ohlc;

  constructor() {
    this._settings = {};
    this.type = "kline";
    this.render = render;
    this.dataset = dataset;
    this.Model = Ohlc;
  }

  settings(settings: any) {
    const kline = new KLine();
    kline._settings = settings;
    return kline;
  }
}

const kline = new KLine();

export { kline };