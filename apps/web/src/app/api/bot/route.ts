import { ResponseUtils, TError } from "@/utils/ResponseUtils";
import { locales } from "@/i18n";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (body.message.text === "/start") {
      const languagecode = body.message.from.language_code?.toLowerCase()?.slice(0, 2) || "en";
      const locale = locales[languagecode] || locales.en;

      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id:  body.message.chat.id,
          photo: "https://blocktx.vercel.app/photo.png",
          caption: locale.messages.share_text.replace("#ShareLink\n", ""),
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: locale.common.start_now,
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
    return ResponseUtils.error(error as TError);
  }
}