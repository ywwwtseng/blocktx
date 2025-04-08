import { SVGProps } from "react";

export function SmartToyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M9 4h6v2h-2v1h7v4.5h2v4h-2V20H4v-4.5H2v-4h2V7h7V6H9V4zm1 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-1 3.703h6L13.704 16.5h-3.4L9 15.203zM15.5 13a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor"></path>
    </svg>
  );
}

