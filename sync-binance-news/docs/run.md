# Run

```bash
pm2 start ~/app/sync-binance-news.mjs --cron-restart="*/15 * * * *" --name "sync-binance-news"
```