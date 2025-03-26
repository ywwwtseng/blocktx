import TelegramBot from "node-telegram-bot-api";

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN is not set");
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

bot.setWebHook("https://blocktx.vercel.app/api/bot");

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendPhoto(chatId, "https://blocktx.vercel.app/photo.jpg", {
    caption: "🚀 Free to join & trade!\n📊 Crypto insights for better decisions!\n💰 Log in daily to restore energy & win TON!",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "START NOW 💎",
            url: "https://t.me/blocktx_bot/start"
          }
        ]
      ]
    }
  });
});

export default bot;
