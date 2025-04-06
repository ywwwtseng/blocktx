export class CanvasUtils {
  static text(ctx: CanvasRenderingContext2D) {
    return (text: string, x: number, y: number, fillStyle: string = "#B7BDC6") => {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "11px Arial";
      ctx.fillStyle = fillStyle;
      ctx.fillText(text, x, y);
    };
  }

  static adjust(value: number) {
    return Math.sign(value) * Math.max(Math.abs(value), 1);
  }
}
