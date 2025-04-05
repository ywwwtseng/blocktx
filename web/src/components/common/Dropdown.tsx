"use client";

import { ReactNode, cloneElement } from "react";
import clsx from "clsx";
import { I18nTypography } from "./I18nTypography";
import { useAnchor } from "../../hooks/useAnchor";

export interface TriggerProps {
  onClick: (event: MouseEvent) => void;
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
  const { show, close, toggle } = useAnchor({ stopEvent: true, clickAwayListener: true });

  
  return (
    <div className="relative flex">
      {cloneElement(trigger, { onClick: toggle })}
      {show && (
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
      )}
    </div>

  );
}