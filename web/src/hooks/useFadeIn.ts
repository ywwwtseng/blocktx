import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


export function useFadeIn(selector: string) {
  useGSAP(() => gsap.fromTo(
    selector,
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.inOut'
    }
  ));
}
