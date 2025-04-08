# Run

```bash
pm2 start ./index.mjs --cron-restart="*/15 * * * *" --name "sync-binance-news"
```