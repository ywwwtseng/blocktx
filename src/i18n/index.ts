import delve from "dlv";
import en from "./locales/en";
import zh from "./locales/zh";

export type Locale = Record<string, Record<string, string>>;

export type Locales = Record<string, Locale>;

export const locales: Locales = {
  en,
  zh,
};

export type LanguageCode = keyof typeof locales;

export const translation = (lang_code: string) => (key: string, params?: Record<string, string | number>) => {
  const locale = locales[lang_code] || locales["en"];
  
  if (typeof key !== "string") return key;
  const template = delve(locale, key) || key;

  if (!params) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_: string, key: string) => String(params[key]) || "");
};

