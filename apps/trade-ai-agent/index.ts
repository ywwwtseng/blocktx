import { env } from "bun";
import { sendPhoto } from "@libs/telegram-bot";
import * as services from "./services";
import * as models from "./models";
import * as utils from "./utils";

if (!env.POSTGRES_URL || !env.TELEGRAM_BOT_TOKEN) {
  throw new Error("POSTGRES_URL or TELEGRAM_BOT_TOKEN is not set");
}

async function main() {
  const kines4h = await services.kines("BTCUSDT", "4h", 12);

  const analysis4h = utils.analyze(kines4h);

  if (analysis4h.type === "none") {
    return;
  }

  const kines1h = await services.kines("BTCUSDT", "1h", 12);

  const analysis1h = utils.analyze(kines1h);

  if (analysis1h.type === "none") {
    return;
  }

  const fng = await services.fng();

  try {
    const event = await models.event.create({
      id: `klines-analysis-${analysis1h.symbol.toLowerCase()}-${analysis1h.close_time}`,
      type: analysis1h.type,
      trading_pair: analysis1h.symbol,
      fng,
      details: {
        data: kines1h,
      },
    });

    if (analysis1h.message) {
      await sendPhoto({
        token: env.TELEGRAM_BOT_TOKEN!,
        chat_id: "5699547696",
        photo_url: "https://blocktx.vercel.app/photo.png",
        message: `💥 Event\n${analysis1h.message}\n\nPrice: ${analysis1h.price}\nFnG: ${fng}`,
      });
    }

    console.log(event);
  } catch {
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
