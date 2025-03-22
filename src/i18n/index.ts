import delve from "dlv";
import en from "./locales/en";

export type Locale = Record<string, Record<string, string>>;

export type Locales = Record<string, Locale>;

export const locales: Locales = {
  en,
};

export type LanguageCode = keyof typeof locales;

export const languages = [
  { key: "en", label: "English" },
  // { key: "zh", label: "中文(简体)" },
];

export const translation = (lang_code: string) => (key: string, params?: Record<string, string | number>) => {
  const locale = locales[lang_code] || locales["en"];
  
  if (typeof key !== "string") return key;
  const template = delve(locale, key) || key;

  if (!params) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_: string, key: string) => String(params[key]) || "");
};

