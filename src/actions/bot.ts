import { ControlFlowUtils } from "@/utils/ControlFlowUtils";
import { locales } from "@/i18n";

const MAX_MESSAGES_PER_MINUTE = 24;
const DELAY_BETWEEN_MESSAGES_MS = (60 * 1000) / MAX_MESSAGES_PER_MINUTE;

export async function send_message({
  chat_id,
  message,
  photo_url,
  lang_code,
  link,
}: {
  chat_id: string;
  message: string;
  photo_url: string;
  lang_code: "en" | "zh";
  link?: string;
}) {
  const locale = locales[lang_code] || locales.en;

  const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id,
      photo: photo_url,
      caption: message,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: link ? [
          [
            { 
              text: locale.common.read_more,
              url: link,
            },
          ],
      ]: [],
      },
    }),
  });

  const data = await res.json();

  console.log(data, 'data')

  await ControlFlowUtils.delay(DELAY_BETWEEN_MESSAGES_MS);

  return data;
}