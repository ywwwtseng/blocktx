import { render } from "./render";
import { dataset } from "./dataset";
import { Dataset } from "../../models/Dataset";

class Line {
  _settings: any;
  type: string;
  render: any;
  dataset: any;
  Model: typeof Dataset;

  constructor() {
    this._settings = {};
    this.type = "line";
    this.render = render;
    this.dataset = dataset;
    this.Model = Dataset;
  }

  settings(settings: any) {
    const bar = new Line();
    bar._settings = settings;
    return bar;
  }
}

const line = new Line();

export { line };