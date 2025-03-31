import TelegramBot from "node-telegram-bot-api";

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN is not set");
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

bot.setWebHook("https://blocktx.vercel.app/api/bot");
