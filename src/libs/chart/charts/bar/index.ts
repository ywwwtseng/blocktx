import { render } from "./render";
import { dataset, DatasetIterator } from "./dataset";
import { Dataset } from "../../models/Dataset";
import { Chart } from "../../Chart";

class Bar {
  type: string;
  _settings: { color?: string };
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