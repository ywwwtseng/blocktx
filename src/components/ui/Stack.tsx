import { PropsWithChildren } from "react";

const justifyMap = {
  center: "center",
  start: "flex-start",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
}

const itemsMap = {
  center: "center",
  start: "flex-start",
  end: "flex-end",
}

export interface StackProps extends PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  direction?: "row" | "column";
  items?: "center" | "start" | "end";
  justify?: "center" | "start" | "end" | "between" | "around" | "evenly";
  width?: string | number;
  height?: string | number;
  gap?: number;
  style?: React.CSSProperties;
}

export function Stack({
  children, 
  direction = "row", 
  className, 
  gap = 0, 
  items = "center", 
  justify = "center", 
  width = "100%",
  height = "auto",
  style,
  ...props
}: StackProps) {
  return (
    <div 
      className={className}
      style={{
        display: "flex",
        flexDirection: direction,
        alignItems: itemsMap[items],
        justifyContent: justifyMap[justify],
        width,
        height,
        gap: gap * 4,
        ...style,
      }}
      {...props}
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
