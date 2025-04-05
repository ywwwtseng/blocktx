import { useMemo } from "react";
import {
  mockTelegramEnv,
  retrieveLaunchParams,
  retrieveRawInitData,
  isTMA,
} from "@telegram-apps/sdk-react";

// src="https://blocktx.vercel.app/#tgWebAppData=user%3D%257B%2522id%2522%253A5699547696%252C%2522first_name%2522%253A%2522T%2522%252C%2522last_name%2522%253A%2522yw%2522%252C%2522username%2522%253A%2522ywwwtseng%2522%252C%2522language_code%2522%253A%2522zh-hans%2522%252C%2522allows_write_to_pm%2522%253Atrue%252C%2522photo_url%2522%253A%2522https%253A%255C%252F%255C%252Ft.me%255C%252Fi%255C%252Fuserpic%255C%252F320%255C%252FnQlDMwY_br5G4QK2sd9uK2yC7025mbODcLr8uHJWXX90vnZDywxIOKaH7vXai2FC.svg%2522%257D%26chat_instance%3D-5440521606958638813%26chat_type%3Dsender%26auth_date%3D1742716259%26signature%3D8hI_Fe56L6o_6NnhLXEk-SeCOPNX9oGtS6Wrfu0K_0Vhwn2lh8xK1Qce_2f8yFUl7xXWteVWnGPlylRiCEksBA%26hash%3Df3e82859a46b3002918c3840b28091a06a5da278fe4f07d032163f93a3283fd4&tgWebAppVersion=8.0&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23212121%22%2C%22button_color%22%3A%22%238774e1%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23aaaaaa%22%2C%22link_color%22%3A%22%238774e1%22%2C%22secondary_bg_color%22%3A%22%23181818%22%2C%22text_color%22%3A%22%23ffffff%22%2C%22header_bg_color%22%3A%22%23212121%22%2C%22accent_text_color%22%3A%22%238774e1%22%2C%22section_bg_color%22%3A%22%23212121%22%2C%22section_header_text_color%22%3A%22%238774e1%22%2C%22subtitle_text_color%22%3A%22%23aaaaaa%22%2C%22destructive_text_color%22%3A%22%23ff595a%22%7D"
export function useTMA() {
  // const query = useSignal(null);
  return useMemo(() => {
    if (typeof window === "undefined") {
      return {
        launchParams: null,
        initDataRaw: null,
      };
    }

    if (process.env.NODE_ENV !== "production") {
      mockTelegramEnv({
        launchParams: {
          tgWebAppData: new URLSearchParams([
            ["user", JSON.stringify({
              id: 5699547696,
              first_name: "T",
              last_name: "yw",
              username: "ywwwtseng",
              language_code: "zh-hans",
              allows_write_to_pm: true,
              photo_url: "https://t.me/i/userpic/320/nQlDMwY_br5G4QK2sd9uK2yC7025mbODcLr8uHJWXX90vnZDywxIOKaH7vXai2FC.svg"
            })],
            ["chat_instance", "-5440521606958638813"],
            ["chat_type", "sender"],
            ["auth_date", "1742711181"],
            ["signature", "FSFXaPVyWU5py8SyqrrstqPm59esA9zohIyPhn-nKJ9XQS47HeYtw5xnJ4SFy2G2fLFX7GQ5l7H4fxExGif8Aw"],
            ["hash", "f2bc216132e681353f74476947e7cbdbc0afd05bbc53c790f829a11a1ac50883"]
          ]),
          tgWebAppVersion: "8.0",
          tgWebAppPlatform: "web",
          tgWebAppThemeParams: {
            accent_text_color: "#8774e1",
            bg_color: "#212121",
            button_color: "#8774e1",
            button_text_color: "#ffffff",
            destructive_text_color: "#ff595a",
            header_bg_color: "#212121",
            hint_color: "#aaaaaa",
            link_color: "#8774e1",
            secondary_bg_color: "#181818",
            section_bg_color: "#212121",  
            section_header_text_color: "#8774e1",
            subtitle_text_color: "#aaaaaa",
            text_color: "#ffffff",
          }
        }
      });
    }

    if (isTMA()) {
      const launchParams = retrieveLaunchParams();
      const initDataRaw = retrieveRawInitData();

      return {
        launchParams,
        initDataRaw,
      };
    }

    return {
      launchParams: null,
      initDataRaw: null,
    };
  }, []);
}
