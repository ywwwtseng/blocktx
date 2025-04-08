import "dotenv/config";
import postgres from "postgres";
import * as services from "./services.js";
import { bot_send_photo } from "telegram-bot";

if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.POSTGRES_URL) {
  throw new Error("TELEGRAM_BOT_TOKEN or POSTGRES_URL is not set");
}

async function main() {
  const sql = postgres(process.env.POSTGRES_URL, { ssl: "verify-full" });
  const news = await services.news();

  const links = news.map((article) => article.link);
  const titles = news.map((article) => article.title);

  const exists = await sql`
    SELECT *
    FROM "Article"
    WHERE (
        "link" IN ${ sql(links) }
        OR "title" IN ${ sql(titles) }
    )
    AND "created_at" >= NOW() - INTERVAL '1 day';
  `;

  const notExists = news
    .filter(
      (article) => !exists.some((e) => e.link === article.link || e.title === article.title)
    );

  const data = [
    ...notExists
      .filter((article) => article.locale === "en")
      .reverse()
      .map((article) => ({
      // .map((article: RawArticle, index: number) => ({
        ...article,
        id: article.link,
        description: article.description.slice(0, 4096),
        image: `https://blocktx.vercel.app/binance-0.webp`,
        // image: `https://blocktx.vercel.app/crypto-${(startImageIndexEn + index) % 20}.webp`,
        created_at: new Date(article.created_at),
        updated_at: new Date(article.created_at),
        ...(article.trading_pairs.length > 0 ? { trading_pairs: article.trading_pairs } : {}),
      })),
    ...notExists
      .filter((article) => article.locale === "zh-CN")
      .reverse()
      .map((article) => ({
      // .map((article: RawArticle, index: number) => ({
        ...article,
        id: article.link,
        description: article.description.slice(0, 4096),
        image: `https://blocktx.vercel.app/binance-0.webp`,
        // image: `https://blocktx.vercel.app/crypto-${(startImageIndexZh + index) % 20}.webp`,
        created_at: new Date(article.created_at),
        updated_at: new Date(article.created_at),
        ...(article.trading_pairs.length > 0 ? { trading_pairs: article.trading_pairs } : {}),
      })),
  ];

  if (data.length > 0) {
    await sql`
      INSERT INTO "Article" ${sql(data)}
    `;

    for (const article of data) {
      if (new Date(article.created_at) > new Date(Date.now() - 1000 * 60 * 15)) {
        const relatedTradingPairs = article.trading_pairs.length > 0 ? `【${article.trading_pairs.join(", ")}】` : "";
        const description = article.description.length > 200 ? `${article.description.slice(0, 200)}...` : article.description;

        await bot_send_photo({
          token: process.env.TELEGRAM_BOT_TOKEN,
          chat_id: "5699547696",
          message: `${relatedTradingPairs}${article.title}\n\n${description}`,
          photo_url: article.image,
          link: article.link,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: article.locale === "zh-CN" ? "阅读更多" : "Read More",
                  url: article.link,
                },
              ]
            ],
          },
        });
      }
    }
  }

  sql.end();
}

main();
