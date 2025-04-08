import { prune } from "object";

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
    }[];
  };
}) {
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
}