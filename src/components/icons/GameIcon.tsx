import { SVGProps } from "react";

export function GameIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <g clipPath="url(#a)">
        <path fill="currentColor" d="M23.198 16.29v-.014l-1.536-7.891v-.017a5.632 5.632 0 0 0-5.536-4.618h-8.26a5.614 5.614 0 0 0-5.532 4.643L.805 16.276v.013a3.375 3.375 0 0 0 5.71 2.973l.032-.035L10.268 15h3.469l3.723 4.227a3.382 3.382 0 0 0 2.416 1.023 3.375 3.375 0 0 0 3.321-3.96h.001ZM9.751 10.5H9v.75a.75.75 0 1 1-1.5 0v-.75h-.75a.75.75 0 1 1 0-1.5h.75v-.75a.75.75 0 1 1 1.5 0V9h.75a.75.75 0 1 1 0 1.5Zm3.75-.75a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75Zm7.91 8.2a1.86 1.86 0 0 1-1.21.772 1.883 1.883 0 0 1-1.638-.505L15.732 15h.394a5.625 5.625 0 0 0 4.78-2.66l.82 4.218a1.86 1.86 0 0 1-.316 1.392Z"></path>
      </g>
      <defs>
        <clipPath id="a"><path fill="currentColor" d="M0 0h24v24H0z"></path></clipPath>
      </defs>
    </svg>
  );
}
