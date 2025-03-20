import { SVGProps } from "react";

export function EarnIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill='currentColor'
      {...props}
    >
      <path fill={props.color === 'url(#linear-gradient)' ? 'url(#linear-gradient)' : 'currentColor'} d="m23.0628 9.256-5.25-6A.7501.7501 0 0 0 17.2503 3h-10.5a.75.75 0 0 0-.5625.256l-5.25 6a.75.75 0 0 0 .0159 1.0059l10.5 11.25a.7508.7508 0 0 0 .5484.2384.75.75 0 0 0 .5485-.2384l10.5-11.25a.75.75 0 0 0 .0122-1.006ZM20.8475 9h-3.9722l-3.375-4.5H16.91L20.8475 9ZM6.9921 10.5l2.8247 7.0622L3.2262 10.5h3.766Zm10.0163 0h3.7659l-6.5906 7.0622L17.0084 10.5Zm-9.9178-6h3.4097L7.1253 9H3.153l3.9375-4.5Z"></path>
    </svg>
  );
}
