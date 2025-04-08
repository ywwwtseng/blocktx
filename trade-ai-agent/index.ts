import { env } from "bun";
import * as service from "./services";
import * as models from "./models";
import * as utils from "./utils";

if (!env.POSTGRES_URL || !env.TELEGRAM_BOT_TOKEN) {
  throw new Error("POSTGRES_URL or TELEGRAM_BOT_TOKEN is not set");
}

async function main() {
  // AI Agent - Perception/Observer
  const [kines, fng] = await Promise.all([
    service.kines("BTCUSDT", "4h", 12),
    service.fng()
  ]);

  const analysis = utils.analyze(kines);

  if (analysis.type !== "none") {
    try {
      const event = await models.event.create({
        id: `klines-analysis-${analysis.symbol.toLowerCase()}-${analysis.close_time}`,
        type: analysis.type,
        trading_pair: analysis.symbol,
        fng,
        details: {
          data: kines,
        },
      });

      if (analysis.message) {
        await service.bot_send({
          message: `💥 Event\n${analysis.message}\n\nPrice: ${analysis.price}\nFnG: ${fng}`,
        });
      }

      console.log(event);
    } catch {
    }
  }

  // if (
  //   // last kine change_percentage < -2
  //   lastKine.change_percentage < -2
  //   // nearly 6 times have 4 times change_percentage < 0
  //   && nearly6Kines.filter((kine: Kine) => kine.change_percentage < 0).length >= 4
  // ) {
  //   console.log("Drop detected");
  // }

  // if (
  //   lastCloseLine.change_percentage < 0
  //   && lastCloseLine2.change_percentage < lastCloseLine.change_percentage
  //   && (lastKine.volume > 10000 || lastKine.volume > lastCloseLine.volume)
  // ) {
  //   console.log("find fisrt raise kline, or end, 20x contract: usd 100");
  // }

  // // FnG < 35, 6%, 3%
  // // lose 80%
  // console.log("50x contract: usd 20");
  // // lose 130%
  // console.log("100x contract: usd 30");
  // // lose 200%
  // console.log("100x contract: usd 40");
}

main();
