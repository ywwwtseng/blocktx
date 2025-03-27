import { SVGProps } from "react";

export function PeopleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M9.22 11.778a3.11 3.11 0 100-6.22 3.11 3.11 0 000 6.22zM6.11 13.778A3.11 3.11 0 003 16.888v1.554h12.44v-1.555a3.11 3.11 0 00-3.11-3.11H6.11zM21 18.442h-3.56v-1.555c0-1.17-.394-2.248-1.055-3.11h1.505a3.11 3.11 0 013.11 3.11v1.555zM14.33 8.668a5.087 5.087 0 01-.852 2.825 3.11 3.11 0 100-5.65c.538.809.852 1.78.852 2.825z" fill="currentColor"></path>
    </svg>
  );
}