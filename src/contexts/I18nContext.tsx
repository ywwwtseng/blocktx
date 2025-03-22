import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { translation, LanguageCode } from "@/i18n";
import { useMiniApp } from "@/contexts/MiniAppContext";

interface I18nContextValue {
  languageCode: LanguageCode;
  t: (key: string, params?: Record<string, string | number>) => string;
  setLanguageCode: (languageCode: LanguageCode) => void;
}

const I18nContext = createContext<I18nContextValue>({
  languageCode: "en",
  t: translation("en"),
  setLanguageCode: () => {},
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useMiniApp();
  const [languageCode, setLanguageCode] = useState<LanguageCode>(user?.language_code || "en");

  const t = translation(languageCode);

  useEffect(() => {
    setLanguageCode(user?.language_code || "en");
  }, [user]);

  return <I18nContext.Provider value={{ languageCode, t, setLanguageCode }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  return useContext(I18nContext);
};
