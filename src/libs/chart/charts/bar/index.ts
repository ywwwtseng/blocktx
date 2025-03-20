import { render } from "./render";
import { dataset } from "./dataset";
import { Dataset } from "../../models/Dataset";

class Bar {
  _settings: any;
  type: string;
  render: any;
  dataset: any;
  Model: typeof Dataset;

  constructor() {
    this._settings = {};
    this.type = "bar";
    this.render = render;
    this.dataset = dataset;
    this.Model = Dataset;
  }

  settings(settings: any) {
    const bar = new Bar();
    bar._settings = settings;
    return bar;
  }
}

const bar = new Bar();

export { bar };