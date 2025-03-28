import { ResponseUtils, ErrorInput } from "@/utils/ResponseUtils";
// import * as cheerio from "cheerio";
import newsFakeData from "@/app/_assets/news.fake.json";

export async function GET() {
  try {
    return ResponseUtils.json({
      data: newsFakeData.data,
    });

    // const res = await fetch("https://www.theblock.co/latest-crypto-news");
    // const html = await res.text();
    // const $ = cheerio.load(html);

    // const news = $(".articleCard").map((_, el) => {
    //   const image = $(el).find(".articleCard__thumbnail > img").attr("src");
    //   const title = $(el).find(".articleCard__headline > span").text();
    //   const link = `https://www.theblock.co${$(el).find(".articleCard__link").attr("href")}`;
    //   const created_at = `${$(el).find(".meta__wrapper").text().split("EDT")[0]?.replaceAll("\n", '').trim()} GMT-0400`;

    //   return { image, title, link, created_at };
    // }).get();

    // return ResponseUtils.json({
    //   data: news,
    // });
  } catch (error) {
    return ResponseUtils.error(error as ErrorInput);
  }
}