import { PropsWithChildren, ButtonHTMLAttributes, Ref } from 'react';
import clsx from 'clsx';


interface BaseButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
}


export function BaseButton({ className, children, ...props }: BaseButtonProps) {
  return (
    <button
      className={clsx(
        'focus:outline-none',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
