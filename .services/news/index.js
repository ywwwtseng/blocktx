import puppeteer from "puppeteer";
import fetch from "node-fetch";

async function main() {
  let browser;
  let page;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
      ],
    });

    page = await browser.newPage();
    
    const fetchNews = async (locale) => {
      await page.goto(`https://www.binance.com/${locale}/square/news/all`);
      await page.waitForSelector("h3");
      await new Promise(resolve => setTimeout(resolve, 1000))
      return await page.$$eval("h3", elements => {
        const tradingPairs = [
          "BTC",
          "ETH",
          "SOL",
          "TON",
          "TON",
        ];

        const TimeUnitMsMap = new Map([
          [/^(\d+)\s*(d|D|天)$/, (match) => parseInt(match[1], 10) * 24 * 60 * 60 * 1000],
          [/^(\d+)\s*(h|H|小时)$/, (match) => parseInt(match[1], 10) * 60 * 60 * 1000],
          [/^(\d+)\s*(m|M|分钟)$/, (match) => parseInt(match[1], 10) * 60 * 1000],
          [/^(\d+)\s*(s|S|秒)$/, (match) => parseInt(match[1], 10) * 1000],
        ]);
        
        const ms = (input) => {
          for (const [regex, calc] of TimeUnitMsMap) {
            const match = regex.exec(input);
        
            if (match) {
              return calc(match);
            }
          }
        
          return 0;
        };

        const uniq = (arr) => [...new Set(arr)];

        return elements.map((h3, index) => {
          const a = h3.closest("a");

          if (!a) {
            return null;
          }

          const article = a.parentElement;
          const divs = article?.querySelectorAll("div") || [];
          const info = Array.from(divs)
            .map(div => ({
              divText: div.innerText,
              divHTML: div.outerHTML,
            }));

          const created_at = new Date(Date.now() - ms(info[0].divText) + index * 1000).toISOString();

          const related_trading_pairs = info.find(item => item.divHTML.includes("trading-pairs"))?.divText;

          const title = a?.querySelector("h3")?.innerText;
          const link = a.href;
          const description = a?.querySelector("div")?.innerText;

          return {
            title,
            link,
            description,
            created_at,
            trading_pairs: uniq(tradingPairs.filter(pair => related_trading_pairs?.includes(pair))),
          };
        }).filter(Boolean);
      });
    }

    const assignLocale = (locale) => async (news) => {
      return news.map(item => ({
        ...item,
        locale,
      }));
    };

    const news = [
      ...(await fetchNews("en").then(assignLocale("en"))),
      ...(await fetchNews("zh-CN").then(assignLocale("zh-CN"))),
    ];

    await fetch("https://blocktx.vercel.app/api/news/sync", {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        data: news,
      }),
    });

  } catch (error) {
    console.error(error);
  } finally {
    if (page) {
      await page.close();
    }

    if (browser) {
      await browser.close();
    }
  }
}

main();
