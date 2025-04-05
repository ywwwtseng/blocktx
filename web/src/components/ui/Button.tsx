import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";
import clsx from "clsx";
import { I18nTypography, I18nTypographyProps } from "../common/I18nTypography";
import { ProgressCircleIcon } from "../icons";

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  loading?: boolean;
  gradient?: boolean;
  width?: string;
  height?: number;
  icon?: ReactNode;
  borderRadius?: number;
  text?: I18nTypographyProps | string;
}

export function Button({
  className,
  loading,
  width,
  height = 40,
  icon,
  borderRadius = 4,
  disabled = false,
  text,
  style,
  ...props
}: ButtonProps) {
  return (
    <button 
      className={
        clsx(
          "flex items-center justify-center px-4 gap-2 disabled:opacity-40 bg-[var(--bg-button)] border-1 border-[#fff]", className)
      }
      disabled={loading || disabled}
      style={{
        maxWidth: 292,
        borderRadius,
        width,
        height,
        ...style,
      }}
      {...props}
    >
      {loading && (<ProgressCircleIcon />)}
      {Boolean(icon && !loading) && icon}
      {text && (
        <I18nTypography noWrap weight={700} {...(typeof text === "string" ? { i18n: text } : text)}></I18nTypography>
      )}
    </button>
  );
}