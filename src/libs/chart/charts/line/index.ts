import { render } from "./render";
import { dataset } from "./dataset";
import { Dataset } from "../../models/Dataset";

class Line {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _settings: any;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataset: any;
  Model: typeof Dataset;

  constructor() {
    this._settings = {};
    this.type = "line";
    this.render = render;
    this.dataset = dataset;
    this.Model = Dataset;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings(settings: any) {
    const bar = new Line();
    bar._settings = settings;
    return bar;
  }
}

const line = new Line();

export { line };