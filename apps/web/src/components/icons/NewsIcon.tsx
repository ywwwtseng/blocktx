import { SVGProps } from "react";

export function NewsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props} >
      <path fillRule="evenodd" clipRule="evenodd" d="M9 4h11.5v12a4 4 0 01-4 4H8a3.5 3.5 0 01-3.5-3.5V10H9V4zm0 8.5H7v4a1 1 0 102 0v-4zM11.758 7h6v2h-6V7zm6 4h-6v2h6v-2z" fill="currentColor"></path>
    </svg>
  );
}