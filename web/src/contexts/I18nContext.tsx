import { createContext, ReactNode, useContext } from "react";
import { translation } from "../i18n";
import { useClient } from "./ClientContext";

interface I18nContextState {
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextState>({
  t: translation("en"),
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const { languageCode } = useClient();

  const t = translation(languageCode);

  return <I18nContext.Provider value={{ t }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  return useContext(I18nContext);
};
