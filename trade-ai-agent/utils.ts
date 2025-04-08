import { Kine } from "./types";

export const analyze = (kines: Kine[]) => {
  const nearly6Kines = kines.slice(-6);
  const lastKine = nearly6Kines[nearly6Kines.length - 1];

  let type: "continuous-drop" | "continuous-raise" | "none" = "none";

  if (nearly6Kines.filter((kine) => kine.change_percentage < 0).length >= 5) {
    type = "continuous-drop";
  } else if (nearly6Kines.filter((kine) => kine.change_percentage > 0).length >= 5) {
    type = "continuous-raise";
  }

  return {
    symbol: lastKine.symbol,
    type: "continuous-raise",
    close_time: lastKine.close_time,
  }
}
