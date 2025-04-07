type RawData = (number | string)[];
type Kine = {
  open_time: number;
  close_time: number;
  change_percentage: number;
  volume: number;
}

async function main() {
  const fetchKines = async (
    symbol: "BTCUSDT",
    interval: "1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "1d",
    limit = 1000
  ) => {
    const response = await fetch(
      `https://www.binance.com/api/v3/uiKlines?symbol=${symbol}&interval=${interval}&limit=${limit}`
    );

    const data = await response.json();

    return data.map((kine: RawData) => {
      const [openTime, open, high, low, close, volume, closeTime, quoteVolume, trades, takerBuyBaseVolume, takerBuyQuoteVolume, ignore] = kine;
      return {
        open_time: openTime,
        close_time: closeTime,
        change_percentage: Number(((Number(close) - Number(open)) / Number(close)).toFixed(4)) * 100,
        volume: Number(volume),
      };
    });
  };
  
  // AI Agent - Perception/Observer
  const kines = await fetchKines("BTCUSDT", "4h", 12);
  const lastKline = kines[kines.length - 1];
  const nearly6Kines = kines.slice(-6);

  const lastKlineOpenTime = lastKline.open_time;

  if (nearly6Kines.filter((kine: Kine) => kine.change_percentage < 0).length >= 5) {
    // BTCUSDT Continuously Dropped in the Past 24 Hours
    // BTCUSDT 在过去的 24 小时内连续下跌

    await fetch("https://blocktx.vercel.app/api/alert/sync", { 
      method: "POST",
      body: JSON.stringify({
        data: {
          id: lastKlineOpenTime,
          type: "continuous-drop",
          created_at: new Date().toISOString(),
          trading_pairs: ["BTCUSDT"],
        },
      }),
    });
  } else if (nearly6Kines.filter((kine: Kine) => kine.change_percentage > 0).length >= 5) {
    // BTCUSDT Continuously Raised in the Past 24 Hours
    // BTCUSDT 在过去的 24 小时内连续上涨

    await fetch("https://blocktx.vercel.app/api/alert/sync", { 
      method: "POST",
      body: JSON.stringify({
        data: {
          id: lastKlineOpenTime,
          type: "continuous-raise",
          created_at: new Date().toISOString(),
          trading_pairs: ["BTCUSDT"],
        },
      }),
    });
  }
  // // // FnG < 35, 6%, 3%
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

  // // lose 80%
  // console.log("50x contract: usd 20");
  // // lose 130%
  // console.log("100x contract: usd 30");
  // // lose 200%
  // console.log("100x contract: usd 40");
}

main();
