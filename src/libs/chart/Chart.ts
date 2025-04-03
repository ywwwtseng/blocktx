import { ArrayUtils } from "./utils/ArrayUtils";
import { AxisBottom, AxisBottomSettings } from "./axes/AxisBottom";
import { AxisRight, AxisRightSettings } from "./axes/AxisRight";
import { AxisLeft, AxisLeftSettings } from "./axes/AxisLeft";
import { Grid } from "./Grid";
import { Dataset } from "./models/Dataset";
import { Ohlc } from "./models/Ohlc";
import { line } from "./charts/line";
import { bar } from "./charts/bar";
import { kline } from "./charts/kline";
import { DatasetIterator as LineDatasetIterator } from "./charts/line/dataset";
import { DatasetIterator as BarDatasetIterator } from "./charts/bar/dataset";
import { DatasetIterator as KlineDatasetIterator } from "./charts/kline/dataset";

type ChartType = typeof line | typeof bar | typeof kline;

interface ChartSettings {
  type: ChartType;
  axisRight: AxisRightSettings;
  axisLeft?: AxisLeftSettings;
  axisBottom: AxisBottomSettings;
  padding?: Partial<{ top: number; bottom: number; left: number; right: number; }>;
  theme?: { text?: string };
  config?: Array<{ type: ChartType; key: string; }>;
}

export class Chart {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  settings: ChartSettings;
  axisRight: AxisRight<AxisRightSettings>;
  axisBottom: AxisBottom<AxisBottomSettings>;
  axisLeft?: AxisLeft<AxisLeftSettings>;
  model: Dataset | Ohlc;
  grid: Grid;

  constructor(ctx: CanvasRenderingContext2D, settings: ChartSettings) {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.settings = settings;

    if (!this.settings.config && this.settings.type) {
      this.settings.config = [
        {
          type: this.settings.type,
          key: this.settings.axisRight?.key,
        },
      ];
    }

    this.axisBottom = new AxisBottom(this, this.settings.axisBottom);

    this.model = new this.settings.config![0].type.Model(this, {
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
    return this.height - this.padding.top - this.padding.bottom - (this.settings.axisBottom?.height ?? 20);
  }

  get innerBottom() {
    return this.innerTop + this.innerHeight;
  }

  get innerWidth() {
    return this.width - this.innerLeft - this.padding.right - (this.settings.axisRight?.width ?? 40);
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

  draw() {
    this.axisBottom.draw(this.model);
    this.axisRight.draw(this.data);
    this.grid.draw(this.axisBottom, this.axisRight);

    this.settings.config!.forEach(({ type, key }) => {
      const { render, dataset } = type;

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
          dataset(this, key, transform) as LineDatasetIterator & BarDatasetIterator & KlineDatasetIterator,
          type._settings
        );
      }
    });

    if (this.settings.axisLeft) {
      this.axisLeft!.draw(this.data);
    }

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
}
