# Run

```bash
cd app/trade-ai-agent
pm2 start ./index.js --interpreter bun --cron-restart="*/13 * * * *" --name "trade-ai-agent"
```