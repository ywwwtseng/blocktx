import { cloneElement, useState, ElementType } from "react";
import { createPortal } from "react-dom";

export interface TriggerProps {
  onClick: (event:  React.MouseEvent<HTMLDivElement>) => void;
}

export type TriggerElement = React.ReactElement<TriggerProps>;

export type OverlapProps<T> = T & { close?: (event?: React.MouseEvent<HTMLDivElement>) => void };

export type OverlapTriggerProps<T> = OverlapProps<T> & {
  modal: ElementType;
  children: TriggerElement;
  keepMounted?: boolean;
  show?: boolean;
  onOpen?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function OverlapTrigger<T>({ children, modal: Modal, onOpen, keepMounted, ...props }: OverlapTriggerProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onOpen?.(event);
    setIsOpen(true);
  };

  return (
    <>
      {cloneElement(children, { onClick })}
      {(isOpen || keepMounted) && (
        createPortal(
          <Modal {...props} open={isOpen} onClose={() => setIsOpen(false)} />,
          document.body
        )
      )}
    </>
  );
}
