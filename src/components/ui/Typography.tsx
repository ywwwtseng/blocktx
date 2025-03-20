import { createElement, PropsWithChildren } from "react";

// import { useTranslateCache } from "@/context/ClientContext";
// import { useThemeColor } from "@/context/ThemeContext";

const size_config = {
  "12": { fontSize: "8rem", lineHeight: "1" },
  "11": { fontSize: "6rem", lineHeight: "1" },
  "10": { fontSize: "4.5rem", lineHeight: "1" },
  "9": { fontSize: "3.75rem", lineHeight: "1" },
  "8": { fontSize: "2.25rem", lineHeight: "2.5rem" },
  "7": { fontSize: "1.875rem", lineHeight: "2.25rem" },
  "6": { fontSize: "1.5rem", lineHeight: "2rem" },
  "5": { fontSize: "1.25rem", lineHeight: "1.75rem" },
  "4": { fontSize: "1.125rem", lineHeight: "1.75rem" },
  "3": { fontSize: "1rem", lineHeight: "1.5rem" },
  "2": { fontSize: "0.875rem", lineHeight: "1.25rem" },
  "1": { fontSize: "0.75rem", lineHeight: "1rem" },
};

export interface TypographyProps extends PropsWithChildren {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "span" | "p" | "b";
  color?: "currentColor" | "text.primary" | "text.secondary" | string;
  align?: "left" | "center" | "right" | "justify";
  weight?: number;
  size?: "12" | "11" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2" | "1";
  className?: string;
  ellipsis?: boolean;
  capitalize?: boolean;
  whitespacePreWrap?: boolean;
  noWrap?: boolean;
  i18n?: string;
  params?: Record<string, string | number>;
  dangerouslySetInnerHTML?: boolean;
}

export function Typography({
  as = "p",
  color = "currentColor",
  align = "left",
  weight = 400,
  size = "3",
  className,
  ellipsis = false,
  capitalize = false,
  whitespacePreWrap = false,
  noWrap = false,
  i18n,
  // params,
  dangerouslySetInnerHTML,
  children,
}: TypographyProps) {
  // const themeColor = useThemeColor(color);
  const themeColor = color;
  // const text = useTranslateCache(i18n || children, params);
  const text = i18n || children;
  return (
    createElement(
      as,
      {
        className,
        style: {
          textAlign: align,
          color: themeColor,
          fontWeight: weight,
          ...size_config[size],
          ...(ellipsis ? { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" } : {}),
          ...(capitalize ? { textTransform: "capitalize" } : {}),
          ...(whitespacePreWrap ? { whiteSpace: "pre-wrap" } : {}),
          ...(noWrap ? { whiteSpace: "nowrap" } : {})
        },
        ...(dangerouslySetInnerHTML
            ? {
                dangerouslySetInnerHTML: {
                  __html: text,
                }
              }
            : { children: text }
          )
        
      },
    )
  );
}

export function Heading({
  as = "h3",
  color = "text.primary",
  align = "left",
  weight = 700,
  size = "3",
  className,
  ellipsis = false,
  capitalize = false,
  whitespacePreWrap = false,
  noWrap = false,
  i18n,
  params,
  dangerouslySetInnerHTML = false,
  children,
}: TypographyProps) {
  return (
    <Typography
      as={as}
      color={color}
      align={align}
      weight={weight}
      size={size}
      className={className}
      ellipsis={ellipsis}
      capitalize={capitalize}
      whitespacePreWrap={whitespacePreWrap}
      noWrap={noWrap}
      i18n={i18n}
      params={params}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
      {children}
    </Typography>
  );
}

export function Text({
  as = "p",
  color = "text.primary",
  align = "left",
  weight = 400,
  size = "3",
  className,
  ellipsis = false,
  capitalize = false,
  whitespacePreWrap = false,
  noWrap = false,
  i18n,
  params,
  children,
  dangerouslySetInnerHTML = false,
}: TypographyProps) {
  return (
    <Typography
      as={as}
      color={color}
      align={align}
      weight={weight}
      size={size}
      className={className}
      ellipsis={ellipsis}
      capitalize={capitalize}
      whitespacePreWrap={whitespacePreWrap}
      noWrap={noWrap}
      i18n={i18n}
      params={params}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
      {children}
    </Typography>
  );
}

export function Caption({
  as = "p",
  color = "text.secondary",
  align = "left",
  weight = 400,
  size = "2",
  className,
  ellipsis = false,
  capitalize = false,
  whitespacePreWrap = false,
  noWrap = false,
  i18n,
  params,
  dangerouslySetInnerHTML = false,
  children,
}: TypographyProps) {
  return (
    <Typography
      as={as}
      color={color}
      align={align}
      weight={weight}
      size={size}
      className={className}
      ellipsis={ellipsis}
      capitalize={capitalize}
      whitespacePreWrap={whitespacePreWrap}
      noWrap={noWrap}
      i18n={i18n}
      params={params}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
      {children}
    </Typography>
  );
}
