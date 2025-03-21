import { render } from "./render";
import { dataset } from "./dataset";
import { Dataset } from "../../models/Dataset";
import { Chart } from "../../Chart";

class Bar {
  type: string;
  _settings: { color?: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (chart: Chart, dataset: any, settings: { color?: string }) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataset: (chart: Chart, key: string, transform: { x: (value: number) => number; y: (value: number) => number }) => any;
  Model: typeof Dataset;

  constructor() {
    this._settings = {};
    this.type = "bar";
    this.render = render;
    this.dataset = dataset;
    this.Model = Dataset;
  }

  settings(settings: { color?: string }) {
    const bar = new Bar();
    bar._settings = settings;
    return bar;
  }
}

const bar = new Bar();

export { bar };