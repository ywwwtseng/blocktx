import { Kine } from "./types";

export const analyze = (kines: Kine[]) => {
  const nearly6Kines = kines.slice(-6);
  const lastKine = nearly6Kines[nearly6Kines.length - 1];

  let type: "continuous-drop" | "continuous-raise" | "none" = "none";
  let message: string | null = null;

  if (nearly6Kines.filter((kine) => kine.change_percentage < 0).length >= 5) {
    type = "continuous-drop";
    message = `${lastKine.symbol} Continuous Drop`;
  } else if (nearly6Kines.filter((kine) => kine.change_percentage > 0).length >= 5) {
    type = "continuous-raise";
    message = `${lastKine.symbol} Continuous Raise`;
  }

  return {
    symbol: lastKine.symbol,
    type,
    message,
    close_time: lastKine.close_time,
    price: lastKine.price,
  }
}
