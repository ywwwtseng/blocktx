import { useMemo } from "react";
import { mockTelegramEnv, retrieveLaunchParams, isTMA } from "@telegram-apps/sdk";

export function useLaunchParams() {
  if (typeof window === "undefined") {
    return undefined;
  }

  return useMemo(() => {
    if (process.env.NODE_ENV !== "production") {
      mockTelegramEnv({
        launchParams: {
          tgWebAppData: new URLSearchParams([
            ['user', JSON.stringify({
              id: 5699547696,
              first_name: "T",
              last_name: "yw",
              username: "ywwwtseng",
              language_code: "zh-hans",
              allows_write_to_pm: true,
              photo_url: "https://t.me/i/userpic/320/nQlDMwY_br5G4QK2sd9uK2yC7025mbODcLr8uHJWXX90vnZDywxIOKaH7vXai2FC.svg"
            })],
            ['chat_instance', '5607347129783086085'],
            ['chat_type', 'private'],
            ['auth_date', '1742349796'],
            ['signature', 'OLVEEMGvqOiHnIjo79xJS5lKADXto_apKAJEY6HYoBqaykZrsoBqLJ5OpDfv2EabEZ653zvMLX00kIg73B8RAw'],
            ['hash', 'e7d1c4f5d24a9484072764ea0413418395f27f46cd2f98c1fbc8daf50f1b3b1a']
          ]),
          tgWebAppVersion: "8.0",
          tgWebAppPlatform: "weba",
          tgWebAppThemeParams: {
            bg_color: "#212121",
            text_color: "#ffffff",
            hint_color: "#aaaaaa",
            link_color: "#8774e1",
            button_color: "#8774e1",
            button_text_color: "#ffffff",
            secondary_bg_color: "#0f0f0f",
            header_bg_color: "#212121"
          }
        }
      });
    }

    if (isTMA()) {
      return retrieveLaunchParams();
    }

    return null;
  }, []);
}
