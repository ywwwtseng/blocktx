import { AxisBottom, AxisBottomSettings } from "./axes/AxisBottom";
import { AxisRight, AxisRightSettings } from "./axes/AxisRight";
import { AxisLeft, AxisLeftSettings } from "./axes/AxisLeft";
import { Grid } from "./Grid";
import { Data } from "./Data";
import { render, ChartType } from "./charts";


interface ChartSettings {
  type: ChartType;
  width: number;
  height: number;
  axisRight: AxisRightSettings;
  axisBottom: AxisBottomSettings;
  axisLeft?: AxisLeftSettings;
  padding?: Partial<{ top: number; bottom: number; left: number; right: number; }>;
  theme?: { text?: string };
  config?: Array<{ type: ChartType; key: string; }>;
}

export class Chart {
  ctx: CanvasRenderingContext2D;
  settings: ChartSettings;
  axisRight: AxisRight;
  axisBottom: AxisBottom;
  axisLeft?: AxisLeft;
  data: Data;
  grid: Grid;
  drawEnd: boolean;

  constructor(ctx: CanvasRenderingContext2D, settings: ChartSettings) {
    this.ctx = ctx;
    this.settings = settings;
    this.drawEnd = false;

    if (!this.settings.config && this.settings.type) {
      this.settings.config = [
        {
          type: this.settings.type,
          key: this.settings.axisRight?.key,
        },
      ];
    }

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

    if (this.settings.axisLeft) {
      this.axisLeft = new AxisLeft(this, this.settings.axisLeft);
    }

    this.grid = new Grid(this);
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

  size(width: number, height: number) {
    this.ctx.canvas.style.width = `${width}px`;
    this.ctx.canvas.style.height = `${height}px`;
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;
  }

  onDrawEnd() {}

  draw() {
    if (this.data.values.length === 0) {
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

    this.axisBottom.draw(this.data);
    this.axisRight.draw(this.data.values);
    if (this.settings.axisLeft) {
      this.axisLeft!.draw(this.data.values);
    }

    this.grid.draw(this.axisBottom, this.axisRight);

    this.settings.config!.forEach(({ type, key }) => {
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
        render(type, this, key, transform);
      }
    });

    if (!this.drawEnd) {
      this.drawEnd = true;
      this.onDrawEnd();
    }
  }
}
