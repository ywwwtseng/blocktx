import { PropsWithChildren } from "react";
import clsx from "clsx";


export interface StackProps extends PropsWithChildren {
  className?: string;
  direction?: "row" | "column";
  items?: "center" | "start" | "end";
  justify?: "center" | "start" | "end" | "between" | "around" | "evenly";
  border?: boolean | string;
  rounded?: boolean;
  fullWidth?: boolean;
  width?: string;
  gap?: number | string;
}

export function Stack({ children, direction = "row", className, border, rounded, fullWidth = true, gap = 0, items = "center", justify = "center", width }: StackProps) {
  return (
    <div 
      className={clsx(
        `flex items-${items} justify-${justify}`,
        direction === "row" ? "flex-row" : "flex-col",
        className,
        border === true ? "border" : null,
        typeof border === "string" ? border : null,
        {
          "border-white/20": Boolean(border),
          "rounded-full": rounded,
          "w-full": fullWidth && !width,
          [gap]: typeof gap === "string",
          [`gap-${gap}`]: typeof gap === "number",
        }
      )}
      style={width ? { width } : undefined}
    >
      {children}
    </div>
  );
}

export function HStack(props: StackProps) {
  return <Stack direction="row" {...props} />;
}

export function VStack(props: StackProps) {
  return <Stack direction="column" {...props} />;
}
