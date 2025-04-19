import { prune } from "js/libs/object";
import { delay } from "delay";

export const MAX_MESSAGES_PER_MINUTE = 24;
export const DELAY_BETWEEN_MESSAGES_MS = (60 * 1000) / MAX_MESSAGES_PER_MINUTE;

export async function bot_send_photo({
  token,
  message,
  chat_id,
  photo_url,
  reply_markup,
}: {
  token: string;
  message: string;
  chat_id: string;
  photo_url: string;
  reply_markup?: {
    inline_keyboard: {
      text: string;
      url: string;
    }[][];
  };
}) {
  try {
    await delay(DELAY_BETWEEN_MESSAGES_MS);

    const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        prune({
          chat_id,
          photo: photo_url,
          caption: message,
          parse_mode: "Markdown",
          reply_markup,
        }),
      ),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
