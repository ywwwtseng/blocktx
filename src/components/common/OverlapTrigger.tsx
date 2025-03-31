import { cloneElement, useState, ElementType } from "react";

export interface TriggerProps {
  onClick: (event:  React.MouseEvent<HTMLDivElement>) => void;
}

export type TriggerElement = React.ReactElement<TriggerProps>;

export type OverlapProps<T> = T & { close?: (event?: React.MouseEvent<HTMLDivElement>) => void };

export type OverlapTriggerProps<T> = OverlapProps<T> & {
  modal: ElementType;
  children: TriggerElement;
  show?: boolean;
  onOpen?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function OverlapTrigger<T>({ children, modal: Modal, onOpen, ...props }: OverlapTriggerProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onOpen?.(event);
    setIsOpen(true);
  };

  return (
    <>
      {cloneElement(children, { onClick })}
      {isOpen && (
        <Modal {...props} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
