import { SVGProps } from "react";

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      {...props}
    >
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 16 4-4-4-4"/>
    </svg>
  );
}
