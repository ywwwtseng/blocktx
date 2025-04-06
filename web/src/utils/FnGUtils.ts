export class FnGUtils {
  static color(value: number | string | undefined) {
    if (!value) {
      return "var(--text-primary)";
    }

    if (typeof value === "string") {
      value = Number(value);
    }

    if (value > 50) {
      return "var(--text-buy)";
    } else if (value < 50) {
      return "var(--text-sell)";
    } else {
      return "var(--text-primary)";
    }
  }

  static today(data: { date: string, value: number }[]) {
    const today = new Date();
    return data.find((item) => item.date === today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }));
  }
}
