import { AxisBottom, AxisBottomSettings } from "./axes/AxisBottom";
import { AxisRight, AxisRightSettings } from "./axes/AxisRight";
import { Grid } from "./Grid";
import { Data } from "./Data";
import { render, ChartType } from "./charts";
import { RawData } from "./types";


interface ChartSettings {
  type: ChartType;
  width: number;
  height: number;
  axisRight: AxisRightSettings;
  axisBottom: AxisBottomSettings;
  color?: (item: RawData) => string;
  padding?: Partial<{ top: number; bottom: number; left: number; right: number; }>;
  theme?: { text?: string };
}

export class Chart {
  ctx: CanvasRenderingContext2D;
  settings: ChartSettings;
  axisRight: AxisRight;
  axisBottom: AxisBottom;
  data: Data;
  grid: Grid;
  drawEnd: boolean;
  inited: boolean;

  constructor(ctx: CanvasRenderingContext2D, settings: ChartSettings) {
    this.ctx = ctx;
    // this.ctx.imageSmoothingEnabled = true;
    this.settings = settings;
    this.drawEnd = false;

    this.size(
      this.settings.width,
      this.settings.height,
    );

    this.draw = this.draw.bind(this);

    this.data = new Data(this, {
      onChange: this.draw,
    });

    this.axisBottom = new AxisBottom(this, this.settings.axisBottom);
    this.axisRight = new AxisRight(this, this.settings.axisRight);
    this.grid = new Grid(this);

    this.inited = false;
  }

  get width() {
    return this.ctx.canvas.width;
  }

  get height() {
    return this.ctx.canvas.height;
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
    return this.padding.left;
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

  size(width: number, height: number) {
    this.ctx.canvas.style.width = `${width}px`;
    this.ctx.canvas.style.height = `${height}px`;
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;
  }

  onDrawEnd() {}

  init() {
    this.axisBottom.draw();
    this.axisRight.draw();
    this.grid.draw(this.axisBottom, this.axisRight);
  }

  draw() {
    const data = this.data.values;
    if (data.length === 0) {
      return;
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

    this.init();

    if (this.inited) {
      render(this.settings.type, this, this.settings.axisRight.key, data, {
        x: this.axisBottom.x.bind(this.axisBottom),
        y: this.axisRight.y.bind(this.axisRight),
      });

      if (!this.drawEnd) {
        this.drawEnd = true;
        this.onDrawEnd();
      }
    }

    this.inited = true;
  }
}
