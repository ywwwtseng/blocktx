"use client";

import { Fragment, ReactNode, useState, cloneElement } from "react";
import clsx from "clsx";
import { I18nTypography} from "@/components/common/I18nTypography";

export interface TriggerProps {
  onClick: (event:  React.MouseEvent<HTMLDivElement>) => void;
}

export type TriggerElement = React.ReactElement<TriggerProps>;

interface DropdownOption {
  label: string | ReactNode;
  key: string;
}

interface DropdownProps {
  trigger: TriggerElement;
  menuProps?: React.HTMLAttributes<HTMLDivElement>;
  options: DropdownOption[];
  onSelect?: (key: string) => void;
}



export function Dropdown({ trigger, options, onSelect, menuProps }: DropdownProps) {
  const [show, setShow] = useState(false);

  const close = () => {
    setShow(false);
  }
  
  return (
    <div className="relative flex">
      {cloneElement(trigger, { onClick: () => setShow(!show) })}
      {show && (
        <>
          <div
            className="flex flex-col fixed top-0 left-0 overflow-hidden w-screen h-screen bg-white/[0.06]"
            style={{ zIndex: 40 }}
            onClick={close}>
          </div>
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
            {...menuProps}
            className={clsx(
              "absolute right-0 bottom-0 translate-y-[calc(100%+10px)] mt-2 py-1 max-h-[200px] overflow-y-auto no-scrollbar bg-[#1D1D1D] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50",
              !menuProps?.className?.includes("w-") && "w-52",
              menuProps?.className
            )}
          >
            <div
              className="py-1"
              role="none"
            >
              {options.map((option: DropdownOption) => (
                <button
                  key={option.key}
                  className="block px-4 py-2 text-white w-full text-left"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => {
                    onSelect?.(option.key);
                    close();
                  }}
                >
                  {typeof option.label === "string" ? (
                    <I18nTypography ellipsis i18n={option.label} />
                  ) : (
                    option.label
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      
    </div>

  );
}