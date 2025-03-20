import * as ArrayUtils from "../../../utils/ArrayUtils";
import { AxisBottom, AxisBottomSettings } from "../axes/AxisBottom";
import { AxisRight, AxisRightSettings } from "../axes/AxisRight";
import { AxisLeft, AxisLeftSettings } from "../axes/AxisLeft";
import { Grid } from "../Grid";
import { Dataset } from "../models/Dataset";
import { Ohlc } from "../models/Ohlc";


interface ChartSettings {
  chart?: { Model: any; render: any; dataset: any; key: string; _settings: any; };
  axisRight: AxisRightSettings;
  axisLeft?: AxisLeftSettings;
  axisBottom: AxisBottomSettings;
  padding?: Partial<{ top: number; bottom: number; left: number; right: number; }>;
  theme?: { text?: string };
  config: Array<{ chart: { Model: any; render: any; dataset: any; _settings: any; }; key: string; }>;
}

export class Chart {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  settings: ChartSettings;
  axisRight: AxisRight<AxisRightSettings>;
  axisLeft?: AxisLeft<AxisLeftSettings>;
  axisBottom: AxisBottom<AxisBottomSettings>;
  model: Dataset | Ohlc;
  grid: Grid;

  constructor(ctx: CanvasRenderingContext2D, settings: ChartSettings) {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.settings = settings;

    if (!this.settings.config && this.settings.chart) {
      this.settings.config = [
        {
          chart: this.settings.chart,
          key: this.settings.axisRight?.key,
        },
      ];
    }

    this.axisBottom = new AxisBottom(this, this.settings.axisBottom);

    this.model = new this.settings.config[0].chart.Model(this, {
      onChange: this.draw.bind(this),
    });

    this.axisRight = new AxisRight(this, this.settings.axisRight);

    if (this.settings.axisLeft) {
      this.axisLeft = new AxisLeft(this, this.settings.axisLeft);
    }

    this.grid = new Grid(this);
  }

  get padding() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      ...this.settings.padding,
    };
  }

  get innerTop() {
    return this.padding.top;
  }

  get innerLeft() {
    return this.settings.axisLeft ? this.settings.axisLeft.width! + this.padding.left : this.padding.left;
  }

  get innerHeight() {
    return this.height - this.padding.top - this.padding.bottom - (this.settings.axisBottom?.height ?? 0);
  }

  get innerBottom() {
    return this.innerTop + this.innerHeight;
  }

  get innerWidth() {
    return this.width - this.innerLeft - this.padding.right - (this.settings.axisRight?.width ?? 0);
  }

  get theme() {
    return {
      text: "#B7BDC6",
      ...this.settings.theme,
    };
  }

  get data() {
    const startIndex = ArrayUtils.binarySearch(this.model.data, this.axisBottom.value(this.innerLeft - 10), this.settings.axisBottom.key);
    return this.model.data.slice(startIndex);
  }


  clear() {
    if (this.padding.top) {
      this.ctx.clearRect(0, 0, this.width, this.padding.top);
    }

    if (this.padding.left) {
      this.ctx.clearRect(0, 0, this.padding.left, this.height);
    }

    if (this.padding.right) {
      this.ctx.clearRect(this.width - this.padding.right, 0, this.padding.right, this.height);
    }
  }

  draw() {
    
    this.axisBottom.draw(this.model);
    this.grid.draw(this.axisBottom, this.axisRight);

    this.settings.config.forEach(({ chart, key }) => {
      const { render, dataset } = chart;

      let transform;

      if (this.axisRight.settings.key === key) {
        transform = {
          x: this.axisBottom.x.bind(this.axisBottom),
          y: this.axisRight.y.bind(this.axisRight),
        };
      } else if (this.axisLeft?.settings.keys.includes(key)) {
        transform = {
          x: this.axisBottom.x.bind(this.axisBottom),
          y: this.axisLeft.y.bind(this.axisLeft),
        };
      }

      if (transform) {
        render(
          this,
          dataset(this, key, transform),
          chart._settings
        );
      }
    });

    this.axisRight.draw(this.data);

    if (this.settings.axisLeft) {
      this.axisLeft!.draw(this.data);
    }

    this.clear();
  }
}
