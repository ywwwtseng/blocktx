import { ResponseUtils, ErrorInput } from "@/utils/ResponseUtils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.message.text === "/start") {
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id:  body.message.chat.id,
          photo: "https://blocktx.vercel.app/photo.jpg",
          caption: "🚀 Free to join & trade!\n📊 Crypto insights for better decisions!\n💰 Log in daily to restore energy & win TON!",
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "START NOW 💎",
                  url: "https://t.me/blocktx_bot/start"
                }
              ]
            ]
          },
        }),
      });
    }

    return ResponseUtils.json({
      data: "ok",
    });
  } catch (error) {
    console.error(error);
    return ResponseUtils.error(error as ErrorInput);
  }
}