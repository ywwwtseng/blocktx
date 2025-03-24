import { Typography, TypographyProps } from "@/components/ui/Typography";
import { useI18n } from "@/contexts/I18nContext";

export interface I18nTypographyProps extends TypographyProps {
  i18n: string;
  params?: Record<string, string | number>;
}

export function I18nTypography({ i18n, params, ...props }: I18nTypographyProps) {
  const { t } = useI18n();
  return <Typography {...props}>{t(i18n, params)}</Typography>;
}
