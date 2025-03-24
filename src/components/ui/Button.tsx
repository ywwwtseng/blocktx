import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import clsx from "clsx";

import { I18nTypography, I18nTypographyProps } from "@/components/common/I18nTypography";
import { ProgressCircleIcon } from "@/components/icons";

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  loading?: boolean;
  gradient?: boolean;
  maxWidth?: string;
  width?: string;
  height?: number;
  icon?: ReactNode;
  borderRadius?: string;
  text?: I18nTypographyProps;
}

export function Button({
  className,
  loading,
  maxWidth = "292px",
  width,
  height = 38,
  icon,
  borderRadius = "9999px",
  disabled = false,
  text,
  ...props
}: ButtonProps) {
  return (
    <button 
      className={
        clsx(
          "p-[1px] disabled:opacity-40", className)
      }
      disabled={loading || disabled}
      style={{
        width,
        maxWidth,
        borderRadius,
        background: "var(--gradient-background)",
      }}
      {...props}
    >
      <div
        className="bg-black flex items-center justify-center px-4 gap-2"
        style={{
          height: `${height - 2}px`,
          borderRadius
        }}
      >
        {loading && (<ProgressCircleIcon />)}
        {Boolean(icon && !loading) && icon}
        {text && (
          <I18nTypography noWrap weight={700} {...text}></I18nTypography>
        )}
      </div>
    </button>
  );
}