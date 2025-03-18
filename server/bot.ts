import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendPhoto(chatId, "[img_url]", {
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
