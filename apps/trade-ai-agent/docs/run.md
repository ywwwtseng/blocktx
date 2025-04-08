# Run

```bash
pm2 start ~/app/trade-ai-agent/index.js --interpreter bun --cron-restart="*/13 * * * *" --name "trade-ai-agent"
```