import { useCallback, useMemo, useState } from 'react';

interface UseAnchorOptions {
  clickAwayListener?: boolean;
  stopEvent?: boolean;
  identity?: string | null;
}

const defaultUseAnchorOptions: UseAnchorOptions = {
  clickAwayListener: false,
  stopEvent: false,
  identity: null,
};

export function useAnchor<T>({
  clickAwayListener = defaultUseAnchorOptions.clickAwayListener,
  stopEvent = defaultUseAnchorOptions.stopEvent,
  identity = defaultUseAnchorOptions.identity,
} = defaultUseAnchorOptions) {
  const [context, setContext] = useState({});
  const [anchor, setAnchor] = useState<HTMLElement | boolean | null>(null);

  const close = useCallback((event?: MouseEvent) => {
    if (stopEvent) {
      event?.preventDefault();
      event?.stopPropagation();
    }

    setContext({});

    setAnchor(null);

    if (clickAwayListener) {
      window.removeEventListener('click', close, false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = useCallback((event?: MouseEvent, context?: T) => {
    if (stopEvent) {
      event?.preventDefault();
      event?.stopPropagation();
    }

    if (context) {
      setContext(context);
    }

    if (!event) {
      setAnchor(true);
    } else if (identity) {
      const target = event.target as HTMLElement;

      if (target.closest(`[${identity}]`)) {
        setAnchor(target.closest(`[${identity}]`) as HTMLElement);
      } else {
        setAnchor(true);
      }
    } else {
      setAnchor(event.target as HTMLElement);
    }

    if (clickAwayListener) {
      window.addEventListener('click', close, false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (event: MouseEvent) => {
    if (anchor) {
      close(event);
    } else {
      open(event);
    }
  };

  const bounds = useMemo(() => {
    if (typeof anchor === 'boolean' || anchor === null) {
      return null;
    }

    return anchor.getBoundingClientRect();
  }, [anchor]);

  return {
    show: Boolean(anchor),
    bounds,
    context,
    toggle,
    open,
    close,
  };
}
